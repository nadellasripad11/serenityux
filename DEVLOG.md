# devlog

just some notes on what i've been up to w/ serenityos lately. nthn formal, just vibes.

## gave the whole thing a glow up

the old look wasn't really doing it for me, so i rebuilt the ui from scratch —
the landing page, the about + docs pages, and the desktop itself all feel like
one thing now. big clean type, lots of breathing room, calm colors. way happier
w/ how it reads.

## added 3 new features

1. **browser** — a lil web browser right inside the os. type a url, hit go, and
   it loads in a window. (heads up: some sites block embedding so those won't
   show, but the ones that allow it work fine.)
2. **paint** — a canvas u can actually draw on. pick a color, change the brush
   size, clear it, or save ur doodle as a png.
3. **new animated ui** — smooth little motion everywhere: headings that reveal
   word-by-word as u scroll, and buttons that drift toward ur cursor. makes the
   whole thing feel alive.

## other little cleanups

- trimmed the repo down so it's just the os now, nthn extra
- made it open source (mit) so anyone can poke around
- killed some old janky animations that were fighting the new ones

that's it for now. prob more soon :)
