import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Single Feedback
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const feedback = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching feedback" },
      { status: 500 }
    );
  }
}

// UPDATE Feedback
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const feedback = await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json({
      message: "Feedback Updated Successfully",
      feedback,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Update Failed" },
      { status: 500 }
    );
  }
}

// DELETE Feedback
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.feedback.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Feedback Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete Failed" },
      { status: 500 }
    );
  }
}