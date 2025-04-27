import "./App.css";
import { GoogleGenAI } from "@google/genai";
import { geminiPrompt } from "./Prompt";
import { useState } from "react";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App() {
  const [aiResponse, setAiResponse] = useState(undefined);
  const [userPrompt, setUserPrompt] = useState("");

  async function onGossipGeneration() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: geminiPrompt + userPrompt,
    });
    console.log(response.text);
    setAiResponse(response.text);
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl'>Gossip AI</h1>
      <div>
        <input onChange={e => setUserPrompt(e.target.value)} className='w-fit border-2 rounded-lg' placeholder='Type in your prompt..' />
        <button onClick={onGossipGeneration}>Generate your Gossip, queen</button>
      </div>

      {aiResponse}
    </div>
  );
}

export default App;
