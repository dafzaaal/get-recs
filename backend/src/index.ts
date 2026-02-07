import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { html } from 'hono/html'

const app = new Hono()

app.use('/', cors())

app.get('/', (c) => {
  const body = {
    GeminiResponse: "this is where we'll return the gemini output",
    YouTubeRecs: {
      urls: 'Will be an array containing the video urls, will be attached as hrefs',
      thumbnails: 'Will also be an array pointing to the thumbnail image for the video',
      title: 'Title of the video'
    }
  }
  c.header('Content-Type', 'application/json')
  return c.json(JSON.stringify(body))
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
