import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'sripad nadella - high school student & builder';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1a1a2e',
          color: '#f5f5f5',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: 28,
            color: '#a8a8b8',
            textTransform: 'lowercase',
            letterSpacing: 4,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#e94560',
              display: 'flex',
            }}
          />
          sripad nadella
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 96, lineHeight: 1, display: 'flex' }}>
            let&apos;s build
          </div>
          <div style={{ fontSize: 96, lineHeight: 1, display: 'flex' }}>
            something.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 32, color: '#a8a8b8' }}>
          high school student &amp; builder
        </div>
      </div>
    ),
    { ...size }
  );
}
