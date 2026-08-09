# devlog

just some notes on building this site. not a changelog, just vibes.

---

**the idea**

got tired of every portfolio template looking the same. the generic
next.js + tailwind starter blogs are fine but they all kinda blend
together. wanted something that actually felt alive - animations that
feel human, not just a card grid with a fade-in.

found a portfolio online that was exactly the vibe i wanted. smooth
scroll, magnetic buttons, that hover-preview thing on the project list.
cloned it and started ripping out everything that wasn't mine.

**making it actually mine**

swapped every name, email, social link. killed the cloudinary dependency
bc i didn't want to deal with an account just to show images - moved
everything to plain next/image w/ local files instead. way simpler.

first pass at projects was kinda embarrassing ngl - i had claude guess at
achievements based on vibes and skill tags instead of asking me. fixed
that. now every stat on the site is something that actually happened.
socle's real waitlist number, equity intel's real alert count, the
actual story behind why i built where's my context (bc chatgpt and
claude kept forgetting everything mid-project lol, the irony is not
lost on me).

**bugs n fixes**

- hover preview was cropping my wide screenshots and cutting off titles.
  turned out the box was square but my images are landscape. fixed by
  making the box landscape too + switching to object-contain so nothing
  gets sliced
- favicon was literally someone else's face in the browser tab for like a week
  before i caught it. swapped for an "sn" monogram
- the "get in touch" ball on the contact page was basically frozen, only
  moved like 100px total. now it actually travels the whole line when u
  scroll down
- homepage gallery used to be one giant sliding filmstrip mixing real
  screenshots with placeholder svgs. looked messy. redid it as a clean
  2x2 grid of just the 4 real projects (socle, equity intel, where's my
  context, bio eoc) - other 4 still live on /work once they've got real
  images too

**pages**

added actual case-study pages for all 8 projects instead of just static
thumbnails - clicking anything now goes somewhere. also built out
/about properly: real intro in my own words, what i'm building rn (socle
+ sfe foundry), stuff i've built, stuff i'm learning, what i do outside
of code. felt weird writing about myself but it's better than a wall of
buzzwords.

also made the preloader say something different depending on what page
you're loading - "hello" on home, "work" on /work, "about" on /about,
etc, in like 9 languages each. small detail but it's the kind of thing
that makes a site feel considered instead of copy-pasted.

**what's still on the list**

- real screenshots for student insight lab, the climate note, truecost,
  pennyscout (rn they're placeholder graphics)
- profile photo (still an "sn" circle rn)
- custom domain instead of the vercel one
- resume download button somewhere near contact

not trying to make this perfect, just trying to make it real.
