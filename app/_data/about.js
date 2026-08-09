/**
 * Content for the /about page. Everything here is plain text - edit this file
 * to change the page, no component changes needed.
 */
export const about = {
  portrait: '/images/portrait.png',
  location: 'Alpharetta, Georgia',
  timeZone: 'America/New_York',

  // The large word-reveal statement under the portrait.
  statement:
    'Building things that solve real problems. From AI-powered tools to discovery platforms, I like turning ideas into projects people actually use.',

  intro: [
    "I'm a high school student who likes building things.",
    "Most of my time is spent turning random ideas into small projects, whether that's designing the UI, writing the code, talking to friends who try them, or figuring out how to make each one a little better. I care as much about how something feels to use as how it works under the hood.",
    "Right now I'm building Socle, helping run SFE Foundry, and learning as much as I can about AI, product design, and building things end to end.",
  ],

  currentlyBuilding: [
    {
      title: 'Socle',
      href: '/socle',
      description:
        'A platform to help people discover restaurants and cafés through curated recommendations instead of endless reviews.',
    },
    {
      title: 'SFE Foundry',
      href: null,
      description:
        'A community where students build projects together, host hackathons, and learn from each other.',
    },
  ],

  // Projects the user explicitly wanted highlighted here. These slugs must
  // match projects in ./projects.js - anything missing is silently skipped.
  builtSlugs: ['socle', 'bio-eoc-prep', 'truecost', 'pennyscout'],

  currentlyLearning: [
    'AI & LLMs',
    'Product design',
    'Full-stack development',
    'How things get built and shared',
  ],

  outsideOfCoding:
    "When I'm not building, you'll probably find me at the gym, playing basketball or tennis, or working on whatever idea I can't stop thinking about.",
};
