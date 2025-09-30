import { NextResponse } from "next/server";
import { getSheetData, addSheetData } from "@/lib/googleSheet";
import { getWish, addWish } from "@/lib/wishService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // ?type=wish / ?type=location

  try {
    let data = [];
    if (type === "wish") {
      data = await getWish();
    } else {
      data = await getSheetData();
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, value } = body;

    if (!type || !value) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (type === "wish") {
      await addWish([value]);
    } else {
      await addSheetData([value]);
    }

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
