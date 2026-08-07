import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    total: 25,
    newCount: 8,
    progressCount: 7,
    resolvedCount: 10,

    recentFeedbacks: [
      {
        id: 1,
        title: "Login Issue",
        status: "NEW",
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Dashboard Bug",
        status: "IN_PROGRESS",
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Payment Error",
        status: "RESOLVED",
        createdAt: new Date(),
      },
    ],
  });
}