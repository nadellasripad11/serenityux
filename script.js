let visitorName = '';
let windowZIndex = 1000;
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };
window.systemStart = Date.now();
let windowCount = 0;

// Wait for DOM to load
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
}

function enterOS() {
    const nameInput = document.getElementById('nameInput');
    const welcomeContainer = document.getElementById('welcomeContainer');
    const osDesktop = document.getElementById('osDesktop');
    const visitorDisplay = document.getElementById('visitorDisplay');

    if (!nameInput) return;

    visitorName = nameInput.value.trim() || 'Guest';

    // Update visitor name display
    if (visitorDisplay) {
        visitorDisplay.textContent = `Welcome, ${visitorName}`;
    }

    // Hide welcome, show OS
    if (welcomeContainer) {
        welcomeContainer.style.display = 'none';
    }
    if (osDesktop) {
        osDesktop.style.display = 'block';
    }

    // Setup app icons
    setupAppIcons();
    updateTime();
    setInterval(updateTime, 1000);
}

function setupAppIcons() {
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.onclick = function() {
            const appName = this.dataset.app;
            openWindow(appName);
        };
    });
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
            content = `<div class="profile-section"><h3>Hello, ${visitorName}!</h3><p>A developer and creator passionate about building innovative web experiences.</p><div class="skills"><strong>Skills:</strong> JavaScript, HTML/CSS, Web Design, Problem Solving</div></div>`;
            break;
        case 'projects':
            title = 'Projects';
            content = `<div class="projects-grid"><div class="project-card"><h4>SerenityUX</h4><p>A personal web-based operating system with draggable windows and real-time clock.</p><span class="tag">JavaScript</span> <span class="tag">HTML/CSS</span></div><div class="project-card"><h4>Socle</h4><p>Lead generation platform for luxury hospitality.</p><span class="tag">Web App</span></div><div class="project-card"><h4>Penny Scout</h4><p>Stock market analysis and reporting tool.</p><span class="tag">Data</span> <span class="tag">Analytics</span></div></div>`;
            break;
        case 'portfolio':
            title = 'Portfolio';
            content = `<div style="color: #cbd5e0;"><h3 style="color: #a78bfa; margin-top: 0;">My Work</h3><p><strong>SerenityUX (2025)</strong> - Web-based operating system</p><p><strong>Socle (2024)</strong> - Luxury hospitality lead gen</p><p><strong>Penny Scout (2024)</strong> - Stock market analysis</p></div>`;
            break;
        case 'contact':
            title = 'Contact';
            content = `<div class="contact-form"><form onsubmit="return false;"><input type="email" placeholder="Your email" required style="width: 100%; padding: 8px; margin-bottom: 8px;"><textarea placeholder="Your message" style="width: 100%; padding: 8px; margin-bottom: 8px; height: 80px;"></textarea><button type="submit" style="background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Send Message</button></form><div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(167, 139, 250, 0.1);"><p style="margin: 6px 0; font-size: 0.9em;"><strong>Email:</strong> nadellasripad11@gmail.com</p><p style="margin: 6px 0; font-size: 0.9em;"><strong>GitHub:</strong> nadellasripad11</p></div></div>`;
            break;
        case 'notes':
            title = 'Notes';
            content = `<div style="display: flex; flex-direction: column; gap: 12px; height: 100%;"><input type="text" placeholder="Note title..." style="padding: 8px; background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #a78bfa;"><textarea placeholder="Write your note..." style="flex: 1; padding: 8px; background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #cbd5e0; font-family: monospace; resize: none;"></textarea></div>`;
            break;
        case 'todo':
            title = 'To-Do';
            content = `<div style="display: flex; flex-direction: column; gap: 12px;"><div style="display: flex; gap: 8px;"><input type="text" placeholder="Add task..." style="flex: 1; padding: 8px; background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #cbd5e0;"><button style="padding: 8px 16px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Add</button></div><div style="color: #718096; text-align: center; padding: 20px;">No tasks yet</div></div>`;
            break;
        case 'calculator':
            title = 'Calculator';
            content = `<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); border-radius: 6px; padding: 16px; text-align: right; font-size: 2em; color: #a78bfa; font-family: monospace;">0</div><div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;"><button style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">7</button><button style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">8</button><button style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">9</button><button style="padding: 10px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #a78bfa; border-radius: 6px; cursor: pointer;">÷</button></div></div>`;
            break;
        case 'timer':
            title = 'Timer';
            content = `<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;"><div style="font-size: 3em; color: #a78bfa; font-family: monospace; font-weight: bold;">25:00</div><div style="display: flex; gap: 8px;"><button style="padding: 10px 20px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Start</button><button style="padding: 10px 20px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Pause</button><button style="padding: 10px 20px; background: rgba(248, 113, 113, 0.1); border: 1px solid #f87171; color: #f87171; border-radius: 6px; cursor: pointer;">Reset</button></div></div>`;
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
            <button class="window-close" style="background: none; border: none; color: #a78bfa; font-size: 28px; cursor: pointer;">×</button>
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

console.log('SerenityUX ready!');
