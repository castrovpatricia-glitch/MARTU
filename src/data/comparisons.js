// ============================================================================
//  MODO COMPARACIONES ⚔️ — Diferencias típicas del oral.
//  Obliga a explicar: 1) definición de cada uno, 2) diferencia principal, 3) ejemplo.
//  Se evalúa la explicación escrita con keyConcepts (mismo evaluador que el oral).
// ============================================================================

export const COMPARISONS = [
  {
    id: 'cmp_capdes',
    world: 'w2',
    title: 'Capacitación vs. Desarrollo',
    left: {
      name: 'Capacitación',
      def: 'Prepara para roles presentes o de corto plazo.',
    },
    right: {
      name: 'Desarrollo',
      def: 'Prepara para roles futuros más complejos.',
    },
    difference: 'El eje temporal: presente/corto plazo vs. futuro/mayor complejidad.',
    example:
      'Capacitar a un cajero en el nuevo sistema (presente) vs. desarrollar a un analista para que sea jefe en 2 años (futuro).',
    keyConcepts: [
      { label: 'Capacitación = presente / corto plazo', keywords: ['present', 'corto plazo'], weight: 1 },
      { label: 'Desarrollo = futuro / más complejo', keywords: ['futur', 'complej'], weight: 1 },
      { label: 'Diferencia: presente vs. futuro', keywords: ['presente vs', 'futuro', 'temporal'], weight: 1 },
    ],
  },
  {
    id: 'cmp_gesteval',
    world: 'w3',
    title: 'Gestión del desempeño vs. Evaluación del desempeño',
    left: {
      name: 'Gestión del desempeño',
      def: 'Proceso global de crear un ambiente donde las personas se desempeñen al máximo.',
    },
    right: {
      name: 'Evaluación del desempeño',
      def: 'Actividad puntual dentro de ese proceso: el gerente compara el desempeño con los requerimientos del puesto.',
    },
    difference: 'La gestión es el proceso global; la evaluación es la medición puntual dentro de él.',
    example: 'La gestión es la película de todo el año; la evaluación es una foto puntual.',
    keyConcepts: [
      { label: 'Gestión = proceso global', keywords: ['gestion', 'global', 'proceso', 'ambiente'], weight: 1 },
      { label: 'Evaluación = medición puntual', keywords: ['evaluacion', 'puntual', 'compara', 'requerimiento'], weight: 1 },
      { label: 'Diferencia: proceso global vs. medición dentro de él', keywords: ['dentro', 'parte de'], weight: 1 },
    ],
  },
  {
    id: 'cmp_intext',
    world: 'w1',
    title: 'Reclutamiento interno vs. externo',
    left: {
      name: 'Reclutamiento interno',
      def: 'Candidatos que ya están en la empresa: disponibles, se conoce su desempeño, rápidos. Herramienta: job posting.',
    },
    right: {
      name: 'Reclutamiento externo',
      def: 'Candidatos de afuera; la fuente se elige según el puesto (universidades, agencias, sindicatos, ferias, referidos).',
    },
    difference: 'Adentro vs. afuera de la empresa: disponibilidad y conocimiento previo vs. fuentes según el tipo de puesto.',
    example: 'Job posting interno para un ascenso (interno) vs. buscar pasantes en la universidad (externo).',
    keyConcepts: [
      { label: 'Interno: ya están, se conoce su desempeño (job posting)', keywords: ['intern', 'job posting', 'conoce', 'disponib'], weight: 1 },
      { label: 'Externo: de afuera, fuentes según el puesto', keywords: ['extern', 'afuera', 'fuente', 'universidad', 'agencia'], weight: 1 },
      { label: 'Diferencia: adentro vs. afuera', keywords: ['adentro', 'afuera', 'dentro'], weight: 1 },
    ],
  },
  {
    id: 'cmp_fijavar',
    world: 'w4',
    title: 'Remuneración fija vs. variable',
    left: {
      name: 'Remuneración fija',
      def: 'Estable, facilita el equilibrio interno/externo y estandariza salarios; pero no motiva (factor higiénico).',
    },
    right: {
      name: 'Remuneración variable',
      def: 'Se adecúa a las diferencias individuales, premia el desempeño excepcional y no afecta costos fijos; pero rompe la igualdad y puede generar quejas/presión sindical.',
    },
    difference: 'Estabilidad sin motivación vs. premio al desempeño con más riesgo de conflicto.',
    example: 'Sueldo base igual para todos (fija) vs. bono anual solo para el que se destacó (variable).',
    keyConcepts: [
      { label: 'Fija: estable, estandariza, no motiva (higiénico)', keywords: ['fija', 'estable', 'no motiva', 'higienic'], weight: 1 },
      { label: 'Variable: premia desempeño excepcional, no afecta costos fijos', keywords: ['variable', 'excepcional', 'costos fijos'], weight: 1 },
      { label: 'Variable contra: rompe igualdad / presión sindical', keywords: ['igualdad', 'sindical', 'queja'], weight: 1 },
    ],
  },
  {
    id: 'cmp_meritovar',
    world: 'w4',
    title: 'Pago por mérito vs. Remuneración variable',
    left: {
      name: 'Pago por mérito / desempeño',
      def: 'Vincula la compensación a logros individuales; mejora motivación y productividad.',
    },
    right: {
      name: 'Remuneración variable',
      def: 'Ligada a resultados con objetivos e indicadores de medición; si es grupal, fomenta el trabajo en equipo.',
    },
    difference: 'El mérito premia logros individuales; la variable se ata a resultados medibles y puede ser grupal.',
    example: 'Aumento al empleado que cumplió sus objetivos (mérito) vs. bono que cobra todo el equipo por la meta común (variable grupal).',
    keyConcepts: [
      { label: 'Mérito = logros individuales', keywords: ['merito', 'individual', 'logro'], weight: 1 },
      { label: 'Variable = resultados con indicadores, puede ser grupal', keywords: ['variable', 'indicador', 'resultado', 'grupal'], weight: 1 },
      { label: 'Diferencia: individual vs. resultados/grupal', keywords: ['grupal', 'equipo', 'individual'], weight: 1 },
    ],
  },
  {
    id: 'cmp_roles',
    world: 'w5',
    title: 'Ambigüedad de roles vs. Conflicto de roles',
    left: {
      name: 'Ambigüedad de roles',
      def: 'El empleado no entiende su puesto.',
    },
    right: {
      name: 'Conflicto de roles',
      def: 'El empleado debe perseguir objetivos opuestos.',
    },
    difference: 'No entender el puesto vs. tener que perseguir objetivos opuestos. Ambas son fuentes de estrés laboral.',
    example: 'Ambigüedad: nadie te explicó tu tarea. Conflicto: te piden rapidez y calidad máxima a la vez.',
    keyConcepts: [
      { label: 'Ambigüedad = no entiende el puesto', keywords: ['ambiguedad', 'no entiende', 'no entender'], weight: 1 },
      { label: 'Conflicto = objetivos opuestos', keywords: ['conflicto', 'opuesto'], weight: 1 },
      { label: 'Ambas son fuentes de estrés', keywords: ['estres'], weight: 1 },
    ],
  },
  {
    id: 'cmp_diversidad',
    world: 'w6',
    title: 'Gestión de la diversidad vs. Acción afirmativa',
    left: {
      name: 'Gestión de la diversidad',
      def: 'Asegurar prácticas y políticas de igualdad de oportunidades y un empleo justo y no sesgado.',
    },
    right: {
      name: 'Acción afirmativa',
      def: 'Acciones proactivas para revertir el impacto de discriminaciones pasadas contra grupos minoritarios.',
    },
    difference:
      'La gestión de la diversidad es el marco general de igualdad; la acción afirmativa son medidas activas y reparadoras hacia minorías (publicar vacantes en barrios, eliminar obstáculos, capacitar).',
    example:
      'Tener procesos sin sesgos es gestión de la diversidad; publicar vacantes en organizaciones barriales para incluir minorías es acción afirmativa.',
    keyConcepts: [
      { label: 'Diversidad = igualdad de oportunidades, empleo no sesgado', keywords: ['igualdad de oportunidades', 'no sesgad', 'justo'], weight: 1 },
      { label: 'Acción afirmativa = proactiva, revierte discriminación pasada', keywords: ['proactiv', 'revertir', 'discriminacion', 'minoria'], weight: 1 },
      { label: 'Diferencia: marco general vs. medidas reparadoras', keywords: ['reparad', 'activ', 'general'], weight: 1 },
    ],
  },
  {
    id: 'cmp_prestaciones',
    world: 'w4',
    title: 'Prestaciones legales vs. espontáneas',
    left: {
      name: 'Prestaciones legales',
      def: 'Obligatorias por ley: vacaciones, aguinaldo, jubilación, seguro de accidentes, maternidad.',
    },
    right: {
      name: 'Prestaciones espontáneas',
      def: 'Voluntarias, las da la empresa porque quiere: gratificaciones, comedor, transporte, seguro de vida, préstamos.',
    },
    difference: 'Obligatorias por ley vs. voluntarias de la empresa.',
    example: 'El aguinaldo es legal (obligatorio); el comedor gratis es espontáneo (voluntario).',
    keyConcepts: [
      { label: 'Legales = obligatorias por ley', keywords: ['legal', 'obligator', 'ley'], weight: 1 },
      { label: 'Espontáneas = voluntarias', keywords: ['espontane', 'voluntar'], weight: 1 },
      { label: 'Ejemplos correctos de cada una', keywords: ['aguinaldo', 'vacacion', 'comedor', 'transporte'], weight: 1 },
    ],
  },
]
