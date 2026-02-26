const Base_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function getAIResponse(content: string) {
  const res = await fetch(`${Base_Url}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: content }],
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error("AI response generation failed");
  }
  const data = await res.json();

  const text = data.candidates[0].content.parts[0].text;
  return text;
}
