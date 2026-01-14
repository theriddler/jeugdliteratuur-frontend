import { defineFunction } from "@aws-amplify/backend";

export const sendBookRecommendationHandler = defineFunction({
  name: 'send-book-recommendation-handler',
  entry: './handler.ts',
})