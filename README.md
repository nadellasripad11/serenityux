# sripad nadella / portfolio

i'm a student founder and developer from alpharetta, georgia. i like building things that people actually use, from ai-powered tools to consumer platforms to fintech experiments.

this is my personal portfolio site. it's where i show what i'm working on, what i've shipped, and a bit about who i am.

## what i'm building right now

- **socle** - a platform to discover restaurants and cafes through curated recommendations instead of endless reviews. in beta with 65+ waitlist signups.
- **equity intel** - a market intelligence platform that monitors yahoo finance, sec edgar, congressional disclosures, and insider trading to generate real-time investment alerts. i use it every day.
- **where's my context** - a persistent memory system for ai agents, because i got tired of re-explaining everything to chatgpt and claude every session.
- **sfe foundry** - a community where student founders build projects, host hackathons, and learn from each other.

## what i've shipped

- **bio eoc prep** - a biology exam prep platform that 1,000+ students used in its first month. adopted by a teacher and shared with their class.
- **truecost** - converts purchases into hours of work so you actually feel what things cost.
- **pennyscout** - stock analysis platform pulling live data from yahoo finance.
- **the climate note** - a youth-led environmental newsletter.

## about the site

built with next.js 16, react 19, framer motion, gsap + lenis, tailwind, and styled components. smooth scroll, custom cursor, parallax effects, page transitions. i wanted it to feel good to use, not just look good.

real features:
- contact form that sends real email through a server-side api route (resend), with per-ip and per-email rate limiting so it can't be spammed
- custom 404 and error boundaries
- generated open graph / twitter share image
- json-ld person schema and canonical urls for search
- security headers, csp-friendly, all deps patched to 0 vulnerabilities

## run locally

```bash
npm install
npm run dev
```

opens at localhost:3000.

## deploy

push to vercel, connect the repo, done.

## contact

- github - [nadellasripad11](https://github.com/nadellasripad11)
- linkedin - [sripad-nadella](https://www.linkedin.com/in/sripad-nadella/)
- email - nadellasripad11@gmail.com

## license

this is my personal portfolio. the code, design, and content are **not** open source and **not** available for reuse, copying, or redistribution. all rights reserved.

do not clone, fork, copy, or redistribute any part of this repo.

if you want to build something similar, build your own.
