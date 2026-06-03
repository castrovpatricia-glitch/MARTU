// ============================================================================
//  CONTENIDO DE ENSEÑANZA — "Aprendamos juntos"
//  Para CADA concepto del PDF se agrega:
//   - layers: [Capa 1 "entendé la idea", Capa 2 "palabras profesionales",
//              Capa 3 "hablalo como alguien de RRHH"]
//   - analogy: explicación distinta (analogía / ejemplo cotidiano)
//   - connections: cómo se relaciona con otros temas de RRHH
//  (la explicación fácil, la definición formal y el ejemplo ya viven en
//   worlds.js como simple/definition/example). Todo fiel a la guía.
// ============================================================================

export const LESSONS = {
  // ------------------------------- MÓDULO 6 -------------------------------
  c6_imperativo: {
    layers: [
      'Reclutar es conseguir a las personas adecuadas para la empresa.',
      'Antes era reactivo (se buscaba solo al aparecer una vacante); hoy es un proceso continuo.',
      'El reclutamiento es un imperativo estratégico: al ser continuo, fortalece la reserva de talentos y da ventaja competitiva, posicionando a la empresa como “empleador de elección”.',
    ],
    analogy:
      'Es como un equipo de fútbol que sigue a buenos jugadores todo el año: así no queda a las corridas cuando alguien se lesiona o se va.',
    connections: [
      'Marca empleadora: en cada búsqueda se comunica la propuesta de valor.',
      'Selección (M6): después de atraer, hay que elegir bien.',
      'Estrategia del negocio: la reserva de talento es ventaja competitiva.',
    ],
  },
  c6_marca: {
    layers: [
      'Es la fama de la empresa como lugar para trabajar.',
      'Es la propuesta de valor que la empresa comunica en cada reclutamiento.',
      'La marca empleadora debe ser coherente con los valores de la firma y estar alineada en todos los mercados, para volverse “empleador de elección”.',
    ],
    analogy:
      'Como una marca de zapatillas: no vende solo el producto, vende una imagen que te dan ganas de tener.',
    connections: [
      'Reclutamiento estratégico: se comunica en cada búsqueda.',
      'Valores de la empresa: debe ser coherente con ellos.',
      'Atracción de talento: ayuda a captar mejores candidatos.',
    ],
  },
  c6_interno: {
    layers: [
      'Es cubrir un puesto con alguien que ya trabaja en la empresa.',
      'Ventajas: disponibilidad, se conoce el desempeño y se actualizan rápido; su herramienta es el job posting.',
      'El reclutamiento interno aprovecha el banco de talento propio; sus señales de debilidad: demoras, vacantes que solo se llenan de afuera o promociones por favoritismo.',
    ],
    analogy:
      'Como ascender a capitán a un jugador del propio plantel: ya lo conocés y está listo enseguida.',
    connections: [
      'Reclutamiento externo: la otra fuente posible.',
      'Planes de sucesión (M7): nutren el banco interno.',
      'Desarrollo (M7): prepara a la gente para ascender.',
    ],
  },
  c6_externo: {
    layers: [
      'Es buscar personas fuera de la empresa.',
      'La fuente se elige según el puesto: universidades, agencias, sindicatos, ferias, referidos.',
      'El reclutamiento externo elige la fuente según el tipo de puesto; los referidos son muy efectivos y suelen tener premios monetarios.',
    ],
    analogy:
      'Como buscar un plomero: para algo urgente usás una app, para algo fino pedís la recomendación de un conocido.',
    connections: [
      'Reclutamiento interno: la alternativa de adentro.',
      'Marca empleadora: las ferias difunden la marca.',
      'Selección: las fuentes alimentan el proceso de elección.',
    ],
  },
  c6_seleccion: {
    layers: [
      'Es elegir, entre los candidatos, a la persona que mejor encaja.',
      'Su objetivo es maximizar aciertos y evitar errores, eligiendo a quien tiene las calificaciones adecuadas.',
      'La selección busca maximizar aciertos y evitar errores; un error genera costos directos, indirectos y de oportunidad.',
    ],
    analogy: 'Como un casting: de muchos, te quedás con el que mejor hace el papel.',
    connections: [
      'Costos de un error: lo que se pierde si elegís mal.',
      'Herramientas de evaluación: cómo se elige.',
      'Decisión del gerente de línea: quién decide.',
    ],
  },
  c6_costos: {
    layers: [
      'Elegir mal a alguien sale caro.',
      'Hay tres costos: directos (el proceso), indirectos (entrenar a quien no rinde) y de oportunidad (el bueno que dejaste pasar).',
      'Un error de selección genera costos directos, indirectos y de oportunidad; por eso la selección busca maximizar aciertos.',
    ],
    analogy:
      'Como comprar un celu malo: pagaste el celu (directo), gastaste arreglándolo (indirecto) y te perdiste el bueno que no compraste (oportunidad).',
    connections: [
      'Selección: estos costos justifican elegir bien.',
      'Capacitación (M7): entrenar a quien no rinde es el costo indirecto.',
    ],
  },
  c6_pasos: {
    layers: [
      'La selección sigue pasos en orden.',
      'Va de relevar el perfil a la inducción, definiendo estrategia, evaluando e integrando información.',
      'Los pasos: perfil → estrategia → instancias de evaluación → integrar información → decisión del gerente de línea → exámenes pre-ocupacionales → inducción.',
    ],
    analogy: 'Como una receta: si te salteás un paso, el plato sale mal.',
    connections: [
      'Decisión del gerente de línea: paso clave.',
      'Inducción: el último paso, da la bienvenida.',
      'Análisis de puestos: define el perfil del inicio.',
    ],
  },
  c6_herramientas: {
    layers: [
      'Son las formas de conocer al candidato.',
      'La entrevista es la central; se suman pruebas técnicas y referencias laborales al final.',
      'La entrevista (telefónica, individual, grupal o video) es la herramienta central, complementada con pruebas técnicas y, como instancia final, las referencias laborales.',
    ],
    analogy:
      'Como conocer a alguien antes de salir: charlás (entrevista), ves cómo se maneja (prueba) y preguntás a sus amigos (referencias).',
    connections: [
      'Selección: estas herramientas la hacen posible.',
      'Pasos del proceso: definen las instancias de evaluación.',
    ],
  },
  c6_decision: {
    layers: [
      'Quien decide a quién contratar no es RRHH.',
      'La decisión final la toma el gerente de línea, con soporte de RRHH.',
      'El gerente de línea toma la decisión final porque es quien integrará a la persona a su equipo; RRHH da soporte.',
    ],
    analogy:
      'Como elegir compañero de proyecto: decide el que va a trabajar con vos, no un tercero.',
    connections: [
      'Selección: cierra con esta decisión.',
      'Pasos del proceso: la decisión es uno de ellos.',
      'Gestión del desempeño (M8): el mismo gerente luego lo evalúa.',
    ],
  },

  // ------------------------------- MÓDULO 7 -------------------------------
  c7_capvsdes: {
    layers: [
      'Es enseñar a la gente a hacer mejor su trabajo.',
      'Capacitación = presente / corto plazo; desarrollo = futuro más complejo.',
      'La capacitación prepara para roles presentes o de corto plazo y el desarrollo para roles futuros más complejos.',
    ],
    analogy:
      'Capacitación es aprender a usar la caja registradora de hoy; desarrollo es prepararte para ser gerente mañana.',
    connections: [
      'Proceso de capacitación: cómo se lleva a cabo.',
      'Desarrollo gerencial: prepara para el futuro.',
      'Planes de sucesión: parte del desarrollo.',
    ],
  },
  c7_proceso: {
    layers: [
      'Capacitar sigue un ciclo de pasos.',
      'Cuatro etapas: detectar necesidades (DNC), diseñar, implementar y evaluar.',
      'El proceso es un ciclo: DNC → diseño → implementación → evaluación, que retroalimenta todo.',
    ],
    analogy:
      'Como entrenar para una carrera: ves qué te falta, armás el plan, entrenás y medís si mejoraste.',
    connections: [
      'DNC: la primera etapa.',
      'Modelo Kirkpatrick: cómo se evalúa.',
      'Metas de la organización: la capacitación debe aportarles.',
    ],
  },
  c7_kirkpatrick: {
    layers: [
      'Es medir si la capacitación sirvió.',
      'Cuatro niveles: reacción, aprendizaje, transferencia y resultados.',
      'Kirkpatrick mide en 4 niveles: reacción (satisfacción) → aprendizaje (saberes) → transferencia (aplicación al trabajo) → resultados (impacto en el negocio).',
    ],
    analogy:
      'Como un curso de cocina: ¿te gustó?, ¿aprendiste?, ¿cocinás en casa?, ¿mejoró tu comida?',
    connections: [
      'Proceso de capacitación: es su 4ª etapa.',
      'Efectividad: justifica el gasto.',
      'Resultados → negocio: conecta con la estrategia.',
    ],
  },
  c7_competencias: {
    layers: [
      'Una competencia mezcla saber, saber hacer y actitud.',
      'Competencia = conocimientos + habilidades + actitudes, entrenada con casos reales.',
      'La capacitación por competencias parte de situaciones-problema reales y usa métodos activos: casos, simulaciones, discusiones, juegos.',
    ],
    analogy:
      'Como aprender a manejar: teoría (conocimiento), práctica (habilidad) y mantener la calma (actitud).',
    connections: [
      'Evaluación por competencias (M8): se mide con la misma lógica.',
      'Capacitación en el puesto: una forma de entrenarlas.',
    ],
  },
  c7_enelpuesto: {
    layers: [
      'Es aprender haciendo, al lado de alguien que sabe.',
      'Da experiencia práctica con el supervisor o un experto; ideal para lo técnico.',
      'La capacitación en el puesto brinda experiencia práctica con un referente experto y es muy eficaz para competencias técnicas.',
    ],
    analogy: 'Como aprender a cocinar al lado de un chef, cocinando de verdad.',
    connections: [
      'Competencias: entrena las técnicas.',
      'Desarrollo gerencial: otra forma de capacitar.',
    ],
  },
  c7_gerencial: {
    layers: [
      'Es preparar a los futuros jefes.',
      'Usa rotación, coaching, proyectos y universidades corporativas, para pocas personas.',
      'El desarrollo gerencial usa actividades focalizadas (rotación, coaching, proyectos, becas) y gana relevancia por la escasez de talento gerencial.',
    ],
    analogy:
      'Como las inferiores de un club: preparás de a pocos a los próximos cracks del primer equipo.',
    connections: [
      'Capacitación vs desarrollo: es desarrollo puro.',
      'Planes de sucesión: a quién preparar.',
      'Rol de RRHH: lo coordina.',
    ],
  },
  c7_rolrrhh: {
    layers: [
      'RRHH ayuda a que cada uno crezca.',
      'Alinea lo individual con lo de la empresa y lleva inventarios de talento y planes de sucesión.',
      'RRHH alinea necesidades individuales y organizacionales, identifica oportunidades y calibra el potencial con inventarios de talento y planes de sucesión.',
    ],
    analogy:
      'Como un DT que sabe quién puede subir de categoría y quién reemplaza a quién.',
    connections: [
      'Desarrollo gerencial: lo implementa.',
      'Reclutamiento interno: nutre el banco de talento.',
      'Gestión del desempeño (M8): detecta el potencial.',
    ],
  },
  c7_efectividad: {
    layers: [
      'Capacitar cuesta, así que hay que medir si sirvió.',
      'Como es costosa, se mide su efectividad y se monitorea.',
      'La capacitación y el desarrollo son costosos: deben medirse y contribuir a las metas organizacionales.',
    ],
    analogy: 'Como pagar un curso caro: querés ver el resultado, no tirar la plata.',
    connections: [
      'Modelo Kirkpatrick: la herramienta para medir.',
      'Estrategia del negocio: debe aportar a las metas.',
    ],
  },

  // ------------------------------- MÓDULO 8 -------------------------------
  c8_gestvseval: {
    layers: [
      'Es lograr que la gente rinda bien, y medirlo.',
      'Gestión = todo el proceso; evaluación = la medición puntual dentro de él.',
      'La gestión del desempeño crea un ambiente para rendir al máximo; la evaluación es la actividad que compara el desempeño con los requerimientos del puesto.',
    ],
    analogy: 'La gestión es la película de todo el año; la evaluación, una foto.',
    connections: [
      'Pasos del proceso: cómo se hace.',
      'Retroalimentación: parte clave.',
      'Capacitación (M7): la evaluación detecta qué falta aprender.',
    ],
  },
  c8_objetivos: {
    layers: [
      '¿Para qué sirve evaluar el desempeño?',
      'Para medir logros, mejorar el comportamiento, dar feedback y detectar necesidades de capacitación.',
      'Sus objetivos: medir lo que se logra (lo que no se mide no se valora), mejorar el desempeño colectivo, dar retroalimentación e identificar necesidades de capacitación y desarrollo.',
    ],
    analogy: 'Como el boletín del cole: muestra cómo vas y en qué tenés que mejorar.',
    connections: [
      'Capacitación (M7): se alimenta de acá.',
      'Compensaciones (M9): el desempeño se recompensa.',
    ],
  },
  c8_pasos: {
    layers: [
      'Evaluar sigue pasos a lo largo del año.',
      'Fijar objetivos, dar feedback continuo, evaluar, hacer la entrevista formal y decidir.',
      'Los 5 pasos: objetivos y expectativas → retroalimentación continua → evaluación del gerente → entrevista de revisión formal → integración y toma de decisiones.',
    ],
    analogy: 'Como un año escolar: arrancás con metas y terminás con el boletín y las decisiones.',
    connections: [
      'Objetivos del proceso: el para qué.',
      'Retroalimentación: el paso 2.',
      'MBO: una forma de fijar los objetivos.',
    ],
  },
  c8_mbo: {
    layers: [
      'Es ponerse metas claras con el jefe y medirlas.',
      'El empleado fija objetivos con su supervisor y se miden con un tablero.',
      'La Administración por Objetivos (MBO), de Peter Drucker (1954), hace que el empleado fije objetivos asesorado por su supervisor, medidos con un tablero de control.',
    ],
    analogy:
      'Como ponerte objetivos en el gimnasio: primero definís la meta y después medís resultados.',
    connections: [
      'Evaluación por competencias: el otro método.',
      'Peter Drucker: su autor (1954).',
      'Estrategia: los objetivos conectan con la misión del puesto.',
    ],
  },
  c8_evalcomp: {
    layers: [
      'Es evaluar comportamientos, no solo números.',
      'Define un modelo de competencias y unifica las expectativas entre áreas.',
      'La evaluación por competencias define un modelo de competencias para la empresa y unifica las expectativas de comportamiento entre distintas áreas.',
    ],
    analogy: 'Como evaluar “compañerismo” con la misma vara en todo el colegio.',
    connections: [
      'MBO: el otro método de evaluación.',
      'Competencias (M7): mismo concepto de base.',
      'Mesas de calibración: para que sea justa.',
    ],
  },
  c8_factores: {
    layers: [
      'Rendir bien depende de tres cosas.',
      'Capacidad (poder), motivación (querer) y ambiente (que el entorno deje).',
      'El desempeño depende de capacidad, motivación y ambiente; toda evaluación cierra con un plan de acción consensuado.',
    ],
    analogy: 'Como un jugador: si no puede, no quiere o la cancha está mala, no rinde.',
    connections: [
      'Retroalimentación: ataca lo controlable.',
      'Compensaciones (M9): la motivación se trabaja con recompensas.',
      'Salud y ambiente (M10): el ambiente influye.',
    ],
  },
  c8_feedback: {
    layers: [
      'Es devolver mirando lo que hizo, no cómo es.',
      'Sobre el hacer y no el ser, con ejemplos y sobre lo controlable.',
      'La buena retroalimentación se enfoca en lo realizado (el hacer, no el ser), sobre lo controlable, con ejemplos y comunicación activa.',
    ],
    analogy: 'Como corregir un examen: marcás el error puntual, no le decís “sos un desastre”.',
    connections: [
      '3 factores del desempeño: se enfoca en lo controlable.',
      'Gestión del desempeño: es su corazón.',
      'Contrato psicológico (M10): mantiene la relación sana.',
    ],
  },
  c8_calibracion: {
    layers: [
      'Es que todos los jefes usen la misma vara.',
      'Reuniones de gerentes para que las evaluaciones sean consistentes.',
      'Las mesas de calibración son reuniones de gerentes para alinear evaluaciones y que sean consistentes; la calidad es responsabilidad compartida de RRHH y gerentes.',
    ],
    analogy: 'Como juntar a los profes para que un 8 valga lo mismo en todas las materias.',
    connections: [
      'Evaluación por competencias: la hace justa.',
      'Diversidad (M11): evita sesgos e injusticias.',
    ],
  },

  // ------------------------------- MÓDULO 9 -------------------------------
  c9_estrategica: {
    layers: [
      'Cómo paga la empresa manda un mensaje.',
      'Las prácticas de pago comunican qué valora la empresa.',
      'La compensación es estratégica: comunica qué valora la empresa y, como está ligada a los medios de vida, exige cuidado en crisis e inflación.',
    ],
    analogy: 'Como premiar en casa: si premiás ordenar, mostrás que valorás el orden.',
    connections: [
      'Componentes de la compensación: cómo se arma.',
      'Desempeño (M8): se paga por rendir.',
      'Estrategia del negocio: debe alinearse.',
    ],
  },
  c9_componentes: {
    layers: [
      'La compensación tiene tres partes.',
      'Directa (la plata), indirecta (beneficios) y no monetaria (reconocimiento, clima, flexibilidad).',
      'Snell & Bohlander: compensación directa (sueldos, bonos, comisiones), indirecta (beneficios) y no monetaria (reconocimiento, ambiente, flexibilidad).',
    ],
    analogy: 'Como un “sueldo emocional”: no todo es plata; también cuenta que te valoren y te den home office.',
    connections: [
      'Prestaciones (M9): son la parte indirecta.',
      'Compensación estratégica: las tres comunican.',
      'Snell & Bohlander: su autor.',
    ],
  },
  c9_ciclo: {
    layers: [
      'El pago se diseña y se revisa.',
      'Estrategia → mezcla de pago → herramientas → evaluación de prácticas.',
      'El alineamiento sigue un ciclo: estrategia → diseño de la mezcla → herramientas → evaluación, buscando equilibrio entre costos y expectativas.',
    ],
    analogy: 'Como armar un presupuesto: planificás, lo aplicás y revisás si funcionó.',
    connections: [
      'Mezcla de pago: el segundo paso.',
      'Compensación estratégica: arranca de la estrategia.',
    ],
  },
  c9_mezcla: {
    layers: [
      'Cuánto se paga depende de varias cosas.',
      'Factores internos (de la empresa) y externos (mercado, ley, sindicatos).',
      'La mezcla de pago se afecta por factores internos (estrategia, valor del trabajo, capacidad de pago) y externos (mercado, costo de vida, negociación colectiva, ley).',
    ],
    analogy: 'Como ponerle precio a algo: mirás lo tuyo (costos) y lo de afuera (qué cobra el mercado).',
    connections: [
      'Relaciones laborales (M10): la negociación colectiva es factor externo.',
      'Compensación estratégica: la estrategia es factor interno.',
    ],
  },
  c9_merito: {
    layers: [
      'Te pagan más si rendís más.',
      'Vincula el pago a los logros individuales y mejora la motivación.',
      'El pago por mérito vincula la compensación a los logros individuales y mejora la motivación y la productividad.',
    ],
    analogy: 'Como una propina más grande por mejor atención.',
    connections: [
      'Desempeño (M8): se mide para premiar.',
      'Remuneración variable: parecida, pero no igual.',
    ],
  },
  c9_variable: {
    layers: [
      'Parte del pago cambia según resultados.',
      'Requiere objetivos e indicadores; si es grupal, fomenta el equipo.',
      'La remuneración variable requiere administración cuidadosa, indicadores y alineación con la estrategia; si es grupal, fomenta el trabajo en equipo.',
    ],
    analogy: 'Como un bono al equipo si llegan juntos a la meta de ventas.',
    connections: [
      'Fija vs variable: la comparación clave.',
      'Bono anual: un ejemplo.',
      'Estrategia: debe alinearse.',
    ],
  },
  c9_recompensas: {
    layers: [
      'La empresa premia lo bueno y sanciona lo malo.',
      'Recompensas (incentivos) y sanciones (castigos) para reforzar conductas.',
      'Chiavenato: la organización usa recompensas y sanciones para reforzar conductas; las recompensas buscan más responsabilidad, interdependencia y creación de valor.',
    ],
    analogy: 'Como un sistema de puntos: sumás por lo bueno, restás por lo malo.',
    connections: [
      'Fija vs variable: tipos de recompensa.',
      'Disciplina (M10): las sanciones se relacionan.',
      'Chiavenato: su autor.',
    ],
  },
  c9_fijavsvar: {
    layers: [
      'Sueldo seguro vs sueldo que cambia.',
      'Fija: estable pero no motiva. Variable: premia el desempeño pero genera más conflicto.',
      'Fija: estable, estandariza, pero no motiva (factor higiénico). Variable: premia el desempeño excepcional sin tocar costos fijos, pero rompe la igualdad y genera presión sindical (Chiavenato).',
    ],
    analogy: 'Fija es el sueldo de todos los meses; variable es la comisión del vendedor.',
    connections: [
      'Recompensas y sanciones: el marco general.',
      'Bono anual: ejemplo de variable.',
      'Relaciones laborales (M10): la presión sindical.',
    ],
  },
  c9_bono: {
    layers: [
      'Un premio en plata a fin de año.',
      'Se da según cómo le fue a la empresa.',
      'El bono anual es un ejemplo de remuneración variable: un monto al cierre del año según el aporte al desempeño (rentabilidad, market share, productividad, calidad...).',
    ],
    analogy: 'Como el “aguinaldo de los buenos resultados”: si al negocio le fue bien, se reparte.',
    connections: [
      'Remuneración variable: es su ejemplo típico.',
      'Desempeño (M8): se mide para definirlo.',
    ],
  },
  c9_prestaciones: {
    layers: [
      'Son los beneficios además del sueldo.',
      'Por ley (legales) o porque la empresa quiere (espontáneas).',
      'Chiavenato clasifica las prestaciones por exigibilidad legal (legales vs espontáneas), por naturaleza (monetarias/no) y por objetivos; las modernas: remoto y flexibilidad.',
    ],
    analogy: 'Las legales vienen “de fábrica” por ley; las espontáneas son los extras que regala la empresa.',
    connections: [
      'Componentes de la compensación: son la parte indirecta.',
      'Chiavenato: su autor.',
      'Beneficios modernos: para las nuevas generaciones.',
    ],
  },

  // ------------------------------- MÓDULO 10 ------------------------------
  c10_relaciones: {
    layers: [
      'Son las reglas que ordenan la relación laboral.',
      'Políticas, procedimientos y leyes que enmarcan el contrato de trabajo.',
      'Las relaciones laborales son el marco de políticas, procedimientos y regulaciones legales que enmarcan los contratos: contrataciones, licencias, disciplina y desvinculaciones.',
    ],
    analogy: 'Como el reglamento de un club: leyes generales + reglas internas de la casa.',
    connections: [
      'Contrato psicológico: la parte no escrita.',
      'Disciplina laboral: parte del marco.',
      'Compensaciones (M9): los requisitos legales afectan el pago.',
    ],
  },
  c10_psicologico: {
    layers: [
      'Es un acuerdo invisible entre empleado y empresa.',
      'Son las expectativas de un intercambio justo de obligaciones entre ambos.',
      'El contrato psicológico son las expectativas de intercambio justo: el empleado espera pago justo, estabilidad, capacitación y promociones; el empleador, desempeño y cumplimiento. Fortalecerlo da relaciones armónicas.',
    ],
    analogy: 'Como una amistad: nadie firma nada, pero ambos esperan cosas del otro.',
    connections: [
      'Compensaciones (M9): se espera un pago justo.',
      'Capacitación (M7): se espera crecer y formarse.',
      'Contrato social: la versión más amplia (con la sociedad).',
    ],
  },
  c10_social: {
    layers: [
      'Es el acuerdo de la empresa con la sociedad.',
      'Reglas escritas y no escritas entre la organización y su entorno.',
      'Mondy: el contrato social abarca las reglas escritas y no escritas entre la organización y la sociedad, el gobierno y otras organizaciones.',
    ],
    analogy: 'Como ser buen vecino: no hay ley para todo, pero se espera que te portes bien.',
    connections: [
      'Contrato psicológico: el más cercano (empleado-empresa).',
      'Mondy: su autor.',
      'Diversidad (M11): ser un lugar justo es parte del contrato social.',
    ],
  },
  c10_disciplina: {
    layers: [
      'Ojo: disciplina NO es castigar.',
      'Es fijar estándares aceptables de conducta.',
      'La disciplina laboral define estándares aceptables de conducta; los problemas son de asistencia, deshonestidad, desempeño y comportamiento.',
    ],
    analogy: 'Como las reglas de un juego: no están para retar, sino para que todos sepan cómo jugar bien.',
    connections: [
      'Relaciones laborales: parte del marco.',
      'Resolución de disputas: cuando igual hay conflicto.',
      'Sanciones (M9): se relacionan.',
    ],
  },
  c10_disputas: {
    layers: [
      'Es resolver conflictos sin ir a juicio.',
      'Conciliación extra-judicial, puertas abiertas y mediación.',
      'Para resolver disputas se usan instancias extra-judiciales: resolución alternativa (conciliación), política de puertas abiertas y mediación (tercero neutral).',
    ],
    analogy: 'Como arreglar una pelea con un amigo en común que ayuda, en vez de ir a la policía.',
    connections: [
      'Disciplina laboral: cuando hay conflicto.',
      'Relaciones laborales: parte del marco.',
    ],
  },
  c10_salud: {
    layers: [
      'Es cuidar que el trabajo no enferme.',
      'Salud = ausencia de enfermedad física o emocional; el jefe es el principal responsable.',
      'Mondy: la salud es ausencia de enfermedad física o emocional; los gerentes de línea son los principales responsables del ambiente seguro y RRHH coordina (marco OSHA, 1970).',
    ],
    analogy: 'Como en una obra: el capataz cuida que todos usen casco; RRHH pone las reglas.',
    connections: [
      'Gerente de línea: el responsable (igual que en selección).',
      'Análisis de riesgos: cómo se previene.',
      'Estrés y burnout: parte de la salud.',
    ],
  },
  c10_riesgos: {
    layers: [
      'Es buscar los peligros antes de que pase algo.',
      'Se parte una tarea en pasos para eliminar riesgos.',
      'El análisis de riesgos en el trabajo descompone una tarea en pasos para eliminar los riesgos asociados.',
    ],
    analogy: 'Como revisar el auto antes de un viaje largo: parte por parte.',
    connections: [
      'Salud y seguridad: su objetivo.',
      'Ergonomía: otro modo de cuidar al trabajador.',
    ],
  },
  c10_estres: {
    layers: [
      'El estrés viene de varios lados.',
      'Fuentes: la empresa, lo personal y el ambiente general.',
      'El estrés laboral (Mondy) tiene fuentes organizacionales (cultura, puesto, condiciones), personales (familia, economía) y del ambiente general.',
    ],
    analogy: 'Como una mochila pesada: le ponés piedras del trabajo, de casa y del entorno.',
    connections: [
      'Ambigüedad vs conflicto de roles: causas en el puesto.',
      'Burnout: su forma extrema.',
      'Ambientes saludables: la respuesta de la empresa.',
    ],
  },
  c10_roles: {
    layers: [
      'Son dos problemas distintos con tu rol.',
      'Ambigüedad = no entender el puesto; conflicto = objetivos opuestos.',
      'Ambigüedad de roles: el empleado no entiende su puesto. Conflicto de roles: debe perseguir objetivos opuestos. Ambas son fuentes de estrés.',
    ],
    analogy: 'Ambigüedad: no saber qué tarea te toca. Conflicto: que te pidan rapidez y calidad máxima a la vez.',
    connections: [
      'Estrés laboral: son sus causas.',
      'Burnout: si no se resuelven a tiempo.',
    ],
  },
  c10_burnout: {
    layers: [
      'Es quemarse del todo por estrés.',
      'Es la forma extrema del estrés y se contagia.',
      'El burnout o desgaste es la forma extrema del estrés; es “contagioso” y debe prevenirse.',
    ],
    analogy: 'Como una vela que se consume entera; y si está cerca de otras, las prende.',
    connections: [
      'Estrés laboral: su origen.',
      'Ambientes saludables: cómo prevenirlo.',
    ],
  },
  c10_ergonomia: {
    layers: [
      'Es diseñar el puesto para trabajar cómodo y seguro.',
      'Ambientes saludables (bienestar) + ergonomía (diseño seguro y cómodo).',
      'Los ambientes saludables ofrecen programas de bienestar; la ergonomía revisa el diseño de los puestos para un trabajo seguro y cómodo.',
    ],
    analogy: 'Como una silla regulable y la pantalla a la altura justa para no lastimarte.',
    connections: [
      'Salud y seguridad: su objetivo.',
      'Burnout y estrés: ayuda a prevenirlos.',
    ],
  },

  // ------------------------------- MÓDULO 11 ------------------------------
  c11_gestion: {
    layers: [
      'Es que todos tengan las mismas oportunidades.',
      'Asegurar igualdad de oportunidades y un empleo justo y no sesgado.',
      'Gestionar la diversidad es asegurar prácticas de igualdad de oportunidades y empleo no sesgado; está en agenda por la migración y la multiculturalidad.',
    ],
    analogy: 'Como un examen igual para todos, sin ventajas para nadie.',
    connections: [
      'Discriminación: lo que se busca evitar.',
      'Acción afirmativa: una herramienta.',
      'Ventaja competitiva: la diversidad suma.',
    ],
  },
  c11_discriminacion: {
    layers: [
      'Es tratar peor a alguien por cómo es.',
      'Es gravísimo: trae problemas éticos, económicos y de imagen.',
      'La discriminación tiene consecuencias éticas, económicas y de imagen; puede evitarse con buenas prácticas de RRHH para que la empresa sea más justa.',
    ],
    analogy: 'Como dejar a alguien afuera del equipo por su acento, no por cómo juega.',
    connections: [
      'Gestión de la diversidad: la combate.',
      'Acción afirmativa: la repara.',
      'Clases protegidas: a quién protege la ley.',
    ],
  },
  c11_afirmativa: {
    layers: [
      'Son acciones a propósito para incluir.',
      'Medidas proactivas para reparar discriminaciones pasadas.',
      'La acción afirmativa son acciones proactivas para revertir discriminaciones pasadas: alentar la diversidad, publicar vacantes en barrios, eliminar obstáculos y capacitar.',
    ],
    analogy: 'Como darle una rampa a quien siempre tuvo escaleras: no es ventaja, es emparejar.',
    connections: [
      'Clases protegidas: a quiénes apunta.',
      'Discriminación: lo que repara.',
      'Reclutamiento (M6): publica vacantes en nuevas fuentes.',
    ],
  },
  c11_clases: {
    layers: [
      'Son grupos que la ley protege.',
      'Minorías étnicas, mujeres, personas mayores y personas con discapacidad.',
      'Las clases protegidas son grupos amparados por las leyes de igualdad de oportunidades: minorías étnicas, mujeres, personas mayores y personas con discapacidad.',
    ],
    analogy: 'Como cupos que aseguran que nadie quede afuera por un prejuicio.',
    connections: [
      'Acción afirmativa: las beneficia.',
      'Discriminación: lo que la ley evita.',
    ],
  },
  c11_apalancamiento: {
    layers: [
      'Es aprovechar las diferencias, no borrarlas.',
      'Cuatro pasos: observar, comprender, valorar y apalancar.',
      'Snell & Bohlander: apalancar las diferencias en 4 pasos (observar → comprender → valorar → apalancar); negarlas, neutralizarlas o eliminarlas no es gestión verdadera.',
    ],
    analogy: 'Como un equipo con jugadores distintos: aprovechás lo de cada uno en vez de querer que sean iguales.',
    connections: [
      'Ventajas de la diversidad: el resultado.',
      'Buenas prácticas: cómo lograrlo.',
      'Snell & Bohlander: su autor.',
    ],
  },
  c11_practicas: {
    layers: [
      'Es qué hacer para incluir, en dos niveles.',
      'Personal (rodearte de gente distinta) y organizacional (encuestas, estructuras inclusivas).',
      'Las buenas prácticas operan a nivel personal (asumir el conflicto, buscar info, perseverar) y organizacional (enfrentar la tensión, encuestar, estructuras inclusivas, recompensar la participación).',
    ],
    analogy: 'Como mejorar un grupo: cada uno pone de su parte y la “institución” arma reglas que ayuden.',
    connections: [
      'Apalancamiento: las hace posibles.',
      'Ventajas: su resultado.',
    ],
  },
  c11_ventajas: {
    layers: [
      'La diversidad hace mejor a la empresa.',
      'Más miradas para resolver y más flexibilidad ante el cambio.',
      'Una fuerza laboral diversa aporta ventaja competitiva y la diversidad organizativa da flexibilidad ante el cambio; el verdadero apalancamiento implica ver, comprender y valorar las diferencias.',
    ],
    analogy: 'Como un grupo de estudio variado: entre todos encuentran soluciones que uno solo no vería.',
    connections: [
      'Apalancamiento: cómo se logra.',
      'Estrategia del negocio: es ventaja competitiva.',
      'RRHH estratégico: cierra el círculo de los 6 módulos.',
    ],
  },
}

export const getLesson = (conceptId) => LESSONS[conceptId] || null
