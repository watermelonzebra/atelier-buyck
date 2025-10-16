import { generateSitemap } from '../utils/generateSitemap'

export async function handleWebhook(req: Request) {
  const body = await req.json()
  
  // Verify webhook secret if you have one
  // const secret = req.headers.get('x-webhook-secret')
  // if (secret !== process.env.WEBHOOK_SECRET) return new Response('Unauthorized', { status: 401 })

  if (body._type === 'post') {
    await generateSitemap()
    return new Response('Sitemap updated', { status: 200 })
  }

  return new Response('No action needed', { status: 200 })
}