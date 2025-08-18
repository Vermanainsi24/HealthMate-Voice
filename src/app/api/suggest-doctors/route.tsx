

import { NextRequest, NextResponse } from "next/server";
import { openai } from "../../../../config/OpenAiModel";
import { AIDoctorAgents } from "../../../../shared/list";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();
    if (!notes || notes.trim() === "") {
      return NextResponse.json({ error: "Notes are required" }, { status: 400 });
    }

    // Only send minimal doctor list to AI to save tokens
    const trimmedDoctors = AIDoctorAgents.map((d) => ({
      id: d.id,
      specialist: d.specialist,
    }));

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are a medical assistant. Here is the list of doctors available: ${JSON.stringify(trimmedDoctors)}`,
        },
        {
          role: "user",
          content: `User Notes/Symptoms: ${notes}. Suggest list of doctors from the list above. Respond only in JSON format.`,
        },
      ],
      max_tokens: 300,
    });

    let responseText = completion.choices[0]?.message?.content || "";

    // Clean markdown/JSON formatting from AI output
    responseText = responseText
      .replace(/```/g, "")
      .replace(/^json\s*/i, "")
      .trim();

    let doctorSuggestion;
    try {
      doctorSuggestion = JSON.parse(responseText);
    } catch {
      doctorSuggestion = { error: "Failed to parse AI response", raw: responseText };
    }

    console.log("AI Raw Response:", doctorSuggestion);

    // Merge with static doctor list to add description & image
    const mergedDoctors =
      doctorSuggestion?.suggested_doctors?.map((doc: any) => {
        const match = AIDoctorAgents.find((d) => d.id === doc.id);
        return {
          ...doc,
          description: match?.description || "",
          image: match?.image || "",
          voiceId: match?.voiceId || "",
          vapiAgentId: match?.vapiAgentId || "",
        };
      }) || [];

    return NextResponse.json({ result: mergedDoctors });
  } catch (e: any) {
    console.error("Error in /suggest-doctors:", e);
    return NextResponse.json({ error: e.message || "Unknown server error" }, { status: 500 });
  }
}
