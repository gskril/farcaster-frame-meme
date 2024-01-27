import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasText = searchParams.get('text')
    const text = hasText
      ? searchParams.get('text')
      : 'Search the Farcaster protocol'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Satoshi',
            width: '100%',
            height: '100%',
            backgroundColor: '#1c1626',
            transform: 'scale(1.5) translateY(-1%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              fontSize: '40px',
              fontFamily: 'Satoshi-Bold',
              transform: 'scale(0.9)',
              marginBottom: '8px',
            }}
          >
            <h1
              style={{
                lineHeight: '1',
                padding: '0 0 0 10px',
              }}
            >
              Searchcaster
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#4d4063',
              width: 'auto',
              maxWidth: '600px',
              borderRadius: '50px',
              border: '1px solid #6f6581',
              padding: '6px 18px',
              fontSize: '24px',
              color: '#eee4ff',
            }}
          >
            <span
              style={{
                minWidth: '280px',
                opacity: `${hasText ? 1 : 0.5}`,
              }}
            >
              {text}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
