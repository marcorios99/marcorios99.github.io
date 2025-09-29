// INIT tema sin flash (idéntico al index)
(function () {
    const ls = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = ls || (sysDark ? 'dark' : 'light');
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme !== 'dark');
    html.dataset.theme = theme;
  
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0b0b' : '#ffffff');
  })();
  
  // TOGGLE + icono
  (function () {
    const btn  = document.getElementById('themeBtn');
    const meta = document.querySelector('meta[name="theme-color"]');
    const html = document.documentElement;
  
    function renderIcon(dark) {
      const wrap = btn?.querySelector('#themeIcon')?.parentElement || btn;
      if (!wrap || !window.lucide) return;
      wrap.innerHTML = `<i id="themeIcon" data-lucide="${dark ? 'moon' : 'sun'}" class="h-5 w-5"></i>`;
      lucide.createIcons();
    }
  
    function setTheme(theme) {
      const dark = theme === 'dark';
      html.classList.toggle('dark', dark);
      html.classList.toggle('light', !dark);
      html.dataset.theme = theme;
      localStorage.setItem('theme', theme);
      if (meta) meta.setAttribute('content', dark ? '#0b0b0b' : '#ffffff');
      renderIcon(dark);
      if (btn) {
        btn.setAttribute('aria-pressed', String(dark));
        const tt = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        btn.title = tt; btn.setAttribute('aria-label', tt);
      }
    }
  
    function init() {
      const ls = localStorage.getItem('theme');
      const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = ls || (sysDark ? 'dark' : 'light');
      setTheme(theme);
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    btn?.addEventListener('click', () => {
      const next = (html.dataset.theme === 'dark') ? 'light' : 'dark';
      setTheme(next);
    });
  })();
  