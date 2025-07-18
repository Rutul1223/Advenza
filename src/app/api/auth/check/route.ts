// src/app/api/auth/check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract session cookie
    const cookies = req.headers.get("cookie");
    if (!cookies) {
      console.log("No cookies found in request");
      return NextResponse.json(
        { error: "No cookies provided" },
        { status: 401 }
      );
    }

    const sessionToken = cookies
      .split("; ")
      .find((row) => row.startsWith("session="))
      ?.split("=")[1];

    if (!sessionToken) {
      console.log("Session cookie not found");
      return NextResponse.json(
        { error: "Session cookie not found" },
        { status: 401 }
      );
    }

    // Find session in database
    const session = await prisma.session.findFirst({
      where: { token: sessionToken, expiresAt: { gt: new Date() } },
      include: { user: true },
    });

    if (!session) {
      console.log("Session not found or expired");
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Return user data including type
    return NextResponse.json({
      user: {
        name: session.user.name,
        email: session.user.email,
        type: session.user.type,
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
