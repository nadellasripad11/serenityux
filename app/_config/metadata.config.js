// Prefer a custom domain if one is set, otherwise fall back to the URL
// Vercel automatically provides for every deployment, then localhost for
// local dev. Set NEXT_PUBLIC_SITE_URL once a custom domain is live.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  'http://localhost:3000';

const description =
  'Serenity UX - a design studio crafting calm, thoughtful digital experiences. Products that feel as good as they look.';

// Set explicitly (rather than relying on the opengraph-image.jsx file
// convention alone) because that auto-discovery only reaches the exact
// segment the file lives in - nested routes like /work lose it the moment
// they define their own openGraph object, even one built by spreading
// rootMetadata.openGraph. An explicit `images` array here carries through
// to every page via pageMetadata below.
const shareImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Serenity UX - design & product studio',
};

/** @type {import('next').Metadata} */
export const rootMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Serenity UX',
    default: 'Serenity UX - design & product studio',
  },
  description,
  generator: 'Serenity UX',
  applicationName: 'Serenity UX',
  referrer: 'origin-when-cross-origin',
  keywords: ['design', 'ux', 'product design', 'ui', 'studio'],
  authors: [{ name: 'Sripad' }],
  creator: 'Sripad',
  publisher: 'Serenity UX',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Serenity UX',
    title: 'Serenity UX - design & product studio',
    description,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serenity UX - design & product studio',
    description,
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

/**
 * JSON-LD schema, injected as a <script type="application/ld+json"> in the
 * root layout. Helps search engines associate the "Serenity UX" brand with
 * this specific site rather than treating it as a generic page.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Serenity UX',
  url: siteUrl,
  description,
};

/**
 * Per-page metadata builder. `openGraph`/`twitter` aren't deep-merged with
 * the root metadata by Next.js - a page that sets its own `openGraph` loses
 * the root's `card`/`image`/`siteName` entirely - so this carries those
 * forward explicitly instead of every page having to repeat them.
 *
 * @param {Object} params
 * @param {string} params.title Plain segment title, e.g. 'work'. The root
 * title template turns it into 'work | Serenity UX' for the <title> tag.
 * @param {string} params.description
 * @param {string} [params.path] Route path for openGraph.url, e.g. '/work'.
 */
export function pageMetadata({ title, description: pageDescription, path = '' }) {
  const fullTitle = `${title} | Serenity UX`;

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      ...rootMetadata.openGraph,
      title: fullTitle,
      description: pageDescription,
      url: `${siteUrl}${path}`,
    },
    twitter: {
      ...rootMetadata.twitter,
      title: fullTitle,
      description: pageDescription,
    },
  };
}
