# serenityos

a lil web-based os i built w/ plain html, css & js. no frameworks, no build step, nthn fancy. just open it and it runs.

## what's in it

it's a fake desktop w/ draggable windows + a dock. rn there's 11 apps:

- **about** – quick bio
- **projects** – stuff i've made (all personal + non-commercial btw)
- **portfolio** – activities & projects
- **contact** – drop a msg (saved locally, no server)
- **notes** – write notes, they stick around
- **to-do** – basic task list
- **calculator** – does the math
- **timer** – 25min pomodoro
- **messages** – shows msgs left in the contact app
- **browser** – mini browser w/ an address bar (heads up: some sites block embedding so they won't load)
- **paint** – draw on a canvas, pick colors, save as png

notes / to-do / msgs all save to localStorage so they're still there when u come back.

## run it

easiest way, just open `index.html` in ur browser.

or spin up a lil server:

```bash
npm run dev      # http-server on :8000
# or
npx serve
```

## stack

- html5 + css3
- vanilla js (es6+), no libs
- localStorage for saving stuff
- neue montreal for the font

## notes

everything here is a personal, non-commercial project i made for fun + to learn. that's it :)

## license

not open source. see `LICENSE` — pls don't copy/redistribute.
