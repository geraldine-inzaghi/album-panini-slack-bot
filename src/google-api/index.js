import * as dotenv from "dotenv";
import { google } from "googleapis";
import messageToSlack from "../slack-api/index.js";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const CREDENTIALS_PATH = "credentials.json";

const spreadsheetId = process.env.SPREADSHEET_ID;
const range = "Buenos Aires!A1:C3";

let copy = "";

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

export default async function request() {
  const client = google.sheets({ version: "v4", auth: auth });
  const data = await client.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = data.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  rows.forEach((row) => {
    console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
  });

  copy = rows[0][0];
  messageToSlack(copy);
}
