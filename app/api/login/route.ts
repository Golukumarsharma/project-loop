import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  return NextResponse.json({
    message: "Login Success",
    user: {
      id: "demo-user",
      name: "Demo User",
      email: email || "demo@example.com",
      role: "ADMIN",
    },
  });
}