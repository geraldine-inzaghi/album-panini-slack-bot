import * as dotenv from "dotenv";
import { google } from "googleapis";
import messageToSlack from "../slack-api/index.js";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const CREDENTIALS_PATH = "credentials.json";

const spreadsheetId = process.env.SPREADSHEET_ID;

let copy = "";

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

// list all the offices
export async function getOffices() {
  const test = google.sheets({ version: "v4", auth: auth });
  const dataSheet = await (
    await test.spreadsheets.get({ spreadsheetId })
  ).data.sheets;

  let offices = [];

  dataSheet.forEach((element) => {
    offices.push(element.properties.title);
  });

  return offices;
}

// list all the offices
export async function getUsers(office) {
  const range = office;

  const client = google.sheets({ version: "v4", auth: auth });
  const data = await client.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const users = data.data.values[0].slice(3);

  return users;
}

export async function request() {
  const range = "Buenos Aires";

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
