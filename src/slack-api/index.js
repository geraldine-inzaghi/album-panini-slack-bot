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
  const result = await web.chat.postEphemeral({
    channel: conversationId,
    user: "U0HMQ9FA4",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Hola, en qué oficina te encuentras?",
        },
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Selecciona una oficina",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Buenos Aires",
                emoji: true,
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Bogotá",
                emoji: true,
              },
              value: "value-1",
            },
          ],
          action_id: "static_select-action",
        },
      },
    ],
  });

  // The result contains an identifier for the message, `ts`.
  console.log(
    `Successfully send message ${result.ts} in conversation ${conversationId}`
  );
}
