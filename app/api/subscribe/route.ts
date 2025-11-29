import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await request.json();

    await resend.contacts.create({
      email: email,
    });

    return NextResponse.json({ success: true, email }, { status: 200 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 });
  }
}