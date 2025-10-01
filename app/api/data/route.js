import { NextResponse } from "next/server";
import { getSheetData, addSheetData } from "@/lib/googleSheet";
import { getWish, addWish } from "@/lib/wishService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // ?type=wish / ?type=location

    if (!type) {
      return NextResponse.json({ error: "Missing query param: type" }, { status: 400 });
    }

    let data = [];
    if (type === "wish") {
      data = await getWish();
    } else if (type === "location") {
      data = await getSheetData();
    } else {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("❌ GET Error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    return NextResponse.json(
      { error: "Failed to fetch data", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, value } = body;

    if (!type || !value) {
      return NextResponse.json(
        { error: "Invalid request: 'type' and 'value' are required" },
        { status: 400 }
      );
    }

    if (type === "wish") {
      await addWish([value]);
    } else if (type === "location") {
      await addSheetData([value]);
    } else {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    return NextResponse.json({ message: "✅ Data saved successfully" });
  } catch (err) {
    console.error("❌ POST Error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    return NextResponse.json(
      { error: "Failed to save data", details: err.message },
      { status: 500 }
    );
  }
}
