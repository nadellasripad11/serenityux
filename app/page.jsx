import {
  Contact,
  Description,
  Header,
  Navbar,
  Project,
  Thumbnail,
  Transition,
} from '@/layout';
import { rootMetadata } from '@/config';

// The root page shares a segment with the root layout, so the layout's
// title template doesn't apply here - the full title is spelled out
// instead of relying on it, same as rootMetadata's own default.
/** @type {import('next').Metadata} */
export const metadata = {
  title: rootMetadata.title.default,
  description: rootMetadata.description,
  openGraph: rootMetadata.openGraph,
  twitter: rootMetadata.twitter,
};

export default function Home() {
  return (
    <Transition>
      <Navbar />
      <Header />
      <main>
        <Description />
        <Thumbnail />
        <Project />
      </main>
      <Contact />
    </Transition>
  );
}
