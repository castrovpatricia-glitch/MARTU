// ============================================================================
//  MODO PROFESOR EXIGENTE 👩‍🏫 / ORAL DEL PROFESOR — Preguntas abiertas.
//  El alumno escribe con sus palabras y el evaluador puntúa por conceptos clave.
//  keywords: raíces en minúscula y SIN tildes (el evaluador normaliza igual).
//  weight: cuánto pesa el concepto. strategy: conexión con la estrategia (bonus
//  que diferencia un 7 de un 10). Todo sale de la guía.
// ============================================================================

export const OPEN = [
  // ------------------------------- MUNDO 1 --------------------------------
  {
    id: 'o1_1',
    world: 'w1',
    type: 'open',
    q: 'Explicame por qué el reclutamiento hoy es considerado un imperativo estratégico.',
    model:
      'Porque dejó de ser reactivo (antes se buscaba a alguien solo al aparecer una vacante) y pasó a ser un proceso continuo que fortalece la reserva de talentos y genera ventaja competitiva. No es solo atraer gente: también es entender qué quieren los empleados para posicionar a la empresa como "empleador de elección", comunicando su propuesta de valor a través de la marca empleadora.',
    keyConcepts: [
      { label: 'Antes era reactivo (solo al aparecer la vacante)', keywords: ['reactiv', 'vacante'], weight: 1 },
      { label: 'Hoy es un proceso continuo', keywords: ['continu', 'proceso'], weight: 1 },
      { label: 'Fortalece la reserva de talentos', keywords: ['reserva', 'talento', 'banco de talento'], weight: 1 },
      { label: 'Empleador de elección / marca empleadora', keywords: ['empleador de eleccion', 'marca empleadora', 'employer'], weight: 1 },
    ],
    strategy:
      'Conecta con la estrategia porque la reserva de talentos da VENTAJA COMPETITIVA: tener a la gente correcta lista antes de necesitarla sostiene la estrategia del negocio.',
    strategyKeywords: ['ventaja competitiva', 'estrateg', 'negocio'],
    example:
      'Una empresa que mantiene una base de candidatos activa todo el año, aunque no tenga vacantes abiertas.',
  },
  {
    id: 'o1_2',
    world: 'w1',
    type: 'open',
    q: '¿Cuál es el objetivo de la selección y qué costos genera un error? Dame un ejemplo.',
    model:
      'El objetivo de la selección es elegir a las personas con las calificaciones adecuadas: maximizar los aciertos y evitar los errores. Un error de selección genera tres tipos de costos: directos (gastos del proceso ya incurridos), indirectos (entrenar a alguien que no rinde) y de oportunidad (la persona que habría tenido éxito y no fue contratada).',
    keyConcepts: [
      { label: 'Objetivo: maximizar aciertos / evitar errores', keywords: ['maximizar', 'acierto', 'evitar error', 'calificaciones adecuadas'], weight: 1 },
      { label: 'Costos directos (gastos del proceso)', keywords: ['direct'], weight: 1 },
      { label: 'Costos indirectos (entrenar a quien no rinde)', keywords: ['indirect'], weight: 1 },
      { label: 'Costo de oportunidad (el bueno que no contrataste)', keywords: ['oportunidad'], weight: 1 },
    ],
    strategy:
      'Para un 10: aclarar que la decisión final la toma el gerente de línea, no RRHH, porque es quien integrará a la persona a su equipo.',
    strategyKeywords: ['gerente de linea', 'gerente', 'linea'],
    example:
      'Contratás a alguien que no rinde: pagaste el proceso (directo), lo capacitaste sin resultado (indirecto) y dejaste pasar al buen candidato (oportunidad).',
  },
  {
    id: 'o1_3',
    world: 'w1',
    type: 'open',
    q: 'Compará el reclutamiento interno con el externo y decí cuándo conviene cada fuente.',
    model:
      'El reclutamiento interno usa candidatos que ya están en la empresa: están disponibles rápido, se conoce su desempeño y se actualizan más rápido; su herramienta típica es el job posting (publicación interna de vacantes). El externo busca afuera y elige la fuente según el puesto: universidades y redes para jóvenes profesionales y pasantías, agencias de personal eventual para tareas temporarias, sindicatos y bolsas para puestos operativos, ferias para difundir marca, y referidos por empleados (muy efectivos, con premios monetarios).',
    keyConcepts: [
      { label: 'Interno: disponible, se conoce el desempeño, rápido', keywords: ['intern', 'disponib', 'conoce', 'desempeno'], weight: 1 },
      { label: 'Interno: herramienta job posting', keywords: ['job posting', 'publicacion interna', 'intranet'], weight: 1 },
      { label: 'Externo: fuentes según el puesto', keywords: ['extern', 'fuente', 'segun el puesto'], weight: 1 },
      { label: 'Ejemplos de fuentes (universidades, agencias, referidos...)', keywords: ['universidad', 'agencia', 'referido', 'sindicato', 'feria', 'bolsa'], weight: 1 },
    ],
    strategy:
      'Para un 10: mencionar las señales de un banco de talento interno débil (demora en cubrir puestos clave, vacantes que solo se llenan desde afuera, reemplazos que fracasan, promociones por favoritismo).',
    strategyKeywords: ['banco de talento', 'debil', 'favoritismo', 'nepotismo'],
    example:
      'Para un puesto operativo conviene una bolsa de empleo o un sindicato; para un futuro analista joven, la universidad.',
  },

  // ------------------------------- MUNDO 2 --------------------------------
  {
    id: 'o2_1',
    world: 'w2',
    type: 'open',
    q: 'Diferenciá capacitación de desarrollo y explicá las 4 etapas del proceso de capacitación.',
    model:
      'La capacitación prepara para roles presentes o de corto plazo, mientras que el desarrollo prepara para roles futuros más complejos. El proceso de capacitación es un ciclo de 4 etapas: 1) evaluación de necesidades (DNC), que releva planes de negocio, proyectos, cambios y necesidades de las personas y de la organización; 2) diseño (objetivos y dinámicas); 3) implementación (en el puesto, fuera del puesto o desarrollo gerencial); y 4) evaluación, que retroalimenta todo el ciclo.',
    keyConcepts: [
      { label: 'Capacitación = presente; Desarrollo = futuro más complejo', keywords: ['present', 'corto plazo', 'futur', 'complej'], weight: 1 },
      { label: 'Evaluación de necesidades (DNC)', keywords: ['necesidad', 'dnc'], weight: 1 },
      { label: 'Diseño', keywords: ['diseno'], weight: 1 },
      { label: 'Implementación', keywords: ['implementacion', 'implementar'], weight: 1 },
      { label: 'Evaluación (retroalimenta el ciclo)', keywords: ['evaluacion', 'retroaliment', 'ciclo'], weight: 1 },
    ],
    strategy:
      'Para un 10: aclarar que la DNC atiende necesidades de las PERSONAS y de la ORGANIZACIÓN a la vez, y que como es costosa hay que medir su efectividad para que contribuya a las metas.',
    strategyKeywords: ['organizacion', 'metas', 'efectividad', 'costos'],
    example:
      'Detectás (DNC) que el equipo no domina un sistema nuevo, diseñás el curso, lo implementás y evaluás si lo aplican.',
  },
  {
    id: 'o2_2',
    world: 'w2',
    type: 'open',
    q: 'Explicá el modelo de Kirkpatrick y qué mide cada nivel.',
    model:
      'Es el modelo de evaluación de la capacitación en 4 niveles: reacción (satisfacción del empleado), aprendizaje (asimilación de saberes), transferencia (aplicación al trabajo cotidiano) y resultados (impacto en el negocio). Es la cuarta etapa del proceso y retroalimenta todo el ciclo.',
    keyConcepts: [
      { label: 'Reacción (satisfacción)', keywords: ['reaccion', 'satisfaccion'], weight: 1 },
      { label: 'Aprendizaje (asimilación de saberes)', keywords: ['aprendizaje', 'asimila', 'saberes'], weight: 1 },
      { label: 'Transferencia (aplicación al trabajo)', keywords: ['transferencia', 'aplicacion', 'aplica'], weight: 1 },
      { label: 'Resultados (impacto en el negocio)', keywords: ['resultado', 'impacto', 'negocio'], weight: 1 },
    ],
    strategy:
      'Para un 10: marcar que los niveles van de menor a mayor valor para el negocio, y que "resultados" es el que demuestra el impacto real (lo que justifica el gasto).',
    strategyKeywords: ['impacto', 'negocio', 'valor'],
    example:
      'La transferencia se ve cuando el vendedor realmente aplica en sus ventas lo que aprendió en el curso.',
  },

  // ------------------------------- MUNDO 3 --------------------------------
  {
    id: 'o3_1',
    world: 'w3',
    type: 'open',
    q: 'Diferenciá gestión del desempeño de evaluación del desempeño y nombrá los métodos de evaluación.',
    model:
      'La gestión del desempeño es el proceso global de crear un ambiente donde las personas se desempeñen al máximo. La evaluación del desempeño es la actividad puntual dentro de ese proceso, donde el gerente compara el desempeño con los requerimientos del puesto y muestra dónde mejorar. Hay dos métodos: la Administración por Objetivos (MBO), propuesta por Peter Drucker en 1954, donde el empleado fija objetivos asesorado por su supervisor y se miden con un tablero; y la evaluación por competencias, que define un modelo de competencias y unifica las expectativas de comportamiento entre áreas.',
    keyConcepts: [
      { label: 'Gestión = proceso global (ambiente para rendir al máximo)', keywords: ['gestion', 'proceso', 'ambiente', 'maximo'], weight: 1 },
      { label: 'Evaluación = medición puntual vs. requerimientos del puesto', keywords: ['evaluacion', 'puntual', 'compara', 'requerimiento'], weight: 1 },
      { label: 'MBO (Drucker, 1954)', keywords: ['mbo', 'objetivos', 'drucker', '1954'], weight: 1 },
      { label: 'Evaluación por competencias', keywords: ['competencia'], weight: 1 },
    ],
    strategy:
      'Para un 10: cerrar diciendo que los objetivos de desempeño conectan la estrategia con la misión del puesto, y que toda evaluación termina con un plan de acción consensuado.',
    strategyKeywords: ['estrateg', 'mision del puesto', 'plan de accion', 'consensuad'],
    example:
      'La gestión es acompañar todo el año; la evaluación es la reunión donde se mide el resultado con un tablero (MBO).',
  },
  {
    id: 'o3_2',
    world: 'w3',
    type: 'open',
    q: '¿Cómo se da una buena retroalimentación? ¿Cuáles son los 3 factores del desempeño?',
    model:
      'La retroalimentación debe darse con ejemplos de conductas esperadas y a mejorar, enfocándose en lo realizado y no en la persona ("el hacer, no el ser"), enfatizando lo que está bajo el control del empleado y manteniendo una comunicación activa; no se discute la forma de ser ni los valores, sino qué logró hacer. El desempeño depende de tres factores: capacidad, motivación y ambiente.',
    keyConcepts: [
      { label: 'El hacer, no el ser', keywords: ['el hacer', 'no el ser', 'realizado', 'no en la persona'], weight: 1 },
      { label: 'Sobre lo que está bajo control del empleado', keywords: ['control', 'controlable'], weight: 1 },
      { label: 'Con ejemplos y comunicación activa', keywords: ['ejemplo', 'comunicacion activa', 'comunicacion'], weight: 1 },
      { label: '3 factores: capacidad, motivación y ambiente', keywords: ['capacidad', 'motivacion', 'ambiente'], weight: 1 },
    ],
    strategy:
      'Para un 10: aclarar que toda evaluación debe terminar con un plan de acción consensuado entre supervisor y empleado.',
    strategyKeywords: ['plan de accion', 'consensuad', 'supervisor'],
    example:
      'Decir "este informe llegó tarde y con 3 errores" (el hacer) en vez de "sos descuidado" (el ser).',
  },

  // ------------------------------- MUNDO 4 --------------------------------
  {
    id: 'o4_1',
    world: 'w4',
    type: 'open',
    q: 'Explicá los tres componentes de la compensación y por qué la compensación es estratégica.',
    model:
      'La compensación tiene tres componentes (Snell & Bohlander): la directa (sueldos fijos, incentivos, bonos, comisiones), la indirecta (los beneficios al empleado) y la no monetaria (reconocimiento, trabajo gratificante, ambiente, flexibilidad horaria y trabajo remoto). Es estratégica porque las prácticas de pago y beneficios son una herramienta de comunicación: transmiten qué valora la empresa. Además están ligadas a los medios de vida, por lo que exigen especial cuidado en contextos de crisis e inflación.',
    keyConcepts: [
      { label: 'Directa (sueldos, bonos, comisiones)', keywords: ['direct'], weight: 1 },
      { label: 'Indirecta (beneficios)', keywords: ['indirect', 'beneficio'], weight: 1 },
      { label: 'No monetaria (reconocimiento, ambiente, flexibilidad)', keywords: ['no monetaria', 'reconocimiento', 'flexibilidad'], weight: 1 },
      { label: 'Es herramienta de comunicación (transmite qué valora la empresa)', keywords: ['comunicacion', 'valora', 'transmite'], weight: 1 },
    ],
    strategy:
      'Para un 10: mencionar que están ligadas a los medios de vida y por eso requieren cuidado en crisis e inflación (muy relevante en Argentina), y que deben alinearse con los objetivos de la organización.',
    strategyKeywords: ['inflacion', 'crisis', 'medios de vida', 'objetivos', 'alinea'],
    example:
      'Sueldo (directa) + obra social (indirecta) + reconocimiento y home office (no monetaria).',
  },
  {
    id: 'o4_2',
    world: 'w4',
    type: 'open',
    q: 'Compará remuneración fija y variable según Chiavenato: pros y contras de cada una.',
    model:
      'La remuneración fija es estable, facilita el equilibrio interno y externo y estandariza los salarios, pero no motiva (funciona solo como factor higiénico) y no incentiva a tomar riesgos. La remuneración variable se adecúa a las diferencias individuales, premia el desempeño excepcional y no afecta los costos fijos, aunque rompe la igualdad de ganancias y puede generar quejas y presión sindical. El bono anual es un ejemplo de remuneración variable.',
    keyConcepts: [
      { label: 'Fija: estable y estandariza salarios', keywords: ['fija', 'estable', 'estandariza', 'equilibrio'], weight: 1 },
      { label: 'Fija: no motiva (factor higiénico)', keywords: ['no motiva', 'higienic'], weight: 1 },
      { label: 'Variable: premia el desempeño excepcional, no afecta costos fijos', keywords: ['variable', 'excepcional', 'costos fijos', 'diferencias individuales'], weight: 1 },
      { label: 'Variable contras: rompe igualdad, quejas/presión sindical', keywords: ['rompe', 'igualdad', 'queja', 'sindical'], weight: 1 },
    ],
    strategy:
      'Para un 10: aclarar que la variable requiere administración cuidadosa, objetivos e indicadores y alineación con la estrategia; y que si es grupal fomenta el trabajo en equipo.',
    strategyKeywords: ['indicador', 'estrateg', 'grupal', 'equipo'],
    example:
      'Sueldo base igual para todos (fija) vs. bono de fin de año que solo cobra quien se destacó (variable).',
  },
  {
    id: 'o4_3',
    world: 'w4',
    type: 'open',
    q: 'Diferenciá prestaciones legales de espontáneas y dame ejemplos de cada una (Chiavenato).',
    model:
      'Chiavenato clasifica las prestaciones por su exigibilidad legal: las legales son obligatorias por ley (vacaciones, aguinaldo, jubilación, seguro de accidentes, licencia por maternidad) y las espontáneas o voluntarias las da la empresa porque quiere (gratificaciones, comedor, transporte, seguro de vida, préstamos). También se clasifican por naturaleza (monetarias y no monetarias) y por objetivos (asistenciales, recreativas y complementarias).',
    keyConcepts: [
      { label: 'Legales = obligatorias por ley', keywords: ['legal', 'obligator', 'ley'], weight: 1 },
      { label: 'Ejemplos legales (vacaciones, aguinaldo, jubilación...)', keywords: ['vacacion', 'aguinaldo', 'jubilacion', 'maternidad', 'accidente'], weight: 1 },
      { label: 'Espontáneas = voluntarias', keywords: ['espontane', 'voluntar'], weight: 1 },
      { label: 'Ejemplos espontáneas (comedor, transporte, préstamos...)', keywords: ['comedor', 'transporte', 'prestamo', 'seguro de vida', 'gratificacion'], weight: 1 },
    ],
    strategy:
      'Para un 10: mencionar los beneficios "modernos" (trabajo remoto, horarios flexibles), alineados a las nuevas generaciones.',
    strategyKeywords: ['remoto', 'flexible', 'nuevas generaciones', 'moderno'],
    example:
      'El aguinaldo es legal (obligatorio); el comedor gratis es espontáneo (voluntario).',
  },

  // ------------------------------- MUNDO 5 --------------------------------
  {
    id: 'o5_1',
    world: 'w5',
    type: 'open',
    q: '¿Qué es el contrato psicológico y por qué es clave para las relaciones laborales?',
    model:
      'El contrato psicológico son las expectativas de un intercambio justo de obligaciones entre empleado y empleador: el empleado espera compensación justa, estabilidad, capacitación y promociones; el empleador espera desempeño y cumplimiento de procedimientos. Fortalecerlo es clave porque lleva a relaciones armónicas. Mondy agrega el contrato social, que abarca las reglas escritas y no escritas entre la organización y la sociedad, el gobierno, otras organizaciones y las personas.',
    keyConcepts: [
      { label: 'Expectativas de intercambio justo entre empleado y empleador', keywords: ['expectativa', 'intercambio', 'empleado', 'empleador'], weight: 1 },
      { label: 'El empleado espera (compensación justa, estabilidad, capacitación)', keywords: ['compensacion justa', 'estabilidad', 'capacitacion', 'promocion'], weight: 1 },
      { label: 'El empleador espera (desempeño y cumplimiento)', keywords: ['desempeno', 'cumplimiento'], weight: 1 },
      { label: 'Fortalecerlo = relaciones armónicas', keywords: ['armonic', 'fortalec'], weight: 1 },
    ],
    strategy:
      'Para un 10: diferenciarlo del contrato social de Mondy (organización con la sociedad, el gobierno y otras organizaciones), que es más amplio.',
    strategyKeywords: ['contrato social', 'mondy', 'sociedad', 'gobierno'],
    example:
      'Vos esperás que te capaciten y asciendan; la empresa espera que rindas y cumplas, aunque nada se firmó.',
  },
  {
    id: 'o5_2',
    world: 'w5',
    type: 'open',
    q: 'La disciplina laboral, ¿es castigo? Explicá qué es y qué problemas de disciplina existen.',
    model:
      'No, la disciplina laboral no es castigo: es la definición de estándares aceptables de conducta y desempeño. Los problemas comunes son de asistencia (inasistencias injustificadas), de deshonestidad (robos, falsificación), de desempeño (incumplir asignaciones o estándares de calidad) y de comportamiento (bullying, violencia, consumo de alcohol o drogas, acoso, portación de armas).',
    keyConcepts: [
      { label: 'NO es castigo: define estándares aceptables de conducta', keywords: ['no es castigo', 'estandar', 'conducta aceptable', 'aceptable'], weight: 2 },
      { label: 'Problemas de asistencia', keywords: ['asistencia', 'inasistencia'], weight: 1 },
      { label: 'Problemas de deshonestidad', keywords: ['deshonest', 'robo', 'falsifica'], weight: 1 },
      { label: 'Problemas de desempeño y de comportamiento', keywords: ['desempeno', 'comportamiento', 'bullying', 'acoso', 'violencia'], weight: 1 },
    ],
    strategy:
      'Para un 10: conectarlo con las relaciones laborales (marco de políticas y procedimientos) y con la resolución de disputas extra-judicial (puertas abiertas, mediación).',
    strategyKeywords: ['puertas abiertas', 'mediacion', 'resolucion', 'disputa'],
    example:
      'Fijar que llegar tarde sin aviso no es aceptable es marcar el estándar, no castigar.',
  },
  {
    id: 'o5_3',
    world: 'w5',
    type: 'open',
    q: 'Hablame del estrés laboral: sus fuentes, la diferencia entre ambigüedad y conflicto de roles, y el burnout.',
    model:
      'El estrés laboral tiene tres fuentes: organizacionales (cultura corporativa, el puesto, las condiciones laborales), personales (familia, problemas económicos) y del ambiente general. Conceptos clave: la ambigüedad de roles es cuando el empleado no entiende su puesto, y el conflicto de roles es cuando debe perseguir objetivos opuestos; también está la variación de la carga de trabajo (sobrecarga o carga insuficiente). En su forma extrema el estrés deriva en burnout o desgaste, que es contagioso y debe prevenirse.',
    keyConcepts: [
      { label: 'Fuentes: organizacionales, personales y del ambiente', keywords: ['organizacional', 'personal', 'ambiente'], weight: 1 },
      { label: 'Ambigüedad de roles = no entender el puesto', keywords: ['ambiguedad', 'no entiende', 'no entender'], weight: 1 },
      { label: 'Conflicto de roles = objetivos opuestos', keywords: ['conflicto', 'opuesto'], weight: 1 },
      { label: 'Burnout = forma extrema, contagioso, prevenir', keywords: ['burnout', 'desgaste', 'contagios', 'prevenir'], weight: 1 },
    ],
    strategy:
      'Para un 10: cerrar con ambientes saludables (programas de bienestar) y ergonomía (diseño del puesto para un trabajo seguro y cómodo) como respuesta de la empresa.',
    strategyKeywords: ['bienestar', 'ergonomia', 'saludable'],
    example:
      'Ambigüedad: nadie te explicó tu tarea. Conflicto: tu jefe te pide máxima rapidez y máxima calidad a la vez.',
  },

  // ------------------------------- MUNDO 6 --------------------------------
  {
    id: 'o6_1',
    world: 'w6',
    type: 'open',
    q: 'Explicá el apalancamiento de las diferencias y por qué la diversidad es una ventaja competitiva.',
    model:
      'El apalancamiento de las diferencias (Snell & Bohlander) sigue 4 pasos: observar, comprender, valorar y apalancar la diferencia. Por lo general las diferencias tienden a negarse, neutralizarse o eliminarse, pero ninguna de esas opciones conduce a una gestión verdadera de la diversidad. La diversidad es ventaja competitiva porque una fuerza laboral diversa aporta diferencias individuales valiosas para resolver problemas, y la diversidad organizativa aporta mayor flexibilidad ante el cambio continuo. La frase clave: el verdadero apalancamiento implica ver, comprender y valorar las diferencias.',
    keyConcepts: [
      { label: '4 pasos: observar, comprender, valorar, apalancar', keywords: ['observar', 'comprender', 'valorar', 'apalancar'], weight: 2 },
      { label: 'Negar/neutralizar/eliminar NO es gestión verdadera', keywords: ['negar', 'neutralizar', 'eliminar'], weight: 1 },
      { label: 'Fuerza laboral diversa = ventaja competitiva', keywords: ['ventaja competitiva', 'fuerza laboral'], weight: 1 },
      { label: 'Diversidad organizativa = flexibilidad ante el cambio', keywords: ['flexibilidad', 'cambio'], weight: 1 },
    ],
    strategy:
      'Para un 10: mencionar que reconocer lo diverso en otros es reconocerlo en uno mismo, y que las buenas prácticas operan a nivel personal y organizacional.',
    strategyKeywords: ['uno mismo', 'personal', 'organizacional', 'inclusiv'],
    example:
      'Un equipo que ve, entiende y valora sus distintas culturas encuentra soluciones que un grupo homogéneo no vería.',
  },
  {
    id: 'o6_2',
    world: 'w6',
    type: 'open',
    q: 'Diferenciá gestión de la diversidad, acción afirmativa y clases protegidas.',
    model:
      'La gestión de la diversidad es asegurar prácticas y políticas que brinden igualdad de oportunidades y un empleo justo y no sesgado. La acción afirmativa son las acciones proactivas para revertir el impacto de discriminaciones pasadas contra grupos minoritarios (alentar la diversidad de empleo, publicar vacantes en organizaciones barriales, eliminar obstáculos innecesarios, capacitar y orientar). Las clases protegidas son los grupos amparados por las leyes de igualdad de oportunidades: minorías étnicas, mujeres, personas mayores y personas con discapacidad.',
    keyConcepts: [
      { label: 'Gestión de la diversidad = igualdad de oportunidades, empleo no sesgado', keywords: ['igualdad de oportunidades', 'no sesgad', 'justo'], weight: 1 },
      { label: 'Acción afirmativa = acciones proactivas para revertir discriminación pasada', keywords: ['accion afirmativa', 'proactiv', 'revertir', 'discriminacion'], weight: 2 },
      { label: 'Clases protegidas = grupos amparados por ley', keywords: ['clases protegidas', 'protegid', 'amparad'], weight: 1 },
      { label: 'Ejemplos clases protegidas', keywords: ['minoria', 'mujeres', 'mayores', 'discapacidad'], weight: 1 },
    ],
    strategy:
      'Para un 10: marcar que el objetivo de RRHH es que la organización sea un lugar más justo para trabajar, y que la discriminación tiene consecuencias éticas, económicas y de imagen.',
    strategyKeywords: ['etic', 'economic', 'imagen', 'justo para trabajar'],
    example:
      'Publicar vacantes en organizaciones barriales (acción afirmativa) para incluir a una clase protegida.',
  },
]
