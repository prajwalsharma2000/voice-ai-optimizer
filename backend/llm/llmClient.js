import OpenAI from "openai";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export async function callLLM(systemPrompt, userPrompt) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: systemPrompt
//         },
//         {
//           role: "user",
//           content: userPrompt
//         }
//       ],
//       temperature: 0.3
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("LLM Error:", error);
//     throw new Error("LLM request failed");
//   }
// }

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function callLLM(systemPrompt, userPrompt) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("LLM Error:", error);
    throw new Error("LLM request failed");
  }
}

export function safeJSONParse(text) {
  try {
    // Remove markdown code blocks if present
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract first JSON object
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found in LLM response");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (err) {
    console.error("Invalid JSON from LLM:", text);
    throw new Error("Failed to parse LLM JSON response");
  }
}