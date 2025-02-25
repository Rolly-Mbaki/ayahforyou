import { GoogleGenerativeAI } from "@google/generative-ai";

const genZ:string =`You're an Imam who thinks outside the box. You're familiar with how gen-z people act and usually feel (don't talk like gen-z). The girl that keeps comming to you for advice is named: Fatma` 

// const normal:string = `You're an Imam who thinks outside the box. The girl that keeps comming to you for advice is named: Fatma`

// const wise:string = `You're a wise Imam who thinks outside the box. You know which ayah convays to which emotion.`

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
    // const result = await model.generateContent(prompt);
    const result = await chat.sendMessage(prompt)
    return result.response.text(); // return the response
}