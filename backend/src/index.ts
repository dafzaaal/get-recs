import  * as dotenv from 'dotenv';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenAI } from "@google/genai";


const app = new Hono();

app.use('/', cors());

dotenv.config()

async function queryGemini(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY  })
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log(response.text);
  return response.text
}

app.post('/',  async (c) => {
  console.log("Sending prompt to Gemini...")
  const body = await c.req.json()
  const prompt: string = body['user_prompt']
  const data = await queryGemini(prompt)
  if (data) {
    return c.text(data)
  }
  else {
    return c.text("Error, unable to return API data...")
  }
});


app.post('/v1/youtube', async (c) => {
  true
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});
