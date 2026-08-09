/**
 * Preloader greeting shown per page, in English, French, Italian,
 * Portuguese, Arabic, Japanese, Swedish, German, and Dutch - same order
 * on every page so the rhythm stays consistent, only the word changes.
 */
const home = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olá',
  'سلام',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
];

const work = [
  'Work',
  'Travail',
  'Lavoro',
  'Trabalho',
  'عمل',
  '仕事',
  'Arbete',
  'Arbeit',
  'Werk',
];

const about = [
  'About',
  'À propos',
  'Chi sono',
  'Sobre',
  'حول',
  'について',
  'Om mig',
  'Über mich',
  'Over mij',
];

const contact = [
  'Contact',
  'Contact',
  'Contatto',
  'Contato',
  'اتصل',
  '連絡',
  'Kontakt',
  'Kontakt',
  'Contact',
];

/** Fallback for project pages ([slug]) - they live under /work. */
const project = work;

export const preloaderWords = home;

/** @param {string} pathname */
export function getPreloaderWords(pathname) {
  if (pathname === '/') return home;
  if (pathname.startsWith('/work')) return work;
  if (pathname.startsWith('/about')) return about;
  if (pathname.startsWith('/contact')) return contact;
  return project;
}
