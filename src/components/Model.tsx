import { genZ, scholar } from "./ModelTexts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

// const model = genAI.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents:"Hello there",
//     config: {
//       systemInstruction: genZ
//     }
// });

const chat = genAI.chats.create({
  model: "gemini-2.5-flash",
  config: {
    systemInstruction: genZ,
  },
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

export const generateContent = async (prompt: string): Promise<string> => {
  const response = await chat.sendMessage({ message: prompt });

  if (response.text == undefined) {
    return "error";
  }

  return response.text!; // return the response
};

// const scholarModel = genAI.models.generateContent({
//   model: "gemini-1.5-flash",
//   contents: "Hello there",
//   config: {
//     systemInstruction: scholar,
//   },
// });

export const scholarChat = genAI.chats.create({
  model: "gemini-1.5-flash",
  config: {
    systemInstruction: scholar,
  },
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

export const generateDeenBuddy = async (prompt: string): Promise<string> => {
  const response = await chat.sendMessage({ message: prompt });

  if (response.text == undefined) {
    return "error";
  }

  return response.text; // return the response
};
