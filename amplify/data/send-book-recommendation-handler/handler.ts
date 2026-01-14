import { Schema } from "../resource";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { env } from '$amplify/env/send-book-recommendation-handler'; // Import generated environment variables
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';

// 1. Get the configuration needed for the Amplify Data client
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

// 2. Configure Amplify and generate a type-safe client
Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>();

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const handler: Schema[ 'sendBookRecommendation' ][ "functionHandler" ] = async (event) => {
  const bookRecommendationData = event.arguments;
  const { lemmaTitle, auteur, boek, waarom, forOpstaptitels, forParallelLezen, forVerderLezen, name, occupation, email } = bookRecommendationData;

  try {
    const result = await client.models.BookRecommendation.create(bookRecommendationData);
    const createdBookRecommendation = result.data;

    // 2. SEND THE EMAIL VIA SES 📧
    const SES_SOURCE_EMAIL = 'redactie.sterboeken@gmail.com';
    const SES_DESTINATION_EMAIL = 'redactie.sterboeken@gmail.com';

    const emailParams = {
      Source: SES_SOURCE_EMAIL,
      Destination: { ToAddresses: [ SES_DESTINATION_EMAIL ] },
      Message: {
        Subject: { Data: `New Book Recomendation` },
        Body: {
          Html: {
            Data: `
              <h1>New Book Recommendation Received</h1>
              <h2>Lemma: ${lemmaTitle}</h2
              <p><strong>Auteur:</strong> ${auteur || 'N/A'}</p>
              <p><strong>Boek:</strong> ${boek || 'N/A'}</p>
              ${forOpstaptitels ? (
                '<p><strong>Opstaptitels</strong></p>'
              ) : ''}
              ${forParallelLezen ? (
                '<p><strong>Parallel Lezen</strong></p>'
              ) : ''}
              ${forVerderLezen ? (
                '<p><strong>Verder Lezen</strong></p>'
              ) : ''}
              <hr>
              <h2>Waarom:</h2>
              <p>${waarom}</p>
              <hr>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Email:</strong> ${email || 'N/A'}</p>
              <p><strong>Occupation:</strong> ${occupation || 'N/A'}</p>
            `
          },
        },
      },
    };

    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    // 3. RETURN THE CREATED RECORD
    return createdBookRecommendation;

  } catch (error) {
    console.error("Error processing book recommendation:", error);
    // Important: throw an error so the AppSync client knows it failed
    throw new Error(`Failed to process book recommendation and send email. ${error}`);
  }
};