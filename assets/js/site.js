(() => {
  const DEFAULT_THEME = 'dark';
  const html = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const btn = document.getElementById('themeBtn');

  function getStoredTheme() {
    return localStorage.getItem('theme') || DEFAULT_THEME;
  }

  function renderBrandIcons() {
    const icons = {
      github: 'M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.18 1.18A11.1 11.1 0 0 1 12 6.06c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.79 1.08.79 2.18v3.23c0 .31.2.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
      linkedin: 'M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM.5 8h4v15h-4V8Zm7.5 0h3.84v2.05h.06c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.81 2.67 4.81 6.14V23h-4v-7.86c0-1.88-.03-4.29-2.61-4.29-2.62 0-3.02 2.04-3.02 4.15V23h-4V8Z',
    };

    document.querySelectorAll('i[data-lucide="github"], i[data-lucide="linkedin"]').forEach((icon) => {
      const name = icon.getAttribute('data-lucide');
      const className = icon.getAttribute('class') || 'h-4 w-4';
      icon.outerHTML = `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="${className}" fill="currentColor"><path d="${icons[name]}"></path></svg>`;
    });
  }

  function renderLucide() {
    renderBrandIcons();
    if (window.lucide) lucide.createIcons();
  }

  function renderThemeIcon(dark) {
    const wrap = btn?.querySelector('#themeIcon')?.parentElement || btn;
    if (!wrap) return;
    wrap.innerHTML = `<i id="themeIcon" data-lucide="${dark ? 'moon' : 'sun'}" class="h-5 w-5"></i>`;
    renderLucide();
  }

  function setTheme(theme, persist = true) {
    const dark = theme === 'dark';
    html.classList.toggle('dark', dark);
    html.classList.toggle('light', !dark);
    html.dataset.theme = theme;
    if (persist) localStorage.setItem('theme', theme);
    if (meta) meta.setAttribute('content', dark ? '#0b0d12' : '#f6f5f1');

    renderThemeIcon(dark);
    if (btn) {
      const label = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', label);
      btn.title = label;
    }
  }

  function init() {
    setTheme(getStoredTheme(), false);
    renderLucide();

    const year = document.getElementById('yr');
    if (year) year.textContent = new Date().getFullYear();

    btn?.addEventListener('click', () => {
      setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
