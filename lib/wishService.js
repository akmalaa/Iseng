import { google } from "googleapis";

export async function getWish() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log("client email = ", process.env.GOOGLE_CLIENT_EMAIL)
    console.log("priv key = ", process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'))
    console.log("sp id = ", spreadsheetId)
    
    if (!spreadsheetId) {
      throw new Error("Missing env: GOOGLE_SHEET_ID");
    }

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "wish!A1",
    });

    return res.data.values || [];
  } catch (err) {
    console.error("❌ Error in getWish:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    throw new Error("Failed to fetch wishes from Google Sheets");
  }
}

export async function addWish(values) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Missing env: GOOGLE_SHEET_ID");
    }
    if (!values || !Array.isArray(values)) {
      throw new Error("Invalid input: values must be an array");
    }

    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "wish!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values], // contoh: ["wish", "pickupLocation"]
      },
    });

    return result.data;
  } catch (err) {
    console.error("❌ Error in addWish:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    throw new Error("Failed to add wish to Google Sheets");
  }
}
