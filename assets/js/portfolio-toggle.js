class PortfolioToggle {
    constructor() {
      this.dataToggle = document.getElementById('toggle-data');
      this.embeddedToggle = document.getElementById('toggle-embedded');
      this.dataProjects = document.getElementById('data-projects');
      this.embeddedProjects = document.getElementById('embedded-projects');
      this.primaryBadge = document.getElementById('primary-badge');
      this.heroTitle = document.getElementById('hero-title');
      this.heroDescription = document.getElementById('hero-description');
      this.highlightsList = document.getElementById('highlights-list');
      this.skillsExtra = document.getElementById('skills-extra');
      
      this.content = {
        data: {
          badge: 'Data/Backend · Python + SQL · ETL',
          badgeClass: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
          title: 'Construyo <span class="text-emerald-600 dark:text-emerald-400">pipelines confiables</span> con Python→SQL Server, trazabilidad y reportes.',
          description: 'Automatizo ingestas, validaciones y conciliaciones operativas/contables. Experiencia en proyectos de alto volumen (sector público) y herramientas de orquestación y MLOps básico.',
          highlights: `
            <li class="flex items-start gap-2"><i data-lucide="gauge" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>Reduje ~40% el tiempo de procesamiento masivo estandarizando ETL y agregando observabilidad (logs, checksums, métricas, reintentos).</span></li>
            <li class="flex items-start gap-2"><i data-lucide="server" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>ETL Python → SQL Server con validaciones, control de totales y deduplicación idempotente.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="pipeline" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>Orquestación con Prefect/Airflow (jobs batch, alertas, CRON) y despliegue en Windows Server/Linux.</span></li>
          `,
          skills: `
            <h3 class="font-semibold mb-2">Frontend ops</h3>
            <p>PySide6 (tooling de operaciones)</p>
          `
        },
        embedded: {
          badge: 'Hardware · C/MCUs · IoT',
          badgeClass: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs border-blue-600/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
          title: 'Integro <span class="text-emerald-600 dark:text-emerald-400">firmware y datos</span> desde MCUs hasta dashboards Python.',
          description: 'Desarrollo en C/ESP32 con FreeRTOS, protocolos industriales (Modbus, I²C, SPI) y telemetría IoT. Integración completa con pipelines Python para observabilidad end-to-end.',
          highlights: `
            <li class="flex items-start gap-2"><i data-lucide="cpu" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>Firmware robusto en C con FreeRTOS, manejo de sensores y comunicaciones industriales (Modbus RTU, I²C, SPI).</span></li>
            <li class="flex items-start gap-2"><i data-lucide="wifi" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>Telemetría IoT con MQTT/LoRa, reconexión automática y journaling local para resiliencia.</span></li>
            <li class="flex items-start gap-2"><i data-lucide="activity" class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400"></i><span>Integración completa: datos de MCU → API Python → SQL Server → dashboard con < 0.5% pérdida.</span></li>
          `,
          skills: `
            <h3 class="font-semibold mb-2">Embebidos</h3>
            <p>C/ESP32, FreeRTOS, I²C/SPI/UART, Modbus RTU</p>
          `
        }
      };
  
      this.init();
    }
  
    switchMode(mode) {
      const content = this.content[mode];
      
      if (mode === 'embedded') {
        this.dataToggle.classList.remove('active');
        this.embeddedToggle.classList.add('active');
        this.dataProjects.classList.add('hidden');
        this.embeddedProjects.classList.remove('hidden');
      } else {
        this.embeddedToggle.classList.remove('active');
        this.dataToggle.classList.add('active');
        this.embeddedProjects.classList.add('hidden');
        this.dataProjects.classList.remove('hidden');
      }
  
      // Actualizar contenido
      this.primaryBadge.textContent = content.badge;
      this.primaryBadge.className = content.badgeClass;
      this.heroTitle.innerHTML = content.title;
      this.heroDescription.textContent = content.description;
      this.highlightsList.innerHTML = content.highlights;
      this.skillsExtra.innerHTML = content.skills;
  
      // Re-renderizar iconos
      setTimeout(() => {
        if (window.lucide) lucide.createIcons();
      }, 10);
    }
  
    init() {
      // Agregar event listeners
      if (this.dataToggle) {
        this.dataToggle.addEventListener('click', () => this.switchMode('data'));
      }
      if (this.embeddedToggle) {
        this.embeddedToggle.addEventListener('click', () => this.switchMode('embedded'));
      }
    }
  }
  
  // Auto-inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioToggle();
  });