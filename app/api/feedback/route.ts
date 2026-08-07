import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const feedback = await prisma.feedback.create({
      data: {
        title: body.title,
        description: body.description,
        workspaceId: body.workspaceId,
      },
    });

    return NextResponse.json({
      message: "Feedback Added Successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch feedbacks",
      },
      {
        status: 500,
      }
    );
  }
}