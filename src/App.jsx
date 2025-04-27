import "./App.css";
import { GoogleGenAI } from "@google/genai";
import { geminiPrompt } from "./Prompt";
import { useState } from "react";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function App() {
  const [aiResponse, setAiResponse] = useState(undefined);
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onGossipGeneration() {
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: geminiPrompt + userPrompt,
      });
      console.log(response.text);
      setAiResponse(response.text);
    } catch (error) {
      console.error("Error generating gossip:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-lg mx-auto bg-white rounded-lg shadow p-6'>
        <h1 className='text-3xl font-bold text-center text-pink-500 mb-6'>Gossip AI</h1>

        <div className='mb-6'>
          <textarea
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
            className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300'
            placeholder='What topic/phrase do you want the tea to spill?'
            rows='3'
          />

          <button
            onClick={onGossipGeneration}
            disabled={isLoading}
            className='w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
          >
            {isLoading ? "Generating the tea..." : "Generate your Gossip, queen"}
          </button>
        </div>

        {aiResponse && (
          <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
            <h2 className='text-lg font-medium mb-2 text-gray-700'>The Hot Tea:</h2>
            <p className='whitespace-pre-wrap text-gray-800'>{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
