let visitorName = '';
let windowZIndex = 1000;
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };
window.systemStart = Date.now();
let windowCount = 0;

// Portfolio data
const portfolioData = [
    { title: 'SerenityUX', date: '2025 - Present', description: 'A personal web-based operating system featuring draggable windows, multiple applications, and a beautiful glass-morphism UI.', tags: ['JavaScript', 'HTML/CSS', 'UI/UX', 'Web Design'], highlights: ['Draggable windows', 'Real-time clock', 'Multiple apps', 'Glass-morphism design', 'Dark theme'] },
    { title: 'Socle', date: '2024 - Present', description: 'A lead generation platform for luxury hospitality businesses.', tags: ['Web App', 'Full Stack', 'Startup'], highlights: ['Lead matching', 'Premium interface', 'Real-time notifications', 'Analytics dashboard'] },
    { title: 'Penny Scout', date: '2024 - Present', description: 'Advanced stock market analysis and reporting tool.', tags: ['Data', 'Analytics', 'Finance', 'Python'], highlights: ['Real-time data', 'Technical analysis', 'Portfolio tracking', 'ML insights'] },
    { title: 'LeadScan Web', date: '2024', description: 'Web-based lead management platform for sales teams.', tags: ['Web App', 'Sales Tools', 'SaaS'], highlights: ['Lead dashboard', 'Workflow automation', 'Team collaboration', 'CRM integration'] }
];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    const nameInput = document.getElementById('nameInput');
    const enterBtn = document.getElementById('enterBtn');

    if (enterBtn) {
        enterBtn.onclick = function(e) {
            e.preventDefault();
            enterOS();
            return false;
        };
    }

    if (nameInput) {
        nameInput.onkeypress = function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                enterOS();
                return false;
            }
        };
        nameInput.focus();
    }

    // Window drag listeners
    document.addEventListener('mousedown', handleWindowDrag);
    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDrag);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

function enterOS() {
    const nameInput = document.getElementById('nameInput');
    const welcomeScreen = document.querySelector('.welcome-screen');

    if (!nameInput || !welcomeScreen) return;

    visitorName = nameInput.value.trim() || 'Guest';

    // Hide welcome screen
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.95)';

    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        initializeDesktop();
    }, 600);
}

function initializeDesktop() {
    console.log(`Welcome, ${visitorName}!`);
    console.log('✅ Desktop initializing...');

    let osDesktop = document.querySelector('.os-desktop');

    if (!osDesktop) {
        osDesktop = document.createElement('div');
        osDesktop.className = 'os-desktop';
        osDesktop.innerHTML = `
            <div class="desktop">
                <div class="topbar">
                    <div class="topbar-left"><span class="system-name">SerenityOS</span></div>
                    <div class="topbar-center"><span class="visitor-name">Welcome, ${visitorName}</span></div>
                    <div class="topbar-right"><span class="time" id="systemTime">00:00</span></div>
                </div>
                <div class="desktop-content" id="desktopContent">
                    <div class="taskbar">
                        <div class="taskbar-apps" id="taskbar">
                            <button class="app-icon" data-app="about" title="About" style="font-size: 24px; font-weight: bold;">i</button>
                            <button class="app-icon" data-app="projects" title="Projects" style="font-size: 20px;">📈</button>
                            <button class="app-icon" data-app="portfolio" title="Portfolio" style="font-size: 20px;">💼</button>
                            <button class="app-icon" data-app="contact" title="Contact" style="font-size: 20px;">✉</button>
                            <button class="app-icon" data-app="notes" title="Notes" style="font-size: 20px;">📝</button>
                            <button class="app-icon" data-app="todo" title="To-Do" style="font-size: 20px;">✓</button>
                            <button class="app-icon" data-app="calculator" title="Calculator" style="font-size: 20px;">+</button>
                            <button class="app-icon" data-app="timer" title="Timer" style="font-size: 20px;">⏱</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(osDesktop);
    }

    osDesktop.classList.add('active');
    osDesktop.style.display = 'block';

    // Setup app icons
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.onclick = function() {
            const appName = this.dataset.app;
            openWindow(appName);
        };
    });

    updateTime();
    setInterval(updateTime, 1000);
}

function openWindow(appName) {
    const desktopContent = document.getElementById('desktopContent');
    if (!desktopContent) return;

    const windowId = `window-${appName}-${Date.now()}`;
    let content = '';
    let title = '';

    switch(appName) {
        case 'about':
            title = 'About Me';
            content = `<div class="profile-section"><h3>Hello, ${visitorName}!</h3><p>A developer and creator passionate about building innovative web experiences.</p><div class="skills"><strong>Skills:</strong> JavaScript, HTML/CSS, Web Design</div></div>`;
            break;
        case 'projects':
            title = 'Projects';
            content = `<div class="projects-grid"><div class="project-card"><h4>SerenityUX</h4><p>A personal web-based operating system.</p><span class="tag">JavaScript</span></div><div class="project-card"><h4>Socle</h4><p>Lead generation platform for luxury hospitality.</p><span class="tag">Web App</span></div></div>`;
            break;
        case 'portfolio':
            title = 'Portfolio';
            content = `<div class="portfolio-container"><div class="portfolio-sidebar" id="portfolioSidebar"></div><div class="portfolio-content" id="portfolioContent"></div></div>`;
            break;
        case 'contact':
            title = 'Contact';
            content = `<div class="contact-form"><form><input type="email" placeholder="Your email" required><textarea placeholder="Message"></textarea><button type="submit">Send</button></form></div>`;
            break;
        case 'notes':
            title = 'Notes';
            content = `<div class="notes-container"><div class="notes-sidebar"><button class="new-note-btn">+ New</button></div><div class="notes-editor"><input type="text" class="note-title" placeholder="Title"><textarea class="note-content" placeholder="Write..."></textarea></div></div>`;
            break;
        case 'todo':
            title = 'To-Do';
            content = `<div class="todo-container"><div class="todo-input-section"><input class="todo-input" placeholder="Add task..."><button class="add-todo-btn">Add</button></div><div class="todo-list"></div></div>`;
            break;
        case 'calculator':
            title = 'Calculator';
            content = `<div class="calculator"><div class="calc-display">0</div><div class="calc-buttons" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;"><button>7</button><button>8</button><button>9</button><button>÷</button><button>4</button><button>5</button><button>6</button><button>×</button><button>1</button><button>2</button><button>3</button><button>−</button><button>0</button><button>.</button><button>=</button><button>+</button></div></div>`;
            break;
        case 'timer':
            title = 'Timer';
            content = `<div class="timer-container"><div class="timer-display">25:00</div><div class="timer-controls"><button>Start</button><button>Pause</button><button>Reset</button></div></div>`;
            break;
    }

    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = windowId;
    windowEl.style.zIndex = ++windowZIndex;
    windowEl.style.left = (50 + Math.random() * 200) + 'px';
    windowEl.style.top = (80 + Math.random() * 150) + 'px';

    windowEl.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title}</span>
            <button class="window-close">×</button>
        </div>
        <div class="window-content">${content}</div>
    `;

    desktopContent.appendChild(windowEl);

    windowEl.querySelector('.window-close').onclick = function() {
        windowEl.remove();
    };

    windowEl.onmousedown = function() {
        windowEl.style.zIndex = ++windowZIndex;
    };

    windowCount++;
}

function handleWindowDrag(e) {
    const windowHeader = e.target.closest('.window-header');
    if (!windowHeader) return;

    draggedWindow = windowHeader.closest('.window');
    const rect = draggedWindow.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
}

function dragWindow(e) {
    if (!draggedWindow) return;
    draggedWindow.style.left = (e.clientX - dragOffset.x) + 'px';
    draggedWindow.style.top = (e.clientY - dragOffset.y) + 'px';
}

function stopDrag() {
    draggedWindow = null;
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeElement = document.getElementById('systemTime');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

function handleKeyboard(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
        e.preventDefault();
        openWindow('about');
    }
}

console.log('SerenityUX ready!');
