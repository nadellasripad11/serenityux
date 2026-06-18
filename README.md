# SerenityOS

I built a web-based operating system. It's literally just HTML, CSS, and JavaScript. No React, no frameworks, nothing fancy. Just vanilla JS.

You can drag windows around. Open apps like a notes app, calculator, timer, to-do list, all that stuff. Everything saves to your browser so your data sticks around. The whole thing is under 50KB.

Try it here: https://serenityux.vercel.app

Just put in your name and click Launch. That's it. No install, no login, no BS.

## What's in it

9 apps that work:
- About (shows my bio)
- Projects (shows stuff I've built)
- Portfolio (experience and skills)
- Contact (send me a message)
- Notes (write stuff, it saves)
- To-Do (tasks that persist)
- Calculator (actually works)
- Timer (25 minute pomodoro)
- Messages (shows messages from the contact form)

You can drag windows by the header. They don't overlap. You can close them, maximize them, minimize them, resize them. Works like a real OS.

## How I built it

Window management is just event listeners. When you drag, it calculates where the mouse is and moves the window. Z-index layering handles stacking. Nothing crazy.

localStorage keeps your data in the browser. So notes, todos, messages all stick around even if you close the tab and come back later.

Animations are all CSS. No JavaScript animation libraries. Keeps it fast.

## File sizes

- HTML: 15KB
- CSS: 35KB
- JavaScript: 20KB
- Total: under 50KB

No build step. No dependencies. Just clone and run `python3 -m http.server 8000` and open it in your browser.

## About me

I build things. Mostly real products with actual users, not prototypes.

Built Socle - an AI thing for hotels to analyze guest feedback. Pitched to like 50+ hotels.

Built Tipster - QR code tipping app for restaurants.

Built TrueCost - personal finance app that shows you how many hours of work each purchase costs.

Started The Climate Note - a global student environmental publication.

Built a biology study platform that thousands of students used.

I'm into solving real problems with code. This OS is one of those things I built.

## AI Declaration

I used Claude (Haiku 4.5) to bounce ideas around while building this, debug some stuff, and help write the README. But I tested and reviewed everything before shipping. AI was useful, not a replacement.

Hit me up:
- GitHub: github.com/nadellasripad11
- Email: nadellasripad11@gmail.com

Built with vanilla JavaScript. Deployed on Vercel.
