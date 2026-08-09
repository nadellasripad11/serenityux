// Prefer a custom domain if one is set, otherwise fall back to the URL
// Vercel automatically provides for every deployment, then localhost for
// local dev. Set NEXT_PUBLIC_SITE_URL once a custom domain is live.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  'http://localhost:3000';

const description =
  'building things that solve real problems. from ai-powered tools to discovery platforms, i like turning ideas into projects people actually use.';

// Set explicitly (rather than relying on the opengraph-image.jsx file
// convention alone) because that auto-discovery only reaches the exact
// segment the file lives in - nested routes like /work or /socle lose it
// the moment they define their own openGraph object, even one built by
// spreading rootMetadata.openGraph. An explicit `images` array here
// carries through to every page via pageMetadata below.
const shareImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'sripad nadella - high school student & builder',
};

/** @type {import('next').Metadata} */
export const rootMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | sripad nadella',
    default: 'sripad nadella - high school student & builder',
  },
  description,
  generator: 'sripad nadella',
  applicationName: 'sripad nadella',
  referrer: 'origin-when-cross-origin',
  keywords: ['high school student', 'builder', 'ai', 'projects'],
  authors: [
    { name: 'sripad nadella', url: 'https://www.github.com/nadellasripad11' },
  ],
  creator: 'sripad nadella',
  publisher: 'sripad nadella',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'sripad nadella',
    title: 'sripad nadella - high school student & builder',
    description,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sripad nadella - high school student & builder',
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
 * JSON-LD Person schema, injected as a <script type="application/ld+json">
 * in the root layout. This is the main lever for search engines to
 * associate "sripad nadella" the search query with this specific site
 * rather than treating it as a generic page - the `sameAs` links tie the
 * name to the GitHub/LinkedIn/Instagram profiles as the same entity.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sripad Nadella',
  url: siteUrl,
  image: `${siteUrl}/images/portrait.png`,
  description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alpharetta',
    addressRegion: 'Georgia',
    addressCountry: 'US',
  },
  sameAs: [
    'https://github.com/nadellasripad11',
    'https://www.instagram.com/sripadnadella/',
    'https://www.linkedin.com/in/sripad-nadella/',
  ],
};

/**
 * Per-page metadata builder. `openGraph`/`twitter` aren't deep-merged with
 * the root metadata by Next.js - a page that sets its own `openGraph` loses
 * the root's `card`/`image`/`siteName` entirely - so this carries those
 * forward explicitly instead of every page having to repeat them.
 *
 * @param {Object} params
 * @param {string} params.title Plain segment title, e.g. 'work'. The root
 * title template turns it into 'work | sripad nadella' for the <title> tag.
 * @param {string} params.description
 * @param {string} [params.path] Route path for openGraph.url, e.g. '/work'.
 */
export function pageMetadata({ title, description: pageDescription, path = '' }) {
  const fullTitle = `${title} | sripad nadella`;

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
