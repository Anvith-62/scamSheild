import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AnalysisResult {
  verdict: "Safe" | "Suspicious" | "Unsafe" | "Malicious";
  scamProbability: number;
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  warningIndicators: string[];
  recommendations: string[];
  scammerIntelligence: {
    likelyOrigin: string;
    targetAudience: string;
    tacticUsed: string;
    estimatedRiskScore: string;
  };
  summary: string;
}

export async function analyzeScam(content: string, imageBase64?: string): Promise<AnalysisResult> {
  try {
    const parts: any[] = [{ text: `Perform a deep forensic analysis on the following suspicious content. 
      Don't be vague. Give a definitive safety verdict.
      Try to deduce the "who" and "how" behind the scam to create a criminal profile.

      Context/Content: "${content}"` }];

    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.split(",")[1] || imageBase64,
          mimeType: "image/jpeg"
        }
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING, description: "One of: Safe, Suspicious, Unsafe, Malicious" },
            scamProbability: { type: Type.NUMBER },
            threatLevel: { type: Type.STRING, description: "One of: Low, Medium, High, Critical" },
            warningIndicators: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            scammerIntelligence: {
              type: Type.OBJECT,
              properties: {
                likelyOrigin: { type: Type.STRING },
                targetAudience: { type: Type.STRING },
                tacticUsed: { type: Type.STRING },
                estimatedRiskScore: { type: Type.STRING }
              },
              required: ["likelyOrigin", "targetAudience", "tacticUsed", "estimatedRiskScore"]
            },
            summary: { type: Type.STRING }
          },
          required: ["verdict", "scamProbability", "threatLevel", "warningIndicators", "recommendations", "scammerIntelligence", "summary"]
        }
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze content. Please try again.");
  }
}

export async function chatAboutFraud(message: string, history: { role: "user" | "model", parts: { text: string }[] }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      history: history,
      config: {
        systemInstruction: "You are Nexlore Intelligence AI, a specialist in cybersecurity and fraud prevention. Your goal is to help users identify potential scams, explain how specific frauds work, and provide actionable advice on staying safe. Be vigilant, professional, and empathetic. If a user describes a situation, analyze it for red flags. Do not provide legal or financial advice beyond safety precautions.",
      },
    });

    const result = await chat.sendMessage({ message });
    const text = result.text;
    if (!text) throw new Error("No response from AI");
    return text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("I'm having trouble connecting to the intelligence matrix. Please try again.");
  }
}
