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
          content: `You are a highly intelligent and knowledgeable assistant capable of generating detailed and accurate FAQs. The user will provide you with content, a language preference, a persona to adopt for the responses, and the number of FAQs they want.

  Based on the provided information, generate FAQs with concise, informative, and relevant answers.

  User Input:
  1. Content: ${content}
  2. Language: ${language}
  3. Persona: ${persona}
  4. Number of FAQs: ${numQuestions}

  Your task is to:
  1. Generate the specified number of FAQs based on the content provided.
  2. Write the FAQs and answers in the specified language.
  3. Adopt the given persona while crafting the responses.

  Output format:
   Q1: [First question]
   A1: [First answer]
   Q2: [Second question]
   A2: [Second answer]
  ...
   QN: [Nth question]
   AN: [Nth answer]

  Begin:
   `,
          max_tokens: 1500,
          stop: ["\n"],
          temperature: 0.4,
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
    const faqsText = response.data.choices[0].message.content.trim();
    const faqs = faqsText.split('\n\n').map((faq: string) => {
      const [question, answer] = faq.split('\n').map(line => line.trim());
      return { question: question.replace(/^Q\d+: /, ''), answer: answer.replace(/^A\d+: /, '') };
    });

    if (!faqs) {
      throw new Error('Unexpected response format from OpenAI');
    }

    return json({ faqs });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch data from OpenAI" }, { status: 500 });
  }
};
