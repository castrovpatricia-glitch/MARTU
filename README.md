# 🎓 RRHH Quest — Tu juego para el oral de Recursos Humanos

Una app web interactiva (estilo Duolingo / Kahoot / Quizlet) para preparar el **parcial oral de RRHH (Módulos 6 a 11)**. El objetivo no es memorizar: es **entender, dar ejemplos, comparar conceptos, conectar módulos y relacionarlos con la estrategia del negocio**, que es lo que diferencia un 7 de un 10.

> ⚠️ **Todo el contenido** (preguntas, respuestas, correcciones y explicaciones) proviene **exclusivamente** de tu guía de estudio. No hay teoría externa ni conceptos inventados.

---

## 🚀 Cómo correrla

Necesitás [Node.js](https://nodejs.org) 18+.

```bash
npm install      # instala dependencias (una sola vez)
npm run dev      # abre el juego en modo desarrollo (http://localhost:5173)
```

Para una versión optimizada:

```bash
npm run build    # genera la carpeta dist/
npm run preview  # sirve la versión de producción
```

Todo tu progreso (XP, vidas, racha, dominio, errores) se guarda solo en tu navegador con **localStorage**: podés cerrar y volver cuando quieras.

---

## 🗺️ Qué incluye

**Mapa de aprendizaje — 6 mundos** (uno por módulo), cada uno con 5 niveles desbloqueables:

1. 🎯 Reclutamiento y selección
2. 📚 Capacitación y desarrollo
3. 📊 Gestión del desempeño
4. 💰 Compensaciones
5. ⚖️ Relaciones laborales y salud ocupacional
6. 🌈 Gestión de la diversidad

Niveles: **Conceptos básicos → Diferencias → Aplicación → Preguntas difíciles → Oral del profesor**. No pasás al siguiente mundo hasta dominar el anterior (≥ 70%).

**7 modos de juego**
- ⚡ **Flash** — multiple choice, V/F, completar, relacionar y ordenar procesos.
- 👩‍🏫 **Profesor exigente** — preguntas abiertas: escribís con tus palabras y te corrige con **nota /10**, marcando qué conceptos te faltaron para el 10.
- ⚔️ **Comparaciones** — las diferencias típicas del oral (definición + diferencia + ejemplo).
- 🚨 **No me la creo** — afirmaciones para decidir correcto/incorrecto y saber por qué.
- 🧠 **Conectar ideas** — preguntas integradoras para unir módulos y la estrategia.
- 📚 **Autores** — asociar autor ↔ concepto (Snell & Bohlander, Chiavenato, Mondy & Noe, Drucker).
- 🔥 **Examen del Viernes** — simulacro de 15 preguntas con **nota final**, semáforo de temas (🟢 dominados / 🟡 repasar / 🔴 no sabés) y **plan de estudio** para las horas que quedan.

**Botones de emergencia**
- 🧒 **Explicámelo fácil** — cada concepto explicado simple + ejemplo + definición formal.
- ⏱ **Repaso de emergencia 10 minutos** — lo más preguntable, diferencias, autores y trampas, con cuenta regresiva.
- 💀 **Profe mala onda** — te interrumpe, te repregunta el "¿por qué?" y te obliga a conectar con la estrategia.

**Inteligencia del juego**
- 🔥 **Lo que todavía no sabés** — registra tus errores, los cuenta y te deja volver a practicarlos.
- 🔁 **Repetición espaciada** — lo que más fallás, vuelve más seguido.
- Sistema de **XP / niveles**, **vidas** (se recuperan solas), **racha de estudio** y **% de dominio por tema**.

---

## 🧪 Tests

```bash
npm test   # valida los datos, el evaluador y que todos los componentes rendericen
```

## 🛠️ Stack

React 18 · Vite · Tailwind CSS · Framer Motion · canvas-confetti.

¡A romperla el viernes! 💪
