import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
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
    console.log(error);

    return NextResponse.json(
      {
        message: "Delete Failed",
      },
      {
        status: 500,
      }
    );
  }
}