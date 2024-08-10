// // this doesn't work yet. i am running into an issue with security credentials being incorrect
// const { SQSClient, SendMessageCommand, ReceiveMessageCommand } = require("@aws-sdk/client-sqs");

// const region = process.env.AWS_REGION;
// // export const queueUrl = process.env.AWS_QUEUE_URL;

// // export const sqsClient = new SQSClient({ region });
// export const sqsClient = new SQSClient({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   });