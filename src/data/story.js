// ============================================================================
//  MODO HISTORIA / EMPRESA — "TechNova"
//  Aprendés RRHH ayudando a una empresa ficticia a resolver sus problemas.
//  Cada capítulo: un problema real → elegís qué haría RRHH → te enseña el tema.
//  Todo fiel a la guía. teaches: conceptos que se aprenden.
// ============================================================================

export const STORY = {
  company: 'TechNova',
  intro:
    'TechNova es una empresa de tecnología que crece rápido… pero su área de RRHH es un caos. Te contratan como su persona de RRHH. Capítulo a capítulo vas a resolver sus problemas usando lo que sabés. ¡Vamos!',
  chapters: [
    {
      id: 'st1',
      world: 'w1',
      title: 'Siempre corriendo de atrás',
      problem:
        'En TechNova solo buscan gente cuando alguien renuncia. Cada vez que pasa, quedan semanas sin cubrir el puesto y todo se atrasa.',
      question: '¿Qué le explicás a la dirección?',
      options: [
        'Que el reclutamiento debe dejar de ser reactivo y volverse un proceso continuo y estratégico',
        'Que contraten al primero que aparezca para no perder tiempo',
        'Que esperen a tener tres renuncias juntas para buscar una sola vez',
      ],
      answer: 0,
      teaches: ['c6_imperativo'],
      lesson:
        'El reclutamiento dejó de ser reactivo (buscar solo al aparecer la vacante) para ser un proceso continuo que fortalece la reserva de talentos y da ventaja competitiva. Así TechNova tendría candidatos listos antes de necesitarlos.',
    },
    {
      id: 'st2',
      world: 'w1',
      title: 'El “amigo del jefe”',
      problem:
        'Un gerente ascendió a un conocido suyo sin proceso. La persona no rinde y el equipo está molesto.',
      question: '¿Qué señal es esta y qué recomendás?',
      options: [
        'Es señal de un banco de talento interno débil (promoción por favoritismo); hay que profesionalizar el proceso',
        'Está perfecto: ascender amigos genera confianza',
        'Es un problema de compensaciones, nada más',
      ],
      answer: 0,
      teaches: ['c6_interno'],
      lesson:
        'Las promociones por favoritismo o nepotismo son una señal de banco de talento interno débil, junto con las demoras en cubrir puestos clave y los reemplazos que fracasan. El reclutamiento interno bien hecho usa el job posting.',
    },
    {
      id: 'st3',
      world: 'w1',
      title: 'Contratamos… y no rinde',
      problem:
        'TechNova contrató rápido a un perfil que no funcionó. Ya habían pagado el proceso y lo capacitaron durante meses.',
      question: '¿Cómo le explicás el costo de este error?',
      options: [
        'Hubo costos directos (el proceso), indirectos (capacitarlo) y de oportunidad (el buen candidato descartado)',
        'Solo se perdió el sueldo del mes',
        'No hubo ningún costo, son cosas que pasan',
      ],
      answer: 0,
      teaches: ['c6_costos', 'c6_seleccion'],
      lesson:
        'Un error de selección genera tres costos: directos, indirectos y de oportunidad. Por eso la selección busca maximizar aciertos y evitar errores, y la decisión final la toma el gerente de línea.',
    },
    {
      id: 'st4',
      world: 'w2',
      title: 'El curso que nadie usa',
      problem:
        'RRHH dio una capacitación cara. A todos les gustó, pero en el trabajo nadie aplica lo aprendido.',
      question: '¿Qué nivel de Kirkpatrick está fallando?',
      options: [
        'La transferencia: les gustó (reacción) y quizá aprendieron, pero no lo aplican al trabajo',
        'La reacción: el curso no gustó',
        'Ninguno, si gustó ya está todo bien',
      ],
      answer: 0,
      teaches: ['c7_kirkpatrick', 'c7_efectividad'],
      lesson:
        'Kirkpatrick mide reacción → aprendizaje → transferencia → resultados. Acá falla la TRANSFERENCIA (aplicación al trabajo). Como la capacitación es costosa, hay que medir su efectividad para que aporte a las metas.',
    },
    {
      id: 'st5',
      world: 'w3',
      title: 'Cada jefe con su vara',
      problem:
        'En las evaluaciones, un gerente pone notas altísimas a todos y otro es durísimo. Las evaluaciones no son comparables.',
      question: '¿Qué herramienta proponés?',
      options: [
        'Mesas de calibración: reuniones de gerentes para alinear las evaluaciones y que sean consistentes',
        'Que cada uno siga evaluando como quiera',
        'Eliminar las evaluaciones para evitar el problema',
      ],
      answer: 0,
      teaches: ['c8_calibracion'],
      lesson:
        'Las mesas de calibración son reuniones de gerentes para que las evaluaciones sean consistentes entre sí. La calidad del proceso es responsabilidad compartida de RRHH y los gerentes.',
    },
    {
      id: 'st6',
      world: 'w3',
      title: '“Sos un desastre”',
      problem:
        'Un jefe le dijo a su empleado “sos un descuidado” en la devolución. El empleado quedó dolido y a la defensiva.',
      question: '¿Cómo debería haber dado el feedback?',
      options: [
        'Sobre el HACER y no el SER: “este informe tuvo 3 errores”, con ejemplos y sobre lo controlable',
        'Está bien hablar de la personalidad si es verdad',
        'Mejor no dar feedback para no generar conflicto',
      ],
      answer: 0,
      teaches: ['c8_feedback'],
      lesson:
        'La buena retroalimentación se enfoca en lo realizado (el hacer, no el ser), sobre lo que está bajo control del empleado, con ejemplos y comunicación activa. No se discute la forma de ser ni los valores.',
    },
    {
      id: 'st7',
      world: 'w5',
      title: 'Mucho trabajo, poco a cambio',
      problem:
        'Los empleados de TechNova sienten que dan mucho y reciben poco. Hay malestar y renuncias.',
      question: '¿Qué dos conceptos están en juego?',
      options: [
        'El contrato psicológico (intercambio justo) y la compensación (que comunica qué valora la empresa)',
        'Solo el horario de trabajo',
        'Nada de RRHH, es problema de los empleados',
      ],
      answer: 0,
      teaches: ['c10_psicologico', 'c9_estrategica'],
      lesson:
        'El contrato psicológico son las expectativas de un intercambio justo: el empleado espera compensación justa, estabilidad, capacitación y promociones. Fortalecerlo da relaciones armónicas. La compensación, además, comunica qué valora la empresa.',
    },
    {
      id: 'st8',
      world: 'w4',
      title: 'Motivar a los que más venden',
      problem:
        'TechNova quiere premiar a su equipo de ventas para que rinda aún más, sin disparar los costos fijos.',
      question: '¿Qué esquema proponés?',
      options: [
        'Remuneración variable (con indicadores y alineada a la estrategia); si es grupal, fomenta el trabajo en equipo',
        'Subir el sueldo fijo a todos por igual',
        'No premiar a nadie para evitar envidias',
      ],
      answer: 0,
      teaches: ['c9_variable', 'c9_fijavsvar'],
      lesson:
        'La remuneración variable premia el desempeño excepcional sin tocar los costos fijos y, si es grupal, fomenta el equipo. La fija, en cambio, es estable pero no motiva (factor higiénico). Ojo: la variable puede romper la igualdad y generar presión sindical.',
    },
    {
      id: 'st9',
      world: 'w5',
      title: 'Perdido en su propio puesto',
      problem:
        'Un empleado nuevo no entiende qué se espera de él. Vive estresado y su rendimiento cae.',
      question: '¿Qué problema de rol es y con qué se relaciona?',
      options: [
        'Ambigüedad de roles (no entiende su puesto), una fuente de estrés laboral que puede derivar en burnout',
        'Conflicto de roles, porque le piden cosas opuestas',
        'Es vagancia del empleado, no es un tema de RRHH',
      ],
      answer: 0,
      teaches: ['c10_roles', 'c10_estres'],
      lesson:
        'La ambigüedad de roles es no entender el puesto (distinto del conflicto de roles, que es perseguir objetivos opuestos). Es una fuente de estrés laboral que, en su forma extrema, deriva en burnout, que es contagioso y debe prevenirse.',
    },
    {
      id: 'st10',
      world: 'w2',
      title: 'Se va el mejor gerente',
      problem:
        'El gerente estrella de TechNova renuncia y nadie está preparado para reemplazarlo. Cunde el pánico.',
      question: '¿Qué le faltó a TechNova?',
      options: [
        'Desarrollo gerencial y planes de sucesión: preparar de antemano a los futuros líderes',
        'Nada, es imposible anticiparse a una renuncia',
        'Contratar de urgencia al primero de afuera',
      ],
      answer: 0,
      teaches: ['c7_gerencial', 'c7_rolrrhh'],
      lesson:
        'El desarrollo gerencial (rotación, coaching, proyectos) prepara a los futuros jefes, y RRHH calibra el potencial con inventarios de talento y planes de sucesión. Gana relevancia por la escasez de talento gerencial.',
    },
    {
      id: 'st11',
      world: 'w6',
      title: 'Un lugar para todos',
      problem:
        'Llegan quejas de que ciertos grupos quedan afuera de las búsquedas de TechNova. La imagen de la empresa se resiente.',
      question: '¿Qué hacés?',
      options: [
        'Acción afirmativa: medidas proactivas (publicar vacantes en barrios, eliminar obstáculos, capacitar) para incluir a clases protegidas',
        'Ignorarlo, total nadie se va a enterar',
        'Contratar solo a esos grupos y a nadie más',
      ],
      answer: 0,
      teaches: ['c11_afirmativa', 'c11_gestion'],
      lesson:
        'La acción afirmativa revierte discriminaciones pasadas con medidas proactivas hacia clases protegidas (minorías, mujeres, mayores, personas con discapacidad). Gestionar la diversidad asegura igualdad de oportunidades y un empleo justo y no sesgado.',
    },
    {
      id: 'st12',
      world: 'w6',
      title: 'RRHH en la mesa chica',
      problem:
        'El dueño de TechNova pregunta, escéptico: “¿En qué me ayuda RRHH a ganar como negocio?”.',
      question: '¿Cómo cerrás tu trabajo en TechNova?',
      options: [
        'Mostrando que todo se conecta: atraer → desarrollar → medir → recompensar → cuidar → gestionar diversidad, alineado a la estrategia',
        'Diciendo que RRHH solo se encarga de los sueldos',
        'Admitiendo que RRHH no aporta al negocio',
      ],
      answer: 0,
      teaches: ['c11_ventajas'],
      lesson:
        'Todos los subsistemas se conectan por el análisis y descripción de puestos y siguen la lógica: atraigo talento (M6) → lo desarrollo (M7) → mido su desempeño (M8) → lo recompenso (M9) → cuido la relación y la salud (M10) → gestiono la diversidad como ventaja competitiva (M11). Todo alineado a la estrategia del negocio. ¡Felicitaciones, salvaste a TechNova! 🎉',
    },
  ],
}
