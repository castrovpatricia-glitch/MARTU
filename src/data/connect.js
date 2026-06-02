// ============================================================================
//  MODO CONECTAR IDEAS 🧠 — Preguntas integradoras (unir módulos + estrategia).
//  Y MODO PROFESOR MALA ONDA 💀 — pregunta, interrumpe y exige justificar el "por qué".
//  Se evalúan con el mismo motor de keyConcepts.
// ============================================================================

export const CONNECT = [
  {
    id: 'cn_1',
    world: 'all',
    type: 'open',
    q: 'Conectá reclutamiento, capacitación, evaluación y compensaciones en una sola lógica.',
    model:
      'La lógica integradora es: atraigo el talento (M6, reclutamiento y selección) → lo desarrollo (M7, capacitación y desarrollo) → mido su desempeño (M8, evaluación) → lo recompenso (M9, compensaciones) → cuido la relación, su salud y sus derechos (M10) → y gestiono la diversidad de toda esa fuerza laboral como ventaja competitiva (M11). Todos los subsistemas se conectan a través del análisis y descripción de puestos.',
    keyConcepts: [
      { label: 'Atraer el talento (reclutamiento)', keywords: ['atrae', 'atraigo', 'reclut', 'talento'], weight: 1 },
      { label: 'Desarrollarlo (capacitación)', keywords: ['desarroll', 'capacit'], weight: 1 },
      { label: 'Medir el desempeño (evaluación)', keywords: ['mido', 'mide', 'desempeno', 'evalu'], weight: 1 },
      { label: 'Recompensar (compensaciones)', keywords: ['recompens', 'compensa'], weight: 1 },
      { label: 'Hilo conductor: análisis y descripción de puestos', keywords: ['descripcion de puestos', 'analisis', 'puesto'], weight: 1 },
    ],
    strategy:
      'Para un 10: cerrar diciendo que todos los subsistemas deben estar ALINEADOS con la estrategia del negocio.',
    strategyKeywords: ['alinea', 'estrateg', 'negocio'],
    example:
      'Contrato un vendedor (M6), lo capacito (M7), evalúo sus ventas (M8) y le doy un bono (M9), todo derivado del perfil del puesto.',
  },
  {
    id: 'cn_2',
    world: 'all',
    type: 'open',
    q: '¿Cómo genera RRHH una ventaja competitiva para el negocio?',
    model:
      'RRHH genera ventaja competitiva alineando todos sus subsistemas con la estrategia: un reclutamiento estratégico que construye la reserva de talentos, capacitación y desarrollo que preparan a la gente, una gestión del desempeño que conecta objetivos con la misión del puesto, una compensación que comunica qué valora la empresa, relaciones laborales sanas y la gestión de la diversidad, donde una fuerza laboral diversa aporta diferencias valiosas y mayor flexibilidad ante el cambio.',
    keyConcepts: [
      { label: 'Reserva de talentos / reclutamiento estratégico', keywords: ['reserva', 'talento', 'estrateg'], weight: 1 },
      { label: 'Alinear los subsistemas con la estrategia', keywords: ['alinea', 'subsistema', 'estrategia'], weight: 1 },
      { label: 'Diversidad como ventaja (flexibilidad ante el cambio)', keywords: ['diversidad', 'flexibilidad', 'cambio'], weight: 1 },
      { label: 'Compensación que comunica qué valora la empresa', keywords: ['compensa', 'comunica', 'valora'], weight: 1 },
    ],
    strategy:
      'Para un 10: repetir el principio rector: las prácticas de RRHH deben estar alineadas con la estrategia del negocio para sostener la ventaja competitiva.',
    strategyKeywords: ['ventaja competitiva', 'estrategia del negocio'],
    example:
      'Una reserva de talento lista antes de necesitarla permite crecer más rápido que la competencia.',
  },
  {
    id: 'cn_3',
    world: 'all',
    type: 'open',
    q: '¿Por qué todos los subsistemas de RRHH tienen que alinearse con la estrategia del negocio?',
    model:
      'Porque el principio rector es que las prácticas de RRHH deben estar alineadas con la estrategia del negocio. Los objetivos de desempeño conectan la estrategia con la misión del puesto, la compensación comunica qué valora la empresa y el reclutamiento construye la reserva de talentos que da ventaja competitiva. Si cada subsistema tirara para un lado distinto, RRHH no aportaría valor; alineados, convierten a las personas en ventaja competitiva.',
    keyConcepts: [
      { label: 'Principio rector: alineación con la estrategia', keywords: ['alinea', 'estrategia', 'principio'], weight: 2 },
      { label: 'Los objetivos conectan estrategia y misión del puesto', keywords: ['objetivo', 'mision del puesto', 'conecta'], weight: 1 },
      { label: 'Resultado: las personas como ventaja competitiva', keywords: ['ventaja competitiva', 'valor'], weight: 1 },
    ],
    strategy:
      'Para un 10: dar el hilo conductor del análisis y descripción de puestos como lo que une a todos los subsistemas.',
    strategyKeywords: ['descripcion de puestos', 'analisis', 'hilo'],
    example:
      'Si la estrategia es calidad, el desempeño se mide por calidad y la compensación premia la calidad: todo apunta al mismo lado.',
  },
]

// ---------------------------------------------------------------------------
//  MODO PROFESOR MALA ONDA 💀 — Cada item arranca con una pregunta y, hagas lo
//  que hagas, te repregunta el "por qué" y te obliga a conectar con la estrategia.
// ---------------------------------------------------------------------------
export const MALAONDA = [
  {
    id: 'mo_1',
    world: 'w4',
    q: 'Decime qué es la compensación variable.',
    followUps: [
      'Ok... pero ¿cómo se relaciona eso con la estrategia del negocio?',
      '¿Y por qué decís que si es grupal fomenta el trabajo en equipo? Justificá.',
      'Última: ¿qué riesgo tiene la variable según Chiavenato? No me la regales.',
    ],
    model:
      'La remuneración variable cambia según resultados, requiere objetivos e indicadores y alineación con la estrategia; si es grupal fomenta el trabajo en equipo. Su riesgo (Chiavenato): rompe la igualdad de ganancias y puede generar quejas y presión sindical. Se conecta con la estrategia porque premia los comportamientos que el negocio quiere reforzar.',
    keyConcepts: [
      { label: 'Variable = según resultados, con indicadores', keywords: ['variable', 'resultado', 'indicador'], weight: 1 },
      { label: 'Alineada con la estrategia', keywords: ['estrateg', 'alinea'], weight: 1 },
      { label: 'Grupal fomenta el trabajo en equipo', keywords: ['grupal', 'equipo'], weight: 1 },
      { label: 'Riesgo: rompe igualdad / presión sindical', keywords: ['igualdad', 'sindical', 'queja'], weight: 1 },
    ],
    strategyKeywords: ['estrateg', 'negocio'],
  },
  {
    id: 'mo_2',
    world: 'w1',
    q: 'Me dijiste que el reclutamiento es estratégico. ¿Por qué? Convenceme.',
    followUps: [
      '¿Y eso qué tiene que ver con la ventaja competitiva? Explicá el vínculo.',
      'Dame una señal concreta de que el banco de talento interno está débil.',
      '¿Por qué la decisión final no la toma RRHH? Justificá.',
    ],
    model:
      'El reclutamiento es estratégico porque dejó de ser reactivo y pasó a ser continuo: construye la reserva de talentos, que da ventaja competitiva. Señales de banco interno débil: demora en cubrir puestos clave, vacantes que solo se llenan de afuera, reemplazos que fracasan, promociones por favoritismo. La decisión final la toma el gerente de línea porque es quien integrará a la persona a su equipo.',
    keyConcepts: [
      { label: 'Continuo, no reactivo', keywords: ['continu', 'reactiv'], weight: 1 },
      { label: 'Reserva de talentos = ventaja competitiva', keywords: ['reserva', 'talento', 'ventaja competitiva'], weight: 1 },
      { label: 'Señal de banco débil', keywords: ['debil', 'favoritismo', 'fracasan', 'desde afuera'], weight: 1 },
      { label: 'Decide el gerente de línea', keywords: ['gerente de linea', 'gerente', 'linea'], weight: 1 },
    ],
    strategyKeywords: ['ventaja competitiva', 'estrateg'],
  },
  {
    id: 'mo_3',
    world: 'w3',
    q: '¿Qué es la evaluación del desempeño?',
    followUps: [
      'No me alcanza. ¿En qué se diferencia de la GESTIÓN del desempeño?',
      '¿Por qué decimos "el hacer, no el ser"? Justificá con el por qué.',
      'Conectá esto con la capacitación: ¿qué tienen que ver?',
    ],
    model:
      'La evaluación del desempeño es la actividad puntual donde el gerente compara el desempeño con los requerimientos del puesto; la gestión es el proceso global de crear un ambiente para rendir al máximo. Se dice "el hacer, no el ser" porque la retroalimentación se enfoca en lo realizado y bajo control del empleado, no en su personalidad. Se conecta con la capacitación porque la evaluación identifica necesidades de capacitación y desarrollo.',
    keyConcepts: [
      { label: 'Evaluación = medición puntual vs. requerimientos', keywords: ['puntual', 'compara', 'requerimiento'], weight: 1 },
      { label: 'Gestión = proceso global', keywords: ['gestion', 'global', 'ambiente'], weight: 1 },
      { label: 'El hacer, no el ser', keywords: ['el hacer', 'no el ser', 'realizado'], weight: 1 },
      { label: 'Identifica necesidades de capacitación', keywords: ['capacit', 'necesidad', 'desarroll'], weight: 1 },
    ],
    strategyKeywords: ['estrateg', 'mision del puesto'],
  },
  {
    id: 'mo_4',
    world: 'w5',
    q: 'Decime qué es el contrato psicológico.',
    followUps: [
      '¿Y por qué importa para las relaciones laborales? Justificá.',
      'No lo confundas: ¿en qué se diferencia del contrato social de Mondy?',
      '¿Qué pasa si ese contrato se rompe? Pensalo.',
    ],
    model:
      'El contrato psicológico son las expectativas de un intercambio justo entre empleado y empleador: el empleado espera compensación justa, estabilidad, capacitación y promociones; el empleador espera desempeño y cumplimiento. Importa porque fortalecerlo lleva a relaciones armónicas. Se diferencia del contrato social (Mondy), que son las reglas escritas y no escritas entre la organización y la sociedad, el gobierno y otras organizaciones.',
    keyConcepts: [
      { label: 'Expectativas de intercambio justo empleado-empleador', keywords: ['expectativa', 'intercambio', 'empleado', 'empleador'], weight: 1 },
      { label: 'Qué espera cada parte', keywords: ['compensacion justa', 'estabilidad', 'desempeno', 'cumplimiento'], weight: 1 },
      { label: 'Fortalecerlo = relaciones armónicas', keywords: ['armonic', 'fortalec'], weight: 1 },
      { label: 'Distinto del contrato social (Mondy)', keywords: ['contrato social', 'sociedad', 'mondy'], weight: 1 },
    ],
    strategyKeywords: ['relaciones', 'armonic'],
  },
]
