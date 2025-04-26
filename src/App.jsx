import "./App.css";
import { GoogleGenAI } from "@google/genai";
import { geminiPrompt } from "./Prompt";
import { useState } from "react";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App() {
  const [aiResponse, setAiResponse] = useState(undefined);
  const [userPrompt, setUserPrompt] = useState("World war 2");

  async function onGossipGeneration() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiPrompt + userPrompt,
    });
    console.log(response.text);
    setAiResponse(response.text);
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl'>Gossip AI</h1>
      <button onClick={onGossipGeneration}>Generate your Gossip, queen</button>
      {aiResponse}
    </div>
  );
}

export default App;
