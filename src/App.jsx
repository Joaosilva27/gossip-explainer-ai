import "./App.css";
import { GoogleGenAI } from "@google/genai";
import { geminiPrompt } from "./Prompt";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  function clearText() {
    setUserPrompt("");
    setAiResponse(undefined);
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <header className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500'>GOSSIP AI</h1>
        </header>

        <div className='mb-6'>
          <textarea
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
            className='w-full bg-black/40 border-2 border-pink-500 rounded-lg p-3 text-white placeholder-pink-300/70 focus:outline-none focus:ring-2 focus:ring-pink-400'
            placeholder='Enter any keyword, name, or phrase to transform it into juicy gossip...'
            rows='3'
          />

          <div className='flex gap-3 mt-3'>
            <button
              onClick={onGossipGeneration}
              disabled={isLoading}
              className='flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 uppercase tracking-wider'
            >
              {isLoading ? "Generating the gossip..." : "Spill the tea honey 💅"}
            </button>

            <button
              onClick={clearText}
              className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105'
            >
              Clear
            </button>
          </div>
        </div>

        {aiResponse && (
          <div className='mt-8 p-5 bg-black/50 rounded-lg border-l-4 border-pink-500'>
            <h2 className='text-xl font-bold mb-4 text-pink-300 flex items-center'>
              <span className='mr-2'>✨</span> THE HOT TEA <span className='ml-2'>✨</span>
            </h2>
            <div className='text-pink-100 font-medium'>
              <ReactMarkdown
                children={aiResponse}
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: "h2",
                  p: ({ node, ...props }) => (
                    <div className='mb-8'>
                      <p className='leading-relaxed' {...props} />
                    </div>
                  ),
                }}
              />
            </div>
            <div className='mt-6 text-center text-pink-300/80 text-sm'>Hope you enjoyed the tea honey.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
