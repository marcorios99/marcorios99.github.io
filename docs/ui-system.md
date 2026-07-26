# Portfolio UI System

## Estructura CSS

- `assets/css/styles.css`: punto de entrada de estilos compartidos.
- `assets/css/theme.css`: tokens, temas y estilos cromáticos globales.
- `assets/css/components.css`: componentes y utilidades reutilizables.
- `assets/css/pages/home.css`: layout y estilos exclusivos de la landing.
- `assets/css/pages/projects.css`: catálogo de proyectos.
- `assets/css/pages/project-detail.css`: casos de estudio individuales.

## Orden de carga

```html
<link rel="stylesheet" href="/assets/css/styles.css">
<link rel="stylesheet" href="/assets/css/pages/home.css">
```

Para un caso de estudio:

```html
<link rel="stylesheet" href="/assets/css/styles.css">
<link rel="stylesheet" href="/assets/css/pages/project-detail.css">
```

## Theme tokens

`theme.css` define los tokens globales para acento (`--accent`, `--accent-strong`, `--accent-solid`), fondos (`--bg`, `--bg-strong`), superficies (`--surface`, `--surface-soft`, `--surface-glass`), texto (`--text`, `--text-body`, `--text-muted`), bordes (`--border`, `--border-soft`), sombra (`--shadow`) y el selector de tema (`--toggle-bg`, `--toggle-bg-hover`, `--toggle-fg`, `--toggle-br`, `--toggle-dot-bg`).

## Componentes compartidos

- Contenedor: `.container-xx`.
- Navegación e identidad: `.site-wordmark`, `.navlink` y `.theme-btn`.
- Botones: `.btn-accent`, `.btn-outline` y `.btn-icon`.
- Contenido editorial: `.section-kicker`, `.section-heading`, `.section-copy` y `.text-link`.
- Chips neutrales: `.badge` y `.badge-neutral`.
- Estados hover y `:focus-visible` compartidos.

## Estilos específicos de página

Cada página carga su archivo desde `assets/css/pages/` después de `styles.css`. Los layouts, distribuciones de chips y reglas editoriales que dependen de una página viven allí.

## Reglas arquitectónicas

1. No declarar tokens globales en archivos de página.
2. No colocar layouts específicos en `components.css`.
3. No duplicar componentes mediante overrides innecesarios.
4. Cada página carga `styles.css` y después su CSS específico.
5. El catálogo usa `projects.css` y los casos de estudio individuales usan `project-detail.css`.
6. No añadir estilos inline salvo casos estrictamente justificados.

## Case study template

- Ruta base: `projects/case-study-template/`.
- Es una plantilla no indexable; al publicar un proyecto se duplica el directorio, se elimina `noindex` y se reemplaza toda la metadata y los placeholders.
- Activar sólo los módulos con contenido real y no mostrar enlaces inexistentes.
- El README cubre instalación y referencia técnica; el caso de estudio comunica problema, solución, decisiones y evidencia.

## Próximos hitos

- Hito 1: sistema visual compartido - completado.
- Hito 2: migración visual de `/projects/` - completado.
- Hito 3: template reutilizable para casos de estudio - implementado por esta tarea.
