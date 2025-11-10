import { ImageResponse } from 'next/og';

/**
 * Generate default OG image
 * Dynamic OG image generation using Vercel's @vercel/og
 */
export const runtime = 'edge';
export const alt = 'Tenchi Flux Studios | AI-Powered Cinema';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Tenchi Flux Studios
          </h1>
          <p
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: 0,
              maxWidth: 900,
            }}
          >
            AI-Powered Cinema & Storytelling
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

