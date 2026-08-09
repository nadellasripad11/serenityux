'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang='en'>
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: 'clamp(2em, 7vw, 4em)', margin: 0 }}>
            Something broke
          </h1>
          <p style={{ maxWidth: '28rem', color: '#666' }}>
            That&apos;s on me, not you. Try reloading the page.
          </p>
          <button
            type='button'
            onClick={reset}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '999px',
              border: '1px solid currentColor',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
