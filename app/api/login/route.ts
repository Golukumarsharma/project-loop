import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("==================================");
    console.log("Entered Email:", email);

    const allUsers = await prisma.user.findMany();

    console.log("All Users in Database:");
    console.log(allUsers);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log("Found User:");
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = password === user.password;

    console.log("Entered Password:", password);
    console.log("Database Password:", user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login Success",
      user,
    });

  } catch (error) {
    console.log("Login Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}