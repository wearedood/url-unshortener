"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReveal() {
    if (!url.trim()) {
      setResult("Please enter a URL");
      return;
    }

    setLoading(true);
    setResult("Revealing...");
    
    try {
      const res = await fetch(`/api/unshorten?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(data.finalUrl || "Could not resolve URL.");
      }
    } catch (err) {
      setResult("Error resolving URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🔗 URL Revealer
        </h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter shortened URL:
            </label>
            <input
              id="url-input"
              type="url"
              placeholder="https://tinyurl.com/example or https://bit.ly/example"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleReveal()}
            />
          </div>
          
          <button
            onClick={handleReveal}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? "Revealing..." : "Reveal URL"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-semibold text-gray-700 mb-2">Result:</h3>
            <p className="break-all text-sm text-gray-800 font-mono bg-white p-3 rounded border">
              {result}
            </p>
          </div>
        )}
      </div>
      
      <div className="text-center text-sm text-gray-600 max-w-md">
        <p>Enter a shortened URL (like bit.ly, tinyurl.com, etc.) to reveal the actual destination.</p>
      </div>
    </main>
  );
}
