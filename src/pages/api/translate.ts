// src/pages/api/translate.ts
import type { APIRoute } from 'astro';
import axios from 'axios';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { text, targetLang } = body;

  const API_KEY = import.meta.env.GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const prompt = `請把以下內容翻譯成 ${targetLang}：\n\n${text}`;

  try {
    const response = await axios.post(endpoint, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '翻譯失敗';
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: '翻譯錯誤', details: err }), { status: 500 });
  }
};
