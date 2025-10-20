import { Schema } from "../resource";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { env } from '$amplify/env/send-feedback-handler'; // Import generated environment variables
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';

// 1. Get the configuration needed for the Amplify Data client
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

// 2. Configure Amplify and generate a type-safe client
Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>();

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const handler: Schema[ 'sendFeedback' ][ "functionHandler" ] = async (event) => {
  const feedbackData = event.arguments;
  const { name, occupation, email, comment } = feedbackData;

  try {
    const result = await client.models.Feedback.create(feedbackData);
    const createdFeedback = result.data;

    // 2. SEND THE EMAIL VIA SES 📧
    const SES_SOURCE_EMAIL = 'redactie.sterboeken@gmail.com';
    const SES_DESTINATION_EMAIL = 'redactie.sterboeken@gmail.com';

    const emailParams = {
      Source: SES_SOURCE_EMAIL,
      Destination: { ToAddresses: [ SES_DESTINATION_EMAIL ] },
      Message: {
        Subject: { Data: `New Feedback from ${name}` },
        Body: {
          Html: {
            Data: `
              <h1>New Feedback Received</h1>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Email:</strong> ${email || 'N/A'}</p>
              <p><strong>Occupation:</strong> ${occupation || 'N/A'}</p>
              <hr>
              <h2>Comment:</h2>
              <p>${comment}</p>
            `
          },
        },
      },
    };

    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    // 3. RETURN THE CREATED RECORD
    return createdFeedback;

  } catch (error) {
    console.error("Error processing feedback:", error);
    // Important: throw an error so the AppSync client knows it failed
    throw new Error("Failed to process feedback and send email.");
  }
};