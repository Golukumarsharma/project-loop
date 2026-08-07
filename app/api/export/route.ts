import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany();

    const csv = [
      ["Title", "Description", "Status"],
      ...feedbacks.map((f) => [
        f.title,
        f.description,
        f.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="feedbacks.csv"',
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Export Failed",
      },
      {
        status: 500,
      }
    );
  }
}