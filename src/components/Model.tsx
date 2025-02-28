import { GoogleGenerativeAI } from "@google/generative-ai";
import { genZ, scholar } from "./ModelTexts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: genZ 
});
const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });
  

export const generateContent = async (prompt:string): Promise<string> => {
    const result = await chat.sendMessage(prompt)
    return result.response.text(); // return the response
}

const scholarModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: scholar 
});

export const scholarChat = scholarModel.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});

export const generateDeenBuddy = async (prompt:string): Promise<string> => {
  const result = await chat.sendMessage(prompt)
  return result.response.text(); // return the response
}