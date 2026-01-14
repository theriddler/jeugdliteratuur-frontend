import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sendFeedbackHandler } from './data/send-feedback-handler/resource';
import { sendBookRecommendationHandler } from './data/send-book-recommendation-handler/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  sendFeedbackHandler,
  sendBookRecommendationHandler
});

const sendFeedbackLambda = backend.sendFeedbackHandler.resources.lambda;
const sendBookRecommendationLambda = backend.sendBookRecommendationHandler.resources.lambda;

const sendFeedbackStatement = new PolicyStatement({
  sid: 'AllowSendFeedbackSES',
  actions: [ 'ses:SendEmail' ],
  resources: [ '*' ]
})

sendFeedbackLambda.addToRolePolicy(sendFeedbackStatement);

const sendBookRecommendationStatement = new PolicyStatement({
  sid: 'AllowSendBookRecommendationSES',
  actions: [ 'ses:SendEmail' ],
  resources: [ '*' ]
})
sendBookRecommendationLambda.addToRolePolicy(sendBookRecommendationStatement);