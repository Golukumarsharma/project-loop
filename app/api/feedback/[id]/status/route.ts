import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const feedback = await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      message: "Status Updated Successfully",
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