import { NextResponse } from "next/server";
import { pool } from '../../db/db';
import { sqsClient } from '../../../../aws/sqs';
import { QueryResult } from "pg";
// const { SQSClient, SendMessageCommand, ReceiveMessageCommand } = require("@aws-sdk/client-sqs");

export async function GET(): Promise<NextResponse<{
        previousRolls: any;
    }>> {
    const rawQueryResult = await pool.query(`
        SELECT id, number FROM "Rolls" ORDER BY "created_at" DESC;
    `);
    const previousRolls = rawQueryResult.rows;
    return NextResponse.json({
        previousRolls
    })
}

export async function POST(request: Request): Promise<NextResponse<{
        newRoll: any;
    }>> {
    const roll: number = await request.json();
    const newRoll: QueryResult<Roll> = await pool.query(`
        INSERT INTO "Rolls" ("number", "created_at", "updated_at")
        VALUES (${roll}, NOW(), NOW())
    `);
    checkNumberOfRollsRecords();
    // sendSQSMessage(roll);
    return NextResponse.json({ newRoll });
}

export async function DELETE(): Promise<void> {
    await pool.query(`
        DELETE FROM "Rolls" WHERE id = (
            SELECT id FROM "Rolls" ORDER BY id ASC
            LIMIT 1
        )
    `);
}

export async function checkNumberOfRollsRecords(): Promise<void> {
    const count = await pool.query(`
        SELECT COUNT(*) FROM "Rolls";
    `)
    if (count.rows[0].count > 10) {
        DELETE();
    }
}

// this doesn't work yet. i am running into an issue with securty credentials being incorrect
// async function sendSQSMessage(roll: number) {
//     const sqsClient = new SQSClient({
//         region: process.env.AWS_REGION,
//         credentials: {
//           accessKeyId: 'ASIAT4XFFTN4BA65YXCC',
//           secretAccessKey: 'coZoXK//va5XO3XthUk0UFAwn4lrXfZzjfgwmESC',
//         },
//       });
      
//         const sendMessageCommand = new SendMessageCommand({
//             QueueUrl: process.env.AWS_QUEUE_URL,
//             MessageBody: String(roll),
//           });
//           console.log('before message send');
//           const data = await sqsClient.send(sendMessageCommand);
//           console.log("Message sent. Message ID: ", data.MessageId);
// }