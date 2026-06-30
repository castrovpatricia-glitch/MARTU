# 🇨🇴 Marca País Colombia · *Y todavía no viste nada*

Presentación interactiva tipo **deck navegable a pantalla completa** para el TP final de
**Imagen Empresaria I** (Martina Castro · Prof. Stiegwardt · 2026).

Resume visualmente el trabajo sobre la **Marca País Colombia**, con foco en la campaña
final **"Y todavía no viste nada"**. La estética sigue el manual de marca: fondo azul
profundo / blanco, tipografía geométrica (Futura → Montserrat), paleta vibrante,
contenedores sólidos de color y el identificador **CO**.

---

## 🚀 Cómo correrla localmente

Necesitás [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install      # instala dependencias (una sola vez)
npm run dev      # abre la presentación en http://localhost:5173
```

Para la versión optimizada de producción:

```bash
npm run build    # genera la carpeta dist/
npm run preview  # sirve el build listo para grabar pantalla
```

> ¿No querés instalar nada? Después de `npm run build`, la carpeta `dist/` es
> 100% estática: se puede abrir con cualquier servidor (por ejemplo la extensión
> **Live Server** de VS Code) o subir a Netlify / Vercel / GitHub Pages.

---

## 🎬 Cómo navegar

| Acción | Cómo |
| --- | --- |
| Slide siguiente | Flecha **→** lateral · tecla **→** · barra espaciadora · botón **Siguiente** |
| Slide anterior | Flecha **←** lateral · tecla **←** |
| Ir a una slide | Click en los **dots** inferiores |
| Primera / última | Teclas **Home** / **End** |
| En mobile | **Deslizá** con el dedo (swipe) |
| Progreso | **Barra superior** + contador **00 / 13** |

**Interacciones especiales**
- **Slide 9 (Ecosistema digital):** pasá el cursor o tocá cada formato para ver qué hace.
- **Slide 12 (Colombia Experience):** pasá el cursor o tocá cada estación para ver qué desbloquea.

---

## 🗂️ Estructura de 13 slides

1. **Portada** — Marca País Colombia · *Y todavía no viste nada*
2. **¿Qué marca analizamos?** — Colombia como marca país
3. **Identidad visual** — Una identidad flexible y diversa
4. **Atributos de identidad** — ¿Qué representa Colombia?
5. **Diagnóstico de percepción** — El problema no es de identidad, es de percepción
6. **Insight estratégico** — Lo conocido como puerta de entrada
7. **Concepto de campaña** — *Y todavía no viste nada*
8. **Sistema creativo** — Conocés… / Conocé…
9. **Ecosistema digital** — Las acciones de campaña
10. **Filtro AR + participación** — Descubrí tu Colombia
11. **Vía pública** — Del mundo digital al espacio público
12. **Activación presencial** — Colombia Experience
13. **Cierre** — Colombia ya es reconocida. Ahora necesita ser redescubierta.

---

## 🧱 Estructura de carpetas

```
.
├── index.html              # entrada + fuentes (Montserrat) + favicon CO
├── src/
│   ├── main.jsx            # bootstrap de React
│   ├── App.jsx             # controlador del deck (teclado, swipe, dots, progreso)
│   ├── index.css           # estilos base + utilidades de marca (Tailwind)
│   ├── components/
│   │   ├── Slide.jsx        # marco común a pantalla completa
│   │   └── ui.jsx           # logo CO, kicker, contenedores y animaciones
│   ├── slides/             # las 13 slides (S01…S13)
│   └── assets/             # imágenes y mockups reales de la campaña
├── tailwind.config.js      # paleta del manual de Marca País Colombia
└── vite.config.js
```

---

## 🛠️ Stack

**React 18 · Vite · Tailwind CSS · Framer Motion.** Sin dependencias de backend:
es una single-page app estática, responsive (desktop + mobile) y sin errores de consola.

> Todo el contenido proviene del trabajo *"M3 Colombia – Martina Castro"*. Las piezas
> de campaña son los mockups originales del TP. Donde no había una imagen exacta se usó
> un recurso gráfico construido con la estética del manual de marca.
