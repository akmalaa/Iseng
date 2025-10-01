import { google } from "googleapis";

export async function getSheetData() {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("Missing required Google Sheets environment variables");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "location!A1",
    });

    return res.data.values || [];
  } catch (err) {
    console.error("❌ Error in getSheetData:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    throw err;
  }
}

export async function addSheetData(values) {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("Missing required Google Sheets environment variables");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "location!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values], // contoh: ["wish", "pickupLocation"]
      },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Error in addSheetData:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
      response: err?.response?.data, // kalau error dari API
    });
    throw err;
  }
}
