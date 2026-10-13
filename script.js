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
  const emailText = document.getElementById('emailText')?.innerText || 'jermain3obed@gmail.com';

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
  whoami      Display summary profile
  about       Background and approach to work
  projects    List key projects and builds
  skills      List technical skills and verified certifications
  education   View academic background and schools
  hobbies     Personal interests
  contact     Get direct email and portfolio links
  clear       Clear terminal output
  exit        Close the terminal`,

    whoami: `Jermaine Otto Oyieri
Location:    Nairobi, Kenya
Email:       jermain3obed@gmail.com
Portfolio:   https://aawbed.github.io
GitHub:      https://github.com/aawbed
Credly:      https://www.credly.com/users/jermaine-obed`,

    about: `I build practical tools and applications that solve real-world tasks.
Recent work includes an order & inventory system for Kenya Airways water sales,
an environmental monitoring app (Earthpulse), an IELTS prep platform (in progress),
and IoT farm monitoring with ESP32 microcontrollers.`,

    projects: `Key Projects:
1. Kenya Airways (KQ) Sales & Order Intelligence — Django REST, MySQL, SARIMAX forecasting, PDF invoices
2. IELTS AI Prep & Tutor Platform — practice modules with model-driven feedback (in progress)
3. Earthpulse — Live environmental monitoring web app on Vercel (earth-pulse-delta.vercel.app)
4. Shamba Sense — ESP32 real-time farm sensor dashboard
5. Siwaka Street Eats — Campus food ordering marketplace
6. Blockchain Ledger Explorer — Vite + Tailwind CSS + Drizzle ORM`,

    skills: `Skills & Certifications:
- IT & Systems: PC hardware repair, Windows/Linux OS, LAN/WLAN, TCP/IP, Cisco Packet Tracer, troubleshooting
- Software:     Python (Django), JavaScript, HTML/CSS, Node.js, Express, REST APIs
- Databases:    MySQL, PostgreSQL, SQL queries
- Verified:     Cisco IT Essentials | AWS Cloud Foundations | AWS Microservices & CI/CD
  Verify on Credly: https://www.credly.com/users/jermaine-obed`,

    education: `Education:
- Strathmore University, Nairobi: BSc. Informatics & Computer Science (Expected Grad: Aug 2027)
- Pioneer Boys School, Maragua (2019 - 2022): Kenya Certificate of Secondary Education (KCSE)`,

    hobbies: `Hobbies & Interests:
- Writing poetry
- Hiking and exploring the outdoors
- Playing football`,

    contact: `Direct Contact:
Email:     jermain3obed@gmail.com
Portfolio: https://aawbed.github.io
GitHub:    https://github.com/aawbed
Credly:    https://www.credly.com/users/jermaine-obed`
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
