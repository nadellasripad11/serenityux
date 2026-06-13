# SerenityOS - Web-Based Operating System

A fully functional web-based OS with vanilla JavaScript, 8 interactive apps, draggable windows, and premium minimalist design.

**🔗 Live Demo:** https://serenityux.vercel.app  
**📦 Repository:** https://github.com/nadellasripad11/serenityux

---

## ✨ What's Included

### Welcome Screen
- Premium hero design with minimalist aesthetic
- Personalized entry form
- Smooth transition to desktop

### Desktop (8 Functional Apps)
- **About Me** - Bio + skills showcase
- **Projects** - Portfolio (SerenityUX, Socle, Penny Scout)
- **Portfolio** - Work history timeline  
- **Contact** - Email form with validation
- **Notes** - Save notes with localStorage persistence
- **To-Do** - Task list with add/delete (localStorage)
- **Calculator** - Full calculator with operations (+, -, ×, ÷)
- **Timer** - 25min Pomodoro with start/pause/reset

### Window Management
- Drag windows by header
- Close with × button
- Smart positioning prevents overlap
- Z-index layering
- Smooth animations

### System Features
- Real-time clock (updates every second)
- Personalized greeting with your name
- Responsive taskbar with text labels
- Professional styling

---

## 🛠️ Tech

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser localStorage
- **Styling:** Flexbox, Grid, Animations, Glass-morphism
- **Deployment:** Vercel (auto git deploy)
- **Size:** <50KB (no frameworks!)

---

## 🚀 Test Every Feature

**Timer:** Click "Timer" → "Start" → Counts down from 25:00 ✅  
**To-Do:** Type task → Enter or click "Add" → Delete with × → Persists ✅  
**Notes:** Title + content → "Save Note" → See confirmation → Persists ✅  
**Calculator:** 5 + 3 = → Shows 8 ✅  
**Contact:** Fill email + message → Send → See confirmation ✅  
**Windows:** Open multiple → Drag by header → Close with × ✅  
**Clock:** Topbar updates every second ✅

---

## 🎨 Design Highlights

- **Color Scheme:** Black background with subtle teal gradient
- **Typography:** 5rem hero title (300 weight), system fonts
- **Effects:** Glass-morphism blur, smooth animations, hover transitions
- **Responsive:** Desktop & tablet optimized

---

## 📊 Building Process

### Phase 1: Design
- Premium minimalist aesthetic inspired by modern OS
- Welcome screen with hero typography
- Planned 8 applications

### Phase 2: HTML & CSS
- Welcome screen + desktop structure
- Glass-morphism effects
- Responsive layouts
- Smooth animations

### Phase 3: JavaScript
- Window dragging with mouse events
- Calculator with safe expression evaluation
- Timer with setInterval
- localStorage persistence
- Form validation

### Phase 4: Bug Fixes & Optimization  
- **Fixed:** Desktop container now fills viewport (100vh)
- **Fixed:** Windows now visible (position: fixed)
- **Added:** Smart positioning prevents overlap
- **Improved:** Changed emoji icons to text labels
- **Improved:** Responsive button sizing
- **Added:** Auto-open windows on entry

### Key Solutions

| Problem | Solution |
|---------|----------|
| Windows invisible | Set container to 100vh with flex layout |
| Windows overlap | Grid-based positioning algorithm |
| Cramped buttons | Changed to padding-based sizing |
| Confusing icons | Replaced emoji with clear text labels |
| Empty desktop | Auto-open About + Projects |

---

## 💻 How to Run Locally

```bash
git clone https://github.com/nadellasripad11/serenityux.git
cd serenityux
npm install
npm run dev
# Visit http://localhost:8000
```

**Files:**
- `index.html` - Welcome + OS structure
- `styles.css` - All styling & animations  
- `script.js` - All functionality

---

## 📈 Quality

- **Lighthouse Score:** 90+
- **Bundle Size:** <50KB (vanilla, no frameworks)
- **Browser Support:** All modern browsers
- **Performance:** Fast load, smooth animations
- **Accessibility:** Semantic HTML, high contrast, clear labels

---

## 🔮 Future Enhancements

- File system with folders
- Settings/customization app
- Music player
- Text editor
- Mobile optimization
- Notifications
- Mini games
- Code editor

---

## 👨‍💻 Creator

**Sripad Nadella** - Full-stack developer passionate about innovative web experiences

- **GitHub:** [nadellasripad11](https://github.com/nadellasripad11)
- **Email:** nadellasripad11@gmail.com
- **Projects:** SerenityOS, Socle, Penny Scout

---

**Built with ❤️ using vanilla JavaScript | Deployed on Vercel**
