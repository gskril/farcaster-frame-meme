import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs'

export const BASE_URL = process.env.BASE_URL

// generate an html page with the relevant opengraph tags
export function generateFarcasterFrame(image: string, choice: number) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:post_url" content="${BASE_URL}/api/post" />

      ${
        choice === 2
          ? '<meta property="fc:frame:button:1" content="Yes" />'
          : ''
      }
    </head>
    <body>
      
    </body>
    </html>
  `
}

export async function validateMessage(messageBytes: string) {
  const client = getSSLHubRpcClient('https://nemes.farcaster.xyz:2283', {
    debug: true,
  })

  const hubMessage = Message.decode(Buffer.from(messageBytes, 'hex'))
  const res = await client.validateMessage(hubMessage)

  if (res.isOk() && res.value.valid) {
    return true
  } else {
    return false
  }
}
