class LanguageSwitcher {
    constructor() {
      this.currentLang = this.detectCurrentLanguage();
      this.init();
    }
  
    detectCurrentLanguage() {
      const path = window.location.pathname;
      return path.startsWith('/en/') ? 'en' : 'es';
    }
  
    getAlternatePath() {
      const currentPath = window.location.pathname;
      
      if (this.currentLang === 'es') {
        // De español a inglés: agregar /en/ al inicio
        return currentPath === '/' ? '/en/' : `/en${currentPath}`;
      } else {
        // De inglés a español: quitar /en/
        return currentPath.replace(/^\/en/, '') || '/';
      }
    }
  
    updateLanguageLinks() {
      const esLink = document.querySelector('[data-lang="es"]');
      const enLink = document.querySelector('[data-lang="en"]');
      
      if (esLink && enLink) {
        const alternatePath = this.getAlternatePath();
        
        if (this.currentLang === 'es') {
          esLink.classList.add('active');
          esLink.href = '#';
          enLink.href = alternatePath;
          enLink.classList.remove('active');
        } else {
          enLink.classList.add('active');
          enLink.href = '#';
          esLink.href = alternatePath;
          esLink.classList.remove('active');
        }
      }
    }
  
    updateHreflang() {
      // Eliminar hreflang existentes
      document.querySelectorAll('link[rel="alternate"]').forEach(link => link.remove());
      
      const alternatePath = this.getAlternatePath();
      const alternateUrl = `${window.location.origin}${alternatePath}`;
      const currentUrl = window.location.href;
      const head = document.head;
      
      // Agregar hreflang para ambos idiomas
      const esLink = document.createElement('link');
      esLink.rel = 'alternate';
      esLink.hreflang = 'es';
      esLink.href = this.currentLang === 'es' ? currentUrl : alternateUrl;
      head.appendChild(esLink);
      
      const enLink = document.createElement('link');
      enLink.rel = 'alternate';
      enLink.hreflang = 'en';
      enLink.href = this.currentLang === 'en' ? currentUrl : alternateUrl;
      head.appendChild(enLink);
      
      // Default (español)
      const defaultLink = document.createElement('link');
      defaultLink.rel = 'alternate';
      defaultLink.hreflang = 'x-default';
      defaultLink.href = this.currentLang === 'es' ? currentUrl : alternateUrl;
      head.appendChild(defaultLink);
    }
  
    init() {
      this.updateLanguageLinks();
      this.updateHreflang();
    }
  }
  
  // Auto-inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
  });