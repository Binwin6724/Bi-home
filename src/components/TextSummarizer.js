import React, { useState } from "react";
import { marked } from "marked";

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const summarizeText = async () => {
    if (!inputText.trim()) {
      setSummary("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDFwXQb_-HBeU_fiGPVo22YH1vNDjmYkcU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Summarize ${inputText}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const summaryMarkdown =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No summary generated.";

      // Convert the Markdown to HTML
      const summaryHTML = marked(summaryMarkdown);
      setSummary(summaryHTML);
    } catch (error) {
      console.error("Summarization error:", error);
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Text Summarizer</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows="10"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        placeholder="Enter your text here..."
      />
      <button
        onClick={summarizeText}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <div style={{ marginTop: "20px", color: "red" }}>{error}</div>}
      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary:</h3>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
