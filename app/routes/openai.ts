import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import axios from "axios";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const { content, numQuestions, language, persona } = body;

    // Ensure content, numQuestions, language, persona are properly used
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0125", // Use the correct model ID from your response
        messages: [{
          role: "user",
          content: `Generate ${numQuestions} FAQs in ${language} with a ${persona} persona based on the following content: ${content} with answers `,
          max_tokens: 150,
          stop: ["\n"],
          temperature: 0.7,
          stream: true
        }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Check if choices array and text property exist
    const faqs = response.data.choices?.[0]?.message?.content.split('\n').filter((faq: string) => faq.trim() !== '');

    if (!faqs) {
      throw new Error('Unexpected response format from OpenAI');
    }

    return json({ faqs });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch data from OpenAI" }, { status: 500 });
  }
};
