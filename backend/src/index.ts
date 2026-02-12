import  * as dotenv from 'dotenv';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import { showRoutes } from 'hono/dev';

const app = new Hono();

app.use('/gemini', cors());
app.use('/youtube', cors());

dotenv.config()

function parseData(data) {
    let res = []
    for(let i = 0; i < data.length; i++) {
        const item = data[i];
        const videoId = item["id"]["videoId"];
        const title = item["snippet"]["title"];
        let desc = item["snippet"]["description"];
        if(desc == "") {
            desc = "No description available for this video..."
        }
        const thumbnail = item["snippet"]["thumbnails"]["medium"]["url"];
        const channelId = item["snippet"]["channelTitle"]
        let tempObj = {
          "title": title,
          "desc": desc,
          "videoId": videoId,
          "thumbnail": thumbnail,
          "channelName": channelId
        };
        res.push(tempObj)
    };
    return res;
};

async function queryGemini(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY  })
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  console.log(response.text);
  return response.text
}

async function queryYouTube(searchReq: string) {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });
    const request = await youtube.search.list({
      part: ['snippet'],
      q: searchReq,
      maxResults: 3,
    });
    const response = request.data.items;
    
    return response
}

app.post('/gemini',  async (c) => {
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


app.post('/youtube', async (c) => {
  console.log("Sending data to YouTube...")
  const body = await c.req.json()
  const searchReq: string = body['search']
  try {
    const data = await queryYouTube(searchReq)
    const res = parseData(data);
    return c.json(res);
  } 
  catch (error) {
    return c.text(`Oops, encountered an error! Error Message: ${error}`)
  }
});


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});

showRoutes(app, {
  verbose: true,
});