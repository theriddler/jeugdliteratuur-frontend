import { defineFunction } from "@aws-amplify/backend";

export const sendFeedbackHandler = defineFunction({
  name: 'send-feedback-handler',
  entry: './handler.ts',
})