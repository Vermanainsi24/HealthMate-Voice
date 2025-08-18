import { SessionChatTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/index";
import { eq, desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();

    // Generate unique sessionId
    const sessionId = uuidv4();

    // Insert new record
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        notes,
        selectedDoctor: {
          id: selectedDoctor.id,
          specialist: selectedDoctor.specialist,
          description: selectedDoctor.description,
          image: selectedDoctor.image,
          vapiAgentId: selectedDoctor.vapiAgentId || null, // <-- add here!
          // ...any other fields
        },// store as JSON string
        createdOn: new Date(), // timestamp
      })
      .returning({ sessionId: SessionChatTable.sessionId }); // return sessionId

    return NextResponse.json(result[0]);
  } catch (e) {
    console.error("Error saving session chat:", e);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!sessionId || sessionId === "all") {
      // Fetch all sessions for the user, ordered by descending id
      const sessions = await db
        .select()
        .from(SessionChatTable)
        .where(eq(SessionChatTable.createdBy, user.primaryEmailAddress!.emailAddress))
        .orderBy(desc(SessionChatTable.id));

      return NextResponse.json(sessions);
    } else {
      // Fetch specific session by sessionId
      // Assuming sessionId is a string (adjust type as necessary)
      const session = await db
        .select()
        .from(SessionChatTable)
        .where(eq(SessionChatTable.sessionId, sessionId))
        .limit(1);

      return NextResponse.json(session.length > 0 ? session[0] : null);
    }
  } catch (e) {
    console.error("Error fetching session chats:", e);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}