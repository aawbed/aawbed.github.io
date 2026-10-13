// ==========================================================================
// Jermaine Otto Oyieri — Interactive Portfolio Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Project Filter Tabs ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Copy Email Toast ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const emailText = document.getElementById('emailText')?.innerText || 'jermaineobed.oyieri@strathmore.edu';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        showToast('Email copied to clipboard!');
      } catch (err) {
        showToast('Copied: ' + emailText);
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Interactive Terminal Shell Modal ---
  const terminalModal = document.getElementById('terminalModal');
  const terminalToggleBtn = document.getElementById('terminalToggleBtn');
  const heroTerminalBtn = document.getElementById('heroTerminalBtn');
  const closeTerminalBtn = document.getElementById('closeTerminalBtn');
  const closeTerminalBtnText = document.getElementById('closeTerminalBtnText');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalInput = document.getElementById('terminalInput');
  const dialogTermBody = document.getElementById('dialogTermBody');
  const cliInputRow = document.getElementById('cliInputRow');

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    terminalModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      terminalInput?.focus();
    }, 100);
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    terminalModal.setAttribute('aria-hidden', 'true');
  }

  terminalToggleBtn?.addEventListener('click', openTerminal);
  heroTerminalBtn?.addEventListener('click', openTerminal);
  closeTerminalBtn?.addEventListener('click', closeTerminal);
  closeTerminalBtnText?.addEventListener('click', closeTerminal);
  terminalOverlay?.addEventListener('click', closeTerminal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalModal?.classList.contains('active')) {
      closeTerminal();
    }
  });

  // --- Command Interpreter ---
  const commands = {
    help: `Available commands:
  help        Show this list of available commands
  whoami      Display current developer profile summary
  about       Detailed overview of engineering background
  projects    List key production systems and builds
  skills      Display technical stack and core competencies
  experience  View professional background and career log
  contact     Get direct email and repository links
  hire        Information on availability for roles
  clear       Clear terminal output buffer
  exit        Close the CLI modal`,

    whoami: `Jermaine Otto Oyieri
Role:        Software Engineer / Full-Stack Developer
Location:    Nairobi, Kenya
Specialties: Web Systems · Applied ML / Time-Series · Distributed Arch
GitHub:      github.com/aawbed`,

    about: `I build end-to-end software systems that tackle real operational problems.
My background includes engineering ML forecasting engines (SARIMAX) for Kenya Airways
logistics, building serverless environmental platforms (Earthpulse), and designing
IoT telemetry dashboards with edge microcontrollers (ESP32).`,

    projects: `Featured Systems & Builds:
1. [KQ Sales & Order Intelligence] - Django REST + SARIMAX ML + MySQL + ReportLab PDF
   github.com/aawbed/kq-sales-order-intelligence
2. [Earthpulse] - Serverless climate telemetry app on Vercel
   earth-pulse-delta.vercel.app
3. [Interactive Terminal Dev Shell] - Retro-styled CLI portfolio on GitHub Pages
   is-project-2026.github.io/interactive-portfolio-166588/
4. [Siwaka Street Eats] - Multi-vendor food ordering campus marketplace
5. [Shamba Sense] - Real-time ESP32 precision agriculture sensor dashboard
6. [Blockchain Ledger Explorer] - Vite + Tailwind CSS + Drizzle ORM`,

    skills: `Technical Arsenal:
Languages:     Python, JavaScript (ES6+), TypeScript, SQL, Java
Frameworks:    Django REST, React, Node.js, Express, Bootstrap 5, Tailwind CSS
ML & Data:     scikit-learn, SARIMAX Time-Series, Isolation Forest, K-Means RFM
Databases:     MySQL, PostgreSQL, Drizzle ORM
Infrastructure:Git & GitHub Actions, Vercel, RESTful APIs, ESP32 IoT`,

    experience: `Track Record:
- Software Engineer (2025 - Present): Independent & Enterprise builds (KQ Sales, Earthpulse)
- Chief Data Officer @ COMMITed Ltd. (2025 - 2026): Data flow architect & front-end lead
- BSc. Informatics & Computer Science, Strathmore University`,

    contact: `Direct Contact:
Email:   jermaineobed.oyieri@strathmore.edu
GitHub:  https://github.com/aawbed
Status:  Open to Software Engineer & Full-Stack roles`,

    hire: `I am currently available for:
- Full-Time Software Engineer / Full-Stack Developer roles
- Backend / Python & Django Engineering positions
- Applied Machine Learning & Data Systems roles
Send an email to: jermaineobed.oyieri@strathmore.edu`
  };

  const commandHistory = [];
  let historyIndex = -1;

  function printLine(html, cls = '') {
    if (!dialogTermBody || !cliInputRow) return;
    const div = document.createElement('div');
    div.className = 'line out' + (cls ? ' ' + cls : '');
    div.innerHTML = html;
    dialogTermBody.insertBefore(div, cliInputRow);
    dialogTermBody.scrollTop = dialogTermBody.scrollHeight;
  }

  function executeCommand(raw) {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();

    printLine(`<span class="cli-prompt-user">otto</span><span class="cli-prompt-at">@</span><span class="cli-prompt-path">portfolio</span><span class="cli-prompt-sym">:$ </span>${trimmed}`);

    if (!cmd) return;

    if (cmd === 'clear') {
      dialogTermBody.querySelectorAll('.line').forEach(l => l.remove());
      return;
    }

    if (cmd === 'exit' || cmd === 'quit') {
      closeTerminal();
      return;
    }

    if (commands[cmd]) {
      printLine(commands[cmd].replace(/\n/g, '<br>'));
    } else {
      printLine(`command not found: "${raw}". Type <span class="highlight-cmd">help</span> for valid commands.`, 'amber');
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        if (val.trim()) {
          commandHistory.push(val);
          historyIndex = commandHistory.length;
        }
        executeCommand(val);
        terminalInput.value = '';
      } else if (e.key === 'ArrowUp') {
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = '';
        }
        e.preventDefault();
      }
    });
  }

});
