# SerenityOS 🖥️

> A beautiful, fully-functional web-based operating system built with vanilla JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue)](https://serenityux.vercel.app)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## 🌟 Live Demo

**➜ [Visit SerenityOS Live](https://serenityux.vercel.app)**

Experience the OS right now! Enter your name and explore 8 fully functional applications.

---

## ✨ Features

### Core OS Functionality
- 🎯 **Personalized Welcome Screen** - Beautiful animated entrance with name input
- 📱 **Dynamic Desktop** - Responsive topbar with real-time clock and taskbar
- 🕐 **Real-time Clock** - Live-updating system time (updates every second)
- 🖱️ **Window Management** - Draggable windows with smooth animations
- 📊 **Z-Index Layering** - Click any window to bring it to front
- ✕ **Window Controls** - Close any window with one click

### 8 Built-in Applications

| App | Features |
|-----|----------|
| **About Me** | Personal profile with bio and skills showcase |
| **Projects** | Project cards with descriptions and technology tags |
| **Portfolio** | Professional work timeline and project overview |
| **Contact** | Email form with validation and contact information |
| **Notes** | Note-taking app with localStorage persistence |
| **To-Do** | Task manager with add/delete functionality |
| **Calculator** | Full-featured calculator with all operations (+, -, ×, ÷) |
| **Timer** | Pomodoro timer (25:00) with Start/Pause/Reset controls |

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation needed!

### Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/nadellasripad11/serenityux.git
cd serenityux

# Serve with Python (Python 3)
python3 -m http.server 8000

# Or use Node.js http-server
npx http-server

# Or any other local server
# Then open http://localhost:8000 in your browser
```

### Online (Recommended)
Simply visit [serenityux.vercel.app](https://serenityux.vercel.app) - no setup required!

---

## 📁 Project Structure

```
serenityux/
├── index.html          # Main HTML structure (pre-rendered desktop)
├── script.js           # All JavaScript functionality (19KB)
├── styles.css          # Complete styling with animations (26KB)
├── package.json        # Project metadata
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Key Components

**index.html**
- Semantic HTML structure
- Pre-rendered desktop elements (for reliable CSS loading)
- Accessible form elements with proper IDs

**script.js**
- `setupEventListeners()` - Initialize all event handlers
- `enterOS()` - Transition from welcome to desktop
- `openWindow()` - Dynamic app window creation
- `setupAppFunctionality()` - Individual app logic
- Window drag/close management
- Real-time clock updates

**styles.css**
- Glass-morphism design patterns
- Dark theme with purple accents (#a78bfa)
- Smooth animations and transitions
- Responsive layout
- Professional color palette

---

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **State Management**: Browser localStorage
- **Styling**: CSS animations, gradients, backdrop filters
- **Deployment**: Vercel (automatic from GitHub)
- **Version Control**: Git + GitHub
- **Browser APIs**: DOM API, localStorage API, setInterval

---

## 🎮 How to Use

### Getting Started
1. Visit [serenityux.vercel.app](https://serenityux.vercel.app)
2. Enter your name in the welcome screen
3. Click "ENTER OS" or press Enter
4. Explore the desktop!

### Using Applications

**To-Do App**
- Click the ✓ icon
- Type a task and click "Add"
- Tasks are saved automatically
- Click × next to a task to delete it

**Notes App**
- Click the 📝 icon
- Write your title and content
- Click "Save Note" to store in browser
- Notes persist across sessions

**Calculator**
- Click the + icon
- Enter numbers and operations
- Click = to calculate
- Supports +, -, ×, ÷ operations

**Timer**
- Click the ⏱ icon
- Click "Start" to begin the 25-minute Pomodoro timer
- Use "Pause" to stop temporarily
- Click "Reset" to restart from 25:00

**Window Controls**
- Drag any window by its header
- Click × to close a window
- Click any window to bring it to front

---

## 💾 Data Persistence

- **To-Do Items** - Saved to browser localStorage
- **Notes** - Saved with title, content, and timestamp
- **Settings** - Clock and visitor name displayed
- Data persists across browser sessions (until cache cleared)

---

## 🎨 Design Highlights

### Visual Design
- **Color Scheme**: Dark theme with purple accents
- **Typography**: System fonts (San Francisco, Segoe UI, Ubuntu)
- **Effects**: Glass-morphism, blur effects, smooth gradients
- **Animations**: Fade-in, slide-up, window open transitions
- **Responsive**: Works on desktop and tablet browsers

### UX Features
- Smooth window dragging without janky behavior
- Z-index management for proper window layering
- Visual feedback on hover and active states
- Form validation for contact and email fields
- Real-time clock updates for system authenticity

---

## 📊 Performance

- **Size**: ~45KB (HTML + CSS + JS combined)
- **Load Time**: <1s on most connections
- **No Dependencies**: Pure vanilla JavaScript
- **Lighthouse Score**: Excellent performance metrics
- **Browser Support**: All modern browsers

---

## 🔧 Development

### Adding a New App

1. Add a new case in `openWindow()` switch statement:
```javascript
case 'newapp':
    title = 'New App';
    content = `<div>Your app HTML here</div>`;
    break;
```

2. Add functionality in `setupAppFunctionality()`:
```javascript
else if (appName === 'newapp') {
    // Your event listeners and logic here
}
```

3. Add icon to taskbar in `index.html`:
```html
<button class="app-icon" data-app="newapp" title="New App">🆕</button>
```

### Customization

- **Colors**: Edit CSS variables and color codes in `styles.css`
- **Content**: Update bio, projects, and contact info in `script.js`
- **Apps**: Modify app content directly in the switch statement
- **Styling**: Adjust fonts, sizes, and animations in `styles.css`

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License - Free to use, modify, and distribute
```

---

## 👨‍💻 Author

**Sripad Nadella**
- GitHub: [@nadellasripad11](https://github.com/nadellasripad11)
- Email: nadellasripad11@gmail.com

Built as part of [Hack Club's webOS Jam](https://jams.hackclub.com/batch/webOS)

---

## 🙌 Credits

- Built with vanilla JavaScript (no frameworks!)
- Designed with modern web standards
- Developed with [Claude AI](https://claude.ai) for code generation and problem-solving
- Deployed on [Vercel](https://vercel.com)

---

## 📚 Resources

- [JavaScript DOM API Docs](https://developer.mozilla.org/en-US/docs/Web/API/DOM)
- [CSS Glass-morphism Guide](https://css-tricks.com/backdrop-filter/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Hack Club](https://hackclub.com) - The community behind this project

---

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Multi-window text editing
- [ ] File system simulation
- [ ] Settings/Themes app
- [ ] Music player app
- [ ] Paint/Drawing app
- [ ] Multiplayer support
- [ ] Custom themes and color schemes
- [ ] Mobile responsive improvements

---

## 🤝 Contributing

Found a bug? Have a suggestion? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

Have questions? Need help?
- Check the README carefully
- Visit [serenityux.vercel.app](https://serenityux.vercel.app) to see it in action
- Open an issue on GitHub

---

**Made with ❤️ by Sripad Nadella**

⭐ If you like this project, please give it a star!
