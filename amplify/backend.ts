import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sendFeedbackHandler } from './data/send-feedback-handler/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  sendFeedbackHandler
});

const sendFeedbackLambda = backend.sendFeedbackHandler.resources.lambda;

const statement = new PolicyStatement({
  sid: 'AllowSendFeedbackSES',
  actions: [ 'ses:SendEmail' ],
  resources: [ '*' ]
})

sendFeedbackLambda.addToRolePolicy(statement);