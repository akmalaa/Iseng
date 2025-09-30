import { NextResponse } from "next/server";
import { getWish, addWish } from "@/lib/wishService";

export async function GET() {
  try {
    const data = await getWish();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { wish } = body;

    if (!wish) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    await addWish([wish || ""]);

    return NextResponse.json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
