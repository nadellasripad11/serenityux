let visitorName = '';
let windowZIndex = 1000;
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };
window.systemStart = Date.now();
let windowCount = 0;
let openWindows = {};

// Router function
function router() {
    const hash = location.hash.slice(1) || '/';
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.style.display = 'none';
    });

    switch(hash) {
        case '/':
            document.getElementById('home-page').style.display = 'block';
            break;
        case '/about':
            document.getElementById('about-page').style.display = 'block';
            break;
        case '/documentation':
            document.getElementById('documentation-page').style.display = 'block';
            break;
        case '/OS':
            document.getElementById('os-page').style.display = 'block';
            const osDesktop = document.getElementById('osDesktop');
            if (osDesktop) {
                osDesktop.style.display = 'flex';
            }
            if (!window.osInitialized) {
                window.osInitialized = true;
                setupAppIcons();
                updateTime();
                setInterval(updateTime, 1000);
                setTimeout(() => {
                    openWindow('about');
                    setTimeout(() => openWindow('projects'), 200);
                }, 100);
            }
            break;
        default:
            document.getElementById('home-page').style.display = 'block';
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupKeyboardShortcuts();
    router();
    window.addEventListener('hashchange', router);
});

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const windows = document.querySelectorAll('.window');
            if (windows.length > 0) {
                const lastWindow = windows[windows.length - 1];
                if (lastWindow.style.display !== 'none') {
                    const closeBtn = lastWindow.querySelector('.window-close');
                    closeBtn.click();
                }
            }
        }
    });
}

function setupEventListeners() {
    const nameInput = document.getElementById('nameInput');
    const enterBtn = document.getElementById('enterBtn');
    const nameForm = document.getElementById('nameForm');

    if (nameForm) {
        nameForm.onsubmit = function(e) {
            e.preventDefault();
            launchOS();
            return false;
        };
    }

    if (enterBtn) {
        enterBtn.onclick = function(e) {
            e.preventDefault();
            launchOS();
            return false;
        };
    }

    if (nameInput) {
        nameInput.onkeypress = function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                launchOS();
                return false;
            }
        };
        nameInput.focus();
    }

    // Window drag listeners
    document.addEventListener('mousedown', handleWindowDrag);
    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDrag);
}

function launchOS() {
    const nameInput = document.getElementById('nameInput');

    if (!nameInput) return;

    visitorName = nameInput.value.trim() || 'Guest';

    // Update visitor name display
    const visitorDisplay = document.getElementById('visitorDisplay');
    if (visitorDisplay) {
        visitorDisplay.textContent = `Welcome, ${visitorName}`;
    }

    // Navigate to OS page
    location.hash = '#/OS';
}

function setupAppIcons() {
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const appName = this.dataset.app;
            openWindow(appName);
        });
    });
}

function openWindow(appName) {
    const desktopContent = document.getElementById('desktopContent');
    if (!desktopContent) return;

    if (openWindows[appName]) {
        const existingWindow = openWindows[appName];
        existingWindow.style.display = 'block';
        existingWindow.style.animation = 'restore 0.3s ease-in-out forwards';
        existingWindow.style.zIndex = ++windowZIndex;
        return;
    }

    const windowId = `window-${appName}-${Date.now()}`;
    let content = '';
    let title = '';

    switch(appName) {
        case 'about':
            title = 'About';
            content = `<div class="profile-section" style="color: #cbd5e0; font-size: 0.9em; line-height: 1.6;"><h3 style="color: #ffffff; margin-bottom: 12px;">About This Project</h3><p style="margin-bottom: 12px;">SerenityOS is a passion project exploring modern web development with vanilla JavaScript, CSS, and HTML. Built as an experiment in creating a functional desktop environment entirely in the browser.</p><p style="margin-bottom: 16px;">This project demonstrates core web technologies: window management, event handling, persistent storage, and responsive design—all without frameworks or build steps.</p><div style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 6px;"><strong style="color: #ffffff;">Built With:</strong><div style="margin-top: 8px; font-size: 0.85em;"><strong>Frontend:</strong> HTML5 • CSS3 • Vanilla JavaScript (ES6+)</div><div style="margin-top: 6px; font-size: 0.85em;"><strong>APIs:</strong> Canvas • localStorage • iFrame Sandbox</div><div style="margin-top: 6px; font-size: 0.85em;"><strong>Deployment:</strong> Vercel • Git</div></div><div style="margin-top: 10px; font-size: 0.8em; color: #94a3b8;">An open-source exploration of web capabilities.</div></div>`;
            break;
        case 'projects':
            title = 'Passion Projects';
            content = `<div style="color: #cbd5e0; font-size: 0.8em; line-height: 1.4;"><p style="margin: 0 0 12px 0; font-size: 0.75em; color: #94a3b8;">Exploring different ideas through code and design.</p><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Web Development</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Building interactive web experiences with vanilla JavaScript, focusing on performance and user experience.</p><span class="tag" style="font-size: 0.7em;">JavaScript</span> <span class="tag" style="font-size: 0.7em;">Frontend</span></div><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Design Experiments</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Exploring minimalist UI/UX principles and creating polished, responsive interfaces.</p><span class="tag" style="font-size: 0.7em;">Design</span></div><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Learning Through Building</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Passion projects created for learning new concepts and technologies in a practical way.</p><span class="tag" style="font-size: 0.7em;">Learning</span></div><div><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Open Source</h4><p style="margin: 0; font-size: 0.75em;">Sharing code and ideas publicly to contribute to the developer community.</p><span class="tag" style="font-size: 0.7em;">Community</span></div></div>`;
            break;
        case 'portfolio':
            title = 'What I Build';
            content = `<div style="color: #cbd5e0; font-size: 0.8em; line-height: 1.5;"><h3 style="color: #ffffff; margin-top: 0; margin-bottom: 10px; font-size: 1em;">Focus Areas</h3><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Web Development</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Creating responsive, performant web applications with clean code and modern practices.</p></div><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">User Experience</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Designing interfaces that are intuitive, accessible, and visually polished.</p></div><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Problem Solving</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Building tools and solutions that address real challenges through code.</p></div><div style="margin-bottom: 10px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Learning & Exploration</h4><p style="margin: 0 0 4px 0; font-size: 0.75em;">Continuously exploring new technologies and techniques to grow as a developer.</p></div><div style="border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 8px;"><h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.9em;">Tech Stack</h4><p style="margin: 0; font-size: 0.75em;">JavaScript • HTML/CSS • Python • SQL • API Design • Database Architecture • Responsive Design</p></div></div>`;
            break;
        case 'contact':
            title = 'Contact';
            content = `<div class="contact-form"><div><input type="email" class="contact-email" placeholder="Your email" required style="width: 100%; padding: 8px; margin-bottom: 8px;"><textarea class="contact-message" placeholder="Your message" style="width: 100%; padding: 8px; margin-bottom: 8px; height: 80px;"></textarea><button class="contact-send" style="background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Send Message</button></div><div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1);"><p style="margin: 6px 0; font-size: 0.9em; color: #94a3b8;">Messages are saved locally in your browser.</p><p style="margin: 6px 0; font-size: 0.9em; color: #94a3b8;">This is a demo app for the SerenityOS interface.</p></div></div>`;
            break;
        case 'notes':
            title = 'Notes';
            content = `<div style="display: flex; flex-direction: column; gap: 12px; height: 100%; overflow: hidden;"><div style="display: flex; gap: 8px;"><input type="text" class="note-title" placeholder="Note title..." style="flex: 1; padding: 8px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; color: #ffffff;"><button class="note-save" style="padding: 8px 16px; background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; border-radius: 6px; cursor: pointer;">Save</button></div><textarea class="note-content" placeholder="Write your note..." style="flex: 1; padding: 8px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; color: #cbd5e0; font-family: monospace; resize: none;"></textarea><div class="notes-list" style="color: #718096; text-align: center; padding: 20px; overflow-y: auto; flex: 1; border-top: 1px solid rgba(255, 255, 255, 0.1);">No notes yet</div></div>`;
            break;
        case 'todo':
            title = 'To-Do';
            content = `<div style="display: flex; flex-direction: column; gap: 12px;"><div style="display: flex; gap: 8px;"><input type="text" class="todo-input" placeholder="Add task..." style="flex: 1; padding: 8px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; color: #cbd5e0;"><button class="todo-add" style="padding: 8px 16px; background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; border-radius: 6px; cursor: pointer;">Add</button></div><div class="todo-list" style="color: #718096; text-align: center; padding: 20px;">No tasks yet</div></div>`;
            break;
        case 'calculator':
            title = 'Calculator';
            content = `<div style="display: flex; flex-direction: column; gap: 12px; min-width: 0;"><div class="calc-display" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; padding: 12px; text-align: right; font-size: 1.5em; color: #ffffff; font-family: monospace; word-break: break-all;">0</div><div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;"><button class="calc-btn" data-val="7" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">7</button><button class="calc-btn" data-val="8" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">8</button><button class="calc-btn" data-val="9" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">9</button><button class="calc-btn" data-val="/" style="padding: 6px; font-size: 0.9em; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">÷</button><button class="calc-btn" data-val="4" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">4</button><button class="calc-btn" data-val="5" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">5</button><button class="calc-btn" data-val="6" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">6</button><button class="calc-btn" data-val="*" style="padding: 6px; font-size: 0.9em; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">×</button><button class="calc-btn" data-val="1" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">1</button><button class="calc-btn" data-val="2" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">2</button><button class="calc-btn" data-val="3" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">3</button><button class="calc-btn" data-val="-" style="padding: 6px; font-size: 0.9em; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">-</button><button class="calc-btn" data-val="0" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">0</button><button class="calc-btn" data-val="." style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">.</button><button class="calc-equal" style="padding: 6px; font-size: 0.9em; background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">=</button><button class="calc-btn" data-val="+" style="padding: 6px; font-size: 0.9em; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #ffffff; border-radius: 6px; cursor: pointer; min-width: 0;">+</button></div></div>`;
            break;
        case 'timer':
            title = 'Timer';
            content = `<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;"><div class="timer-display" style="font-size: 3em; color: #ffffff; font-family: monospace; font-weight: bold;">25:00</div><div style="display: flex; gap: 8px;"><button class="timer-start" style="padding: 10px 20px; background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; border-radius: 6px; cursor: pointer;">Start</button><button class="timer-pause" style="padding: 10px 20px; background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; border-radius: 6px; cursor: pointer;">Pause</button><button class="timer-reset" style="padding: 10px 20px; background: rgba(248, 113, 113, 0.1); border: 1px solid #f87171; color: #f87171; border-radius: 6px; cursor: pointer;">Reset</button></div></div>`;
            break;
        case 'messages':
            title = 'Messages';
            content = `<div style="color: #cbd5e0; font-size: 0.9em; display: flex; flex-direction: column; height: 100%;"><button id="refresh-messages" style="background: rgba(255, 255, 255, 0.2); border: 1px solid #ffffff; color: #ffffff; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-bottom: 12px; align-self: flex-start;">Refresh</button><div id="messages-list" style="flex: 1; overflow-y: auto;"><p style="color: #999999; text-align: center; padding: 20px;">No messages yet</p></div></div>`;
            break;
        case 'browser':
            title = 'Browser';
            content = `<div style="display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 360px;"><div style="display: flex; gap: 8px;"><input type="text" class="browser-url" value="https://en.wikipedia.org/wiki/Web_browser" placeholder="Enter a URL, e.g. example.com" style="flex: 1; padding: 8px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #ffffff;"><button class="browser-go" style="padding: 8px 16px; background: #e94560; border: 1px solid #e94560; color: #ffffff; border-radius: 8px; cursor: pointer;">Go</button></div><div class="browser-status" style="font-size: 0.72em; color: #94a3b8;">Some sites block embedding and may not load.</div><iframe class="browser-frame" src="https://en.wikipedia.org/wiki/Web_browser" style="flex: 1; width: 100%; min-height: 300px; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; background: #ffffff;" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe></div>`;
            break;
        case 'paint':
            title = 'Paint';
            content = `<div style="display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 340px;"><div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;"><input type="color" class="paint-color" value="#e94560" style="width: 40px; height: 32px; border: none; background: none; cursor: pointer; padding: 0;"><label style="font-size: 0.8em; color: #cbd5e0; display: flex; align-items: center; gap: 6px;">Size <input type="range" class="paint-size" min="1" max="40" value="6"></label><button class="paint-clear" style="padding: 6px 14px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 8px; cursor: pointer;">Clear</button><button class="paint-save" style="padding: 6px 14px; background: #e94560; border: 1px solid #e94560; color: #ffffff; border-radius: 8px; cursor: pointer;">Save PNG</button></div><canvas class="paint-canvas" width="520" height="360" style="width: 100%; flex: 1; min-height: 280px; background: #ffffff; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; cursor: crosshair; touch-action: none;"></canvas></div>`;
            break;
    }

    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = windowId;
    windowEl.style.zIndex = ++windowZIndex;
    // Stagger windows in a visible grid pattern
    const col = windowCount % 2;
    const row = Math.floor(windowCount / 2);
    const offsetX = 50 + col * 320 + (Math.random() * 10);
    const offsetY = 40 + row * 160 + (Math.random() * 10);
    windowEl.style.left = Math.min(offsetX, window.innerWidth - 550) + 'px';
    windowEl.style.top = Math.min(offsetY, window.innerHeight - 200) + 'px';

    windowEl.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title}</span>
            <div style="display: flex; gap: 8px;">
                <button class="window-maximize" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer; padding: 4px 8px;">MAX</button>
                <button class="window-close" style="background: none; border: none; color: #ffffff; font-size: 28px; cursor: pointer;">×</button>
            </div>
        </div>
        <div class="window-content">${content}</div>
        <div class="window-resize" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: se-resize;"></div>
    `;

    desktopContent.appendChild(windowEl);
    openWindows[appName] = windowEl;

    const closeBtn = windowEl.querySelector('.window-close');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        windowEl.style.animation = 'minimize 0.3s ease-in-out forwards';
        setTimeout(() => {
            windowEl.style.display = 'none';
        }, 300);
    }, true);

    const maximizeBtn = windowEl.querySelector('.window-maximize');
    let isMaximized = false;
    let originalState = {};

    maximizeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!isMaximized) {
            originalState = {
                left: windowEl.style.left,
                top: windowEl.style.top,
                width: windowEl.style.width,
                height: windowEl.style.height
            };
            windowEl.style.left = '10px';
            windowEl.style.top = '60px';
            windowEl.style.width = 'calc(100vw - 20px)';
            windowEl.style.height = 'calc(100vh - 70px)';
            windowEl.style.maxHeight = 'none';
            isMaximized = true;
            maximizeBtn.textContent = 'MIN';
            draggedWindow = null;
        } else {
            windowEl.style.left = originalState.left;
            windowEl.style.top = originalState.top;
            windowEl.style.width = originalState.width;
            windowEl.style.height = originalState.height;
            windowEl.style.maxHeight = '85vh';
            isMaximized = false;
            maximizeBtn.textContent = 'MAX';
            draggedWindow = null;
        }
    }, true);

    const resizeHandle = windowEl.querySelector('.window-resize');
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = windowEl.offsetWidth;
        startHeight = windowEl.offsetHeight;
        e.stopPropagation();
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing && windowEl.style.display !== 'none') {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            if (newWidth > 300) windowEl.style.width = newWidth + 'px';
            if (newHeight > 200) windowEl.style.height = newHeight + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
    });

    windowEl.onmousedown = function(e) {
        // Only update z-index on header or non-interactive areas
        if (!e.target.closest('button') && !e.target.closest('input') && !e.target.closest('textarea')) {
            windowEl.style.zIndex = ++windowZIndex;
        }
    };

    setupAppFunctionality(windowEl, appName);
    windowCount++;
}

function handleWindowDrag(e) {
    // Don't drag if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;
    if (e.target.closest('.window-close') || e.target.closest('.window-maximize')) return;

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

function setupAppFunctionality(windowEl, appName) {
    const content = windowEl.querySelector('.window-content');

    if (appName === 'contact') {
        setTimeout(() => {
            const sendBtn = content.querySelector('.contact-send');
            const emailInput = content.querySelector('.contact-email');
            const messageInput = content.querySelector('.contact-message');

            if (!sendBtn) {
                console.error('Contact send button not found');
                return;
            }

            sendBtn.onclick = function(e) {
                e.stopPropagation();
                e.preventDefault();
                const email = emailInput.value.trim();
                const message = messageInput.value.trim();

                if (!email) {
                    emailInput.style.borderColor = '#f87171';
                    return;
                }
                if (!message) {
                    messageInput.style.borderColor = '#f87171';
                    return;
                }

                // Store message in localStorage
                const messages = JSON.parse(localStorage.getItem('serenityMessages') || '[]');
                messages.push({
                    id: Date.now(),
                    email: email,
                    message: message,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem('serenityMessages', JSON.stringify(messages));
                console.log('Message saved:', messages);

                const originalText = 'Send Message';
                sendBtn.textContent = '✓ Sent!';
                sendBtn.style.background = 'rgba(34, 197, 94, 0.2)';
                sendBtn.style.borderColor = '#22c55e';
                sendBtn.style.color = '#22c55e';

                emailInput.value = '';
                messageInput.value = '';
                emailInput.style.borderColor = '';
                messageInput.style.borderColor = '';

                setTimeout(() => {
                    sendBtn.textContent = originalText;
                    sendBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                    sendBtn.style.borderColor = '#ffffff';
                    sendBtn.style.color = '#ffffff';
                }, 2000);
            };
        }, 0);
    } else if (appName === 'browser') {
        const urlInput = content.querySelector('.browser-url');
        const goBtn = content.querySelector('.browser-go');
        const frame = content.querySelector('.browser-frame');
        const status = content.querySelector('.browser-status');

        function navigate() {
            let url = urlInput.value.trim();
            if (!url) return;
            if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
            urlInput.value = url;
            status.textContent = 'Loading ' + url + ' …';
            frame.src = url;
        }

        goBtn.onclick = function(e) { e.stopPropagation(); navigate(); };
        urlInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); navigate(); }
        });
        frame.addEventListener('load', function() {
            status.textContent = 'Loaded. Some sites block embedding and may stay blank.';
        });
    } else if (appName === 'paint') {
        const canvas = content.querySelector('.paint-canvas');
        const ctx = canvas.getContext('2d');
        const colorInput = content.querySelector('.paint-color');
        const sizeInput = content.querySelector('.paint-size');
        const clearBtn = content.querySelector('.paint-clear');
        const saveBtn = content.querySelector('.paint-save');

        function fillWhite() {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        fillWhite();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let drawing = false, lastX = 0, lastY = 0;

        function pos(e) {
            const r = canvas.getBoundingClientRect();
            const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
            const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
            return { x: cx * (canvas.width / r.width), y: cy * (canvas.height / r.height) };
        }
        function start(e) { drawing = true; const p = pos(e); lastX = p.x; lastY = p.y; e.stopPropagation(); }
        function move(e) {
            if (!drawing) return;
            const p = pos(e);
            ctx.strokeStyle = colorInput.value;
            ctx.lineWidth = parseInt(sizeInput.value, 10);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            lastX = p.x; lastY = p.y;
            e.preventDefault();
        }
        function end() { drawing = false; }

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mousemove', move);
        window.addEventListener('mouseup', end);
        canvas.addEventListener('touchstart', start, { passive: false });
        canvas.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('touchend', end);

        clearBtn.onclick = function(e) { e.stopPropagation(); fillWhite(); };
        saveBtn.onclick = function(e) {
            e.stopPropagation();
            const a = document.createElement('a');
            a.download = 'serenity-paint.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        };
    } else if (appName === 'notes') {
        const saveBtn = content.querySelector('.note-save');
        const titleInput = content.querySelector('.note-title');
        const contentInput = content.querySelector('.note-content');
        const notesList = content.querySelector('.notes-list');

        function renderNotes() {
            const notes = JSON.parse(localStorage.getItem('serenityNotes') || '[]');
            if (notes.length === 0) {
                notesList.innerHTML = '<div style="color: #718096; text-align: center; padding: 20px;">No notes yet</div>';
            } else {
                notesList.innerHTML = notes.map(note => `
                    <div style="padding: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; margin-bottom: 8px; text-align: left;">
                        <div style="color: #ffffff; font-weight: bold; margin-bottom: 4px;">${note.title}</div>
                        <div style="color: #cbd5e0; margin-bottom: 8px; white-space: pre-wrap; word-break: break-word;">${note.content}</div>
                        <div style="color: #718096; font-size: 0.85em; margin-bottom: 8px;">${note.date}</div>
                        <button class="note-delete" data-id="${note.id}" style="background: rgba(248, 113, 113, 0.2); border: 1px solid #f87171; color: #f87171; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 0.8em;">Delete</button>
                    </div>
                `).join('');

                notesList.querySelectorAll('.note-delete').forEach(btn => {
                    btn.onclick = function(e) {
                        e.stopPropagation();
                        const id = parseInt(this.dataset.id);
                        const notes = JSON.parse(localStorage.getItem('serenityNotes') || '[]');
                        const filtered = notes.filter(n => n.id !== id);
                        localStorage.setItem('serenityNotes', JSON.stringify(filtered));
                        renderNotes();
                    };
                });
            }
        }

        saveBtn.onclick = function() {
            const title = titleInput.value.trim();
            const noteContent = contentInput.value.trim();

            if (!title && !noteContent) {
                contentInput.style.borderColor = '#f87171';
                return;
            }

            const notes = JSON.parse(localStorage.getItem('serenityNotes') || '[]');
            notes.push({
                id: Date.now(),
                title: title || 'Untitled',
                content: noteContent,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('serenityNotes', JSON.stringify(notes));

            // Show success feedback
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '✓ Saved!';
            saveBtn.style.background = 'rgba(34, 197, 94, 0.2)';
            saveBtn.style.borderColor = '#22c55e';
            saveBtn.style.color = '#22c55e';

            titleInput.value = '';
            contentInput.value = '';
            contentInput.style.borderColor = '';

            renderNotes();

            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                saveBtn.style.borderColor = '#ffffff';
                saveBtn.style.color = '#ffffff';
            }, 2000);
        };

        renderNotes();
    } else if (appName === 'todo') {
        const addBtn = content.querySelector('.todo-add');
        const input = content.querySelector('.todo-input');
        const listDiv = content.querySelector('.todo-list');

        function renderTodos() {
            const todos = JSON.parse(localStorage.getItem('serenityTodos') || '[]');
            if (todos.length === 0) {
                listDiv.innerHTML = '<div style="color: #718096; text-align: center; padding: 20px;">No tasks yet</div>';
            } else {
                listDiv.innerHTML = todos.map(todo => `
                    <div style="padding: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #cbd5e0;">${todo.text}</span>
                        <button class="todo-delete" data-id="${todo.id}" style="background: rgba(248, 113, 113, 0.2); border: 1px solid #f87171; color: #f87171; padding: 2px 8px; border-radius: 3px; cursor: pointer;">×</button>
                    </div>
                `).join('');

                listDiv.querySelectorAll('.todo-delete').forEach(btn => {
                    btn.onclick = function() {
                        const todos = JSON.parse(localStorage.getItem('serenityTodos') || '[]');
                        const id = parseInt(this.dataset.id);
                        const filtered = todos.filter(t => t.id !== id);
                        localStorage.setItem('serenityTodos', JSON.stringify(filtered));
                        renderTodos();
                    };
                });
            }
        }

        addBtn.onclick = function() {
            const text = input.value.trim();
            if (text) {
                const todos = JSON.parse(localStorage.getItem('serenityTodos') || '[]');
                todos.push({
                    id: Date.now(),
                    text: text
                });
                localStorage.setItem('serenityTodos', JSON.stringify(todos));
                input.value = '';
                renderTodos();
            }
        };

        input.onkeypress = function(e) {
            if (e.key === 'Enter') {
                addBtn.click();
            }
        };

        renderTodos();
    } else if (appName === 'calculator') {
        setTimeout(() => {
            const display = windowEl.querySelector('.calc-display');
            const buttons = windowEl.querySelectorAll('.calc-btn');
            const equalBtn = windowEl.querySelector('.calc-equal');
            let expression = '';

            buttons.forEach(btn => {
                btn.onclick = function(e) {
                    e.stopPropagation();
                    expression += this.dataset.val;
                    display.textContent = expression || '0';
                };
            });

            equalBtn.onclick = function(e) {
                e.stopPropagation();
                try {
                    const result = Function('"use strict"; return (' + expression + ')')();
                    display.textContent = result;
                    expression = result.toString();
                } catch(er) {
                    display.textContent = 'Error';
                    expression = '';
                }
            };
        }, 0);
    } else if (appName === 'timer') {
        setTimeout(() => {
            const display = windowEl.querySelector('.timer-display');
            const startBtn = windowEl.querySelector('.timer-start');
            const pauseBtn = windowEl.querySelector('.timer-pause');
            const resetBtn = windowEl.querySelector('.timer-reset');

            let timeLeft = 25 * 60;
            let timerInterval = null;
            let isRunning = false;

            function updateDisplay() {
                const mins = Math.floor(timeLeft / 60);
                const secs = timeLeft % 60;
                display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }

            startBtn.onclick = function(e) {
                e.stopPropagation();
                if (!isRunning && timeLeft > 0) {
                    isRunning = true;
                    timerInterval = setInterval(() => {
                        timeLeft--;
                        updateDisplay();
                        if (timeLeft === 0) {
                            clearInterval(timerInterval);
                            isRunning = false;
                            alert('Timer finished!');
                        }
                    }, 1000);
                }
            };

            pauseBtn.onclick = function(e) {
                e.stopPropagation();
                if (isRunning) {
                    isRunning = false;
                    clearInterval(timerInterval);
                }
            };

            resetBtn.onclick = function(e) {
                e.stopPropagation();
                isRunning = false;
                clearInterval(timerInterval);
                timeLeft = 25 * 60;
                updateDisplay();
            };

            updateDisplay();
        }, 0);
    } else if (appName === 'messages') {
        function renderMessages() {
            const messagesList = windowEl.querySelector('#messages-list');
            const messages = JSON.parse(localStorage.getItem('serenityMessages') || '[]');

            if (messages.length === 0) {
                messagesList.innerHTML = '<p style="color: #999999; text-align: center; padding: 20px;">No messages yet</p>';
                return;
            }

            messagesList.innerHTML = messages.map(msg => `
                <div style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; margin-bottom: 12px; border-radius: 6px;">
                    <div style="color: #ffffff; font-weight: bold; margin-bottom: 4px;">${msg.email}</div>
                    <div style="margin-bottom: 8px; word-wrap: break-word;">${msg.message}</div>
                    <div style="color: #999999; font-size: 0.85em;">${msg.date}</div>
                    <button class="msg-delete" data-id="${msg.id}" style="background: rgba(248, 113, 113, 0.2); border: 1px solid #f87171; color: #f87171; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.85em; margin-top: 8px;">Delete</button>
                </div>
            `).join('');

            windowEl.querySelectorAll('.msg-delete').forEach(btn => {
                btn.onclick = function(e) {
                    e.stopPropagation();
                    const id = parseInt(this.dataset.id);
                    const messages = JSON.parse(localStorage.getItem('serenityMessages') || '[]');
                    const filtered = messages.filter(m => m.id !== id);
                    localStorage.setItem('serenityMessages', JSON.stringify(filtered));
                    renderMessages();
                };
            });
        }

        setTimeout(() => {
            const refreshBtn = windowEl.querySelector('#refresh-messages');
            refreshBtn.onclick = renderMessages;
            renderMessages();
        }, 0);
    }
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

console.log('SerenityUX ready!');

/* =====================================================================
   Portfolio-style landing motion: word-by-word heading reveal (mask +
   staggered slide-up), fade-up for copy, and magnetic buttons. Vanilla
   port of the sripad-portfolio ParallaxReveal / ParallaxFade / magnetic.
   ===================================================================== */
(function () {
  function splitWords(el) {
    if (el.dataset.rw) return;
    el.dataset.rw = '1';
    var parts = el.innerHTML.split(/(<br\s*\/?>)/i);
    el.innerHTML = parts.map(function (p) {
      if (/<br/i.test(p)) return p;
      return p.split(/\s+/).filter(Boolean).map(function (w) {
        return '<span class="rw"><span class="rw-i">' + w + '</span></span>';
      }).join(' ');
    }).join(' ');
    var inners = el.querySelectorAll('.rw-i');
    inners.forEach(function (s, i) { s.style.transitionDelay = (i * 0.035) + 's'; });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.25 });

  function playNow(el) {
    // paint the hidden state first, then transition in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-in'); });
    });
  }

  function revealHeadings(sel, now) {
    document.querySelectorAll(sel).forEach(function (el) {
      splitWords(el);
      if (now) playNow(el); else io.observe(el);
    });
  }
  function fadeUp(sel, now) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('fade-init');
      if (now) playNow(el); else io.observe(el);
    });
  }
  function magnetic(sel) {
    document.querySelectorAll(sel).forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) * 0.35;
        var y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  function initLandingMotion() {
    // hero plays on load
    revealHeadings('.hero-title', true);
    fadeUp('.hero-subtitle, .hero-description, .hero-form, .hero-stats', true);
    // headings + copy reveal on scroll (landing + About/Docs pages)
    revealHeadings('.features-section h2, .apps-section h2, .tech-section h2, .cta-section h2, .about-section h2, .docs-section h2, .page-content h1', false);
    fadeUp('.section-subtitle, .cta-section p', false);
    // magnetic buttons
    magnetic('.btn-header, .cta-button, .form-button');
  }

  if (document.readyState !== 'loading') initLandingMotion();
  else document.addEventListener('DOMContentLoaded', initLandingMotion);
})();
