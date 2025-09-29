class ThemeManager {
    constructor() {
      this.storageKey = 'portfolio-theme';
      this.metaThemeColor = document.querySelector('meta[name="theme-color"]');
      this.html = document.documentElement;
      
      // Inicializar tema INMEDIATAMENTE para evitar flash
      this.initThemeSync();
    }
  
    initThemeSync() {
      // Detectar tema guardado o sistema
      const savedTheme = localStorage.getItem(this.storageKey);
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemDark ? 'dark' : 'light');
      
      // Aplicar inmediatamente
      this.applyThemeSync(theme);
      
      // Configurar listeners
      this.setupListeners();
    }
  
    applyThemeSync(theme) {
      // Remover todas las clases de tema primero
      this.html.classList.remove('light', 'dark');
      
      // Agregar la clase correcta
      this.html.classList.add(theme);
      this.html.dataset.theme = theme;
      
      // Meta theme-color
      if (this.metaThemeColor) {
        this.metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
      }
      
      // Guardar preferencia
      localStorage.setItem(this.storageKey, theme);
    }
  
    setupListeners() {
      // Escuchar cambios del sistema solo si no hay preferencia guardada
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.applyThemeSync(e.matches ? 'dark' : 'light');
        }
      });
    }
  
    toggle() {
      const currentTheme = this.html.dataset.theme || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.applyThemeSync(newTheme);
      return newTheme;
    }
  
    getCurrentTheme() {
      return this.html.dataset.theme || 'light';
    }
  }
  
  // Instanciar INMEDIATAMENTE (no esperar DOM)
  window.themeManager = new ThemeManager();