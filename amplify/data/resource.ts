import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sendFeedbackHandler } from "./send-feedback-handler/resource";
import { sendBookRecommendationHandler } from "./send-book-recommendation-handler/resource";


const schema = a.schema({
  Feedback: a
    .model({
      name: a.string(),
      occupation: a.string(),
      email: a.string(),
      comment: a.string(),
      // files: a.string(),
    })
    .authorization((allow) => [ allow.publicApiKey().to([ 'create' ]) ]),

  sendFeedback: a
    .mutation()
    .arguments({
      name: a.string(),
      occupation: a.string(),
      email: a.string(),
      comment: a.string(),
      // files: a.string(),
    })
    .returns(a.ref('Feedback'))
    .authorization((allow) => [ allow.publicApiKey() ])
    .handler(a.handler.function(sendFeedbackHandler)),

  BookRecommendation: a
    .model({
      lemmaTitle: a.string(),
      auteur: a.string(),
      boek: a.string(),
      waarom: a.string(),
      forOpstaptitels: a.boolean(),
      forParallelLezen: a.boolean(),
      forVerderLezen: a.boolean(),
      name: a.string(),
      occupation: a.string(),
      email: a.string(),
      // files: a.string(),
    })
    .authorization((allow) => [ allow.publicApiKey().to([ 'create' ]) ]),

  sendBookRecommendation: a
    .mutation()
    .arguments({
      lemmaTitle: a.string(),
      auteur: a.string(),
      boek: a.string(),
      waarom: a.string(),
      forOpstaptitels: a.boolean(),
      forParallelLezen: a.boolean(),
      forVerderLezen: a.boolean(),
      name: a.string(),
      occupation: a.string(),
      email: a.string(),
    })
    .returns(a.ref('BookRecommendation'))
    .authorization((allow) => [ allow.publicApiKey() ])
    .handler(a.handler.function(sendBookRecommendationHandler))
})
  .authorization(allow => [
    allow.resource(sendFeedbackHandler),
    allow.resource(sendBookRecommendationHandler)
  ])

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});