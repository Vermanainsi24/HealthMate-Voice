import { db } from "@/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    if (!user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0]);
    }

    // Create new user
    const insertedUser = await db
      .insert(usersTable)
      .values({
        email,
        name: user.fullName ?? "Anonymous",
        credits: 10,
      })
      .returning();

    return NextResponse.json(insertedUser[0]);
  } catch (err) {
    console.error("Error in /api/users:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
