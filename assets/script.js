const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Theme switcher: dark is the first-visit default, while a user's choice is remembered.
const navWrap = document.querySelector('.nav-wrap');
let themeToggle = document.querySelector('.theme-toggle');

if (navWrap && !themeToggle) {
  themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.type = 'button';
  if (menuButton) {
    navWrap.insertBefore(themeToggle, menuButton);
  } else {
    navWrap.appendChild(themeToggle);
  }
}

const themeIcons = {
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.5 6.5 0 1 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  light: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>'
};

function applyTheme(theme, save = false) {
  const selected = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = selected;

  if (save) {
    localStorage.setItem('itc508-theme', selected);
  }

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', selected === 'dark' ? '#090d18' : '#f5f7fb');
  }

  if (themeToggle) {
    const nextTheme = selected === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = themeIcons[nextTheme];
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('title', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('aria-pressed', String(selected === 'light'));
  }
}

const savedTheme = localStorage.getItem('itc508-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  });
}
