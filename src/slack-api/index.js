import * as dotenv from "dotenv";
import { WebClient } from "@slack/web-api";

dotenv.config();

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const conversationId = "general";

export default async function messageToSlack(data) {
  const result = await web.chat.postMessage({
    text: `Hello world! :flag-ar: ${data}`,
    channel: conversationId,
  });

  // The result contains an identifier for the message, `ts`.
  console.log(
    `Successfully send message ${result.ts} in conversation ${conversationId}`
  );
}
