// app/routes/faq-generator.tsx
import { useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

export default function FaqGenerator() {
  const [content, setContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState('en');
  const [persona, setPersona] = useState('professional');
  const [faqs, setFaqs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/openai', {
        content,
        numQuestions,
        language,
        persona,
      });
      setFaqs(response.data.faqs);
    } catch (error) {
      console.error('Error generating FAQs:', error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FAQ Generator</h1>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Input Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={5}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Questions:
        </label>
        <input
          type="range"
          id="numQuestions"
          min={1}
          max={10}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          className="w-full"
        />
        <span>{numQuestions}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="persona" className="block text-sm font-medium text-gray-700 mb-1">
          Select Persona:
        </label>
        <select
          id="persona"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="friendly">Friendly</option>
          <option value="technical">Technical</option>
          <option value="formal">Formal</option>
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={generateFAQs}
          className={`w-full bg-blue-500 text-white p-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate FAQs'}
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Generated FAQs</h2>
        <ul className="list-disc pl-5">
          {faqs.map((faq, index) => (
            <li key={index}>{faq}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
