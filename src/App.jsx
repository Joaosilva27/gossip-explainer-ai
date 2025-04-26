import "./App.css";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "whats 1*1",
  });
  console.log(response.text);
}

main();

function App() {
  return (
    <div>
      <h1 className='text-2xl'>sassy explainer</h1>
    </div>
  );
}

export default App;
