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
    router();
    window.addEventListener('hashchange', router);
    setupScrollAnimations();
});

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('scroll-animate')) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, observerOptions);

    // Only observe elements that should have scroll animations
    const elementsToObserve = document.querySelectorAll(
        '.features-section, .apps-section, .tech-section, .cta-section, .feature-card, .app-showcase-card, .tech-item'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
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
            content = `<div class="contact-form"><div><input type="email" class="contact-email" placeholder="Your email" required style="width: 100%; padding: 8px; margin-bottom: 8px;"><textarea class="contact-message" placeholder="Your message" style="width: 100%; padding: 8px; margin-bottom: 8px; height: 80px;"></textarea><button class="contact-send" style="background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Send Message</button></div><div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(167, 139, 250, 0.1);"><p style="margin: 6px 0; font-size: 0.9em;"><strong>Email:</strong> nadellasripad11@gmail.com</p><p style="margin: 6px 0; font-size: 0.9em;"><strong>GitHub:</strong> nadellasripad11</p></div></div>`;
            break;
        case 'notes':
            title = 'Notes';
            content = `<div style="display: flex; flex-direction: column; gap: 12px; height: 100%;"><input type="text" class="note-title" placeholder="Note title..." style="padding: 8px; background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #a78bfa;"><textarea class="note-content" placeholder="Write your note..." style="flex: 1; padding: 8px; background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #cbd5e0; font-family: monospace; resize: none;"></textarea><button class="note-save" style="padding: 8px 16px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Save Note</button></div>`;
            break;
        case 'todo':
            title = 'To-Do';
            content = `<div style="display: flex; flex-direction: column; gap: 12px;"><div style="display: flex; gap: 8px;"><input type="text" class="todo-input" placeholder="Add task..." style="flex: 1; padding: 8px; background: rgba(167, 139, 250, 0.08); border: 1px solid rgba(167, 139, 250, 0.1); border-radius: 6px; color: #cbd5e0;"><button class="todo-add" style="padding: 8px 16px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Add</button></div><div class="todo-list" style="color: #718096; text-align: center; padding: 20px;">No tasks yet</div></div>`;
            break;
        case 'calculator':
            title = 'Calculator';
            content = `<div style="display: flex; flex-direction: column; gap: 12px;"><div class="calc-display" style="background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); border-radius: 6px; padding: 16px; text-align: right; font-size: 2em; color: #a78bfa; font-family: monospace;">0</div><div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;"><button class="calc-btn" data-val="7" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">7</button><button class="calc-btn" data-val="8" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">8</button><button class="calc-btn" data-val="9" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">9</button><button class="calc-btn" data-val="/" style="padding: 10px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #a78bfa; border-radius: 6px; cursor: pointer;">÷</button><button class="calc-btn" data-val="4" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">4</button><button class="calc-btn" data-val="5" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">5</button><button class="calc-btn" data-val="6" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">6</button><button class="calc-btn" data-val="*" style="padding: 10px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #a78bfa; border-radius: 6px; cursor: pointer;">×</button><button class="calc-btn" data-val="1" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">1</button><button class="calc-btn" data-val="2" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">2</button><button class="calc-btn" data-val="3" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">3</button><button class="calc-btn" data-val="-" style="padding: 10px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #a78bfa; border-radius: 6px; cursor: pointer;">-</button><button class="calc-btn" data-val="0" style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">0</button><button class="calc-btn" data-val="." style="padding: 10px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.2); color: #a78bfa; border-radius: 6px; cursor: pointer;">.</button><button class="calc-equal" style="padding: 10px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">=</button><button class="calc-btn" data-val="+" style="padding: 10px; background: rgba(124, 58, 237, 0.2); border: 1px solid rgba(124, 58, 237, 0.4); color: #a78bfa; border-radius: 6px; cursor: pointer;">+</button></div></div>`;
            break;
        case 'timer':
            title = 'Timer';
            content = `<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;"><div class="timer-display" style="font-size: 3em; color: #a78bfa; font-family: monospace; font-weight: bold;">25:00</div><div style="display: flex; gap: 8px;"><button class="timer-start" style="padding: 10px 20px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Start</button><button class="timer-pause" style="padding: 10px 20px; background: rgba(167, 139, 250, 0.2); border: 1px solid #a78bfa; color: #a78bfa; border-radius: 6px; cursor: pointer;">Pause</button><button class="timer-reset" style="padding: 10px 20px; background: rgba(248, 113, 113, 0.1); border: 1px solid #f87171; color: #f87171; border-radius: 6px; cursor: pointer;">Reset</button></div></div>`;
            break;
    }

    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = windowId;
    windowEl.style.zIndex = ++windowZIndex;
    // Stagger windows to avoid overlap
    const offsetX = (windowCount % 3) * 300 + 50;
    const offsetY = 100 + (Math.floor(windowCount / 3) * 250);
    windowEl.style.left = (offsetX + Math.random() * 20) + 'px';
    windowEl.style.top = (offsetY + Math.random() * 20) + 'px';

    windowEl.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title}</span>
            <button class="window-close" style="background: none; border: none; color: #a78bfa; font-size: 28px; cursor: pointer;">×</button>
        </div>
        <div class="window-content">${content}</div>
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

    windowEl.onmousedown = function() {
        windowEl.style.zIndex = ++windowZIndex;
    };

    setupAppFunctionality(windowEl, appName);
    windowCount++;
}

function handleWindowDrag(e) {
    if (e.target.closest('.window-close')) return;

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
        const sendBtn = content.querySelector('.contact-send');
        const emailInput = content.querySelector('.contact-email');
        const messageInput = content.querySelector('.contact-message');

        sendBtn.onclick = function() {
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

            // Show success message
            const originalText = sendBtn.textContent;
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
                sendBtn.style.background = 'rgba(167, 139, 250, 0.2)';
                sendBtn.style.borderColor = '#a78bfa';
                sendBtn.style.color = '#a78bfa';
            }, 2000);
        };
    } else if (appName === 'notes') {
        const saveBtn = content.querySelector('.note-save');
        const titleInput = content.querySelector('.note-title');
        const contentInput = content.querySelector('.note-content');

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

            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = 'rgba(167, 139, 250, 0.2)';
                saveBtn.style.borderColor = '#a78bfa';
                saveBtn.style.color = '#a78bfa';
            }, 2000);
        };
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
                    <div style="padding: 8px; background: rgba(167, 139, 250, 0.1); border-radius: 4px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
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
        const display = content.querySelector('.calc-display');
        const buttons = content.querySelectorAll('.calc-btn');
        const equalBtn = content.querySelector('.calc-equal');
        let expression = '';

        buttons.forEach(btn => {
            btn.onclick = function() {
                expression += this.dataset.val;
                display.textContent = expression || '0';
            };
        });

        equalBtn.onclick = function() {
            try {
                const result = Function('"use strict"; return (' + expression + ')')();
                display.textContent = result;
                expression = result.toString();
            } catch(e) {
                display.textContent = 'Error';
                expression = '';
            }
        };
    } else if (appName === 'timer') {
        const display = content.querySelector('.timer-display');
        const startBtn = content.querySelector('.timer-start');
        const pauseBtn = content.querySelector('.timer-pause');
        const resetBtn = content.querySelector('.timer-reset');

        let timeLeft = 25 * 60;
        let timerInterval = null;
        let isRunning = false;

        function updateDisplay() {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        startBtn.onclick = function() {
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

        pauseBtn.onclick = function() {
            if (isRunning) {
                isRunning = false;
                clearInterval(timerInterval);
            }
        };

        resetBtn.onclick = function() {
            isRunning = false;
            clearInterval(timerInterval);
            timeLeft = 25 * 60;
            updateDisplay();
        };
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
