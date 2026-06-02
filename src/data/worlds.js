// ============================================================================
//  CONTENIDO BASE — 100% extraído de la "Guía de estudio – Parcial oral de RRHH
//  (Módulos 6 a 11)". No se agrega teoría externa.
//  Cada mundo = un módulo. Cada concepto tiene:
//   - term: nombre del concepto
//   - definition: definición tal como aparece en la guía
//   - simple: "explicámelo fácil" (mismo concepto, palabras de 12 años)
//   - example: ejemplo para el oral (basado en lo que da la guía)
// ============================================================================

export const WORLDS = [
  {
    id: 'w1',
    module: 6,
    title: 'Reclutamiento y selección',
    emoji: '🎯',
    tagline: 'Atraer y elegir al mejor talento',
    gradient: 'from-sky-500 to-cyan-400',
    ring: 'ring-sky-400',
    text: 'text-sky-600',
    soft: 'bg-sky-50',
    concepts: [
      {
        id: 'c6_imperativo',
        term: 'Reclutamiento como imperativo estratégico',
        definition:
          'Antes la contratación era reactiva (se buscaba a alguien solo al aparecer una vacante). Hoy es un proceso continuo que busca fortalecer la reserva de talentos y dar ventaja competitiva. No es solo atraer gente: también es entender qué quieren los empleados para posicionar a la empresa como "empleador de elección".',
        simple:
          'Antes la empresa solo buscaba gente cuando alguien se iba, como tapar un agujero. Ahora busca talento todo el tiempo, como un equipo que siempre está sumando buenos jugadores al banco para ganar el campeonato.',
        example:
          'Una empresa que mantiene una base de candidatos activa todo el año, aunque no tenga vacantes abiertas, para no quedar a las corridas.',
      },
      {
        id: 'c6_marca',
        term: 'Marca empleadora (employer branding)',
        definition:
          'En cada proceso de reclutamiento se comunica la propuesta de valor de la empresa. La estrategia de empleos debe ser coherente con los valores de la firma y estar alineada en todos los mercados donde opera (local, regional, global).',
        simple:
          'Es la "fama" de la empresa como lugar para trabajar. Igual que una marca de zapatillas vende una imagen, la empresa vende cómo es trabajar ahí para volverse el lugar al que todos quieren entrar.',
        example:
          'Una empresa que muestra sus valores y beneficios para ser vista como "empleador de elección" y atraer mejores candidatos.',
      },
      {
        id: 'c6_interno',
        term: 'Reclutamiento interno',
        definition:
          'Candidatos disponibles rápido, ya se conoce su desempeño, se actualizan más rápido. Herramienta típica: job posting (publicación interna de vacantes en intranet, carteleras, mails). Señales de banco de talento interno débil: demora en cubrir puestos clave, vacantes que solo se llenan desde afuera, reemplazos que fracasan, promociones por favoritismo/nepotismo.',
        simple:
          'Es ascender o mover a alguien que YA trabaja en la empresa. Como elegir un capitán entre los jugadores que ya están en el equipo: los conocés y están listos enseguida.',
        example:
          'Publicar una vacante en la intranet (job posting) para que se postule alguien de adentro.',
      },
      {
        id: 'c6_externo',
        term: 'Reclutamiento externo',
        definition:
          'Las fuentes se eligen según el tipo de puesto. Redes sociales y universidades → pasantías y jóvenes profesionales. Agencias de personal eventual → tareas temporarias. Sindicatos y bolsas de empleo → puestos operativos/producción. Ferias → difundir marca. Referidos por empleados → muy efectivos (suelen tener premios monetarios).',
        simple:
          'Es buscar gente de AFUERA de la empresa. Y la fuente cambia según el puesto: la universidad para jóvenes, las agencias para algo temporario, los referidos (que un empleado recomiende a un conocido) que funcionan muy bien.',
        example:
          'Buscar pasantes en universidades, u operarios a través de bolsas de empleo y sindicatos.',
      },
      {
        id: 'c6_seleccion',
        term: 'Selección',
        definition:
          'Proceso de elegir a las personas con las calificaciones adecuadas. Objetivo central: maximizar aciertos y evitar errores.',
        simple:
          'Una vez que tenés varios candidatos, la selección es el filtro para quedarte con el que mejor encaja. La meta es acertar y no equivocarte al elegir.',
        example:
          'De 10 candidatos a un puesto, ir evaluando hasta quedarte con el que tiene las calificaciones adecuadas.',
      },
      {
        id: 'c6_costos',
        term: 'Costos de un error de selección',
        definition:
          'Tres tipos: Directos (gastos del proceso ya incurridos), Indirectos (entrenar a alguien que no rinde) y De oportunidad (la persona que habría tenido éxito y no fue contratada).',
        simple:
          'Si elegís mal, perdés por tres lados: la plata que ya gastaste buscando (directo), lo que gastás entrenando a alguien que no sirve (indirecto), y al crack que dejaste pasar (oportunidad).',
        example:
          'Contratás a alguien que no rinde: pagaste el proceso (directo), lo capacitaste al pedo (indirecto) y perdiste al buen candidato que descartaste (oportunidad).',
      },
      {
        id: 'c6_pasos',
        term: 'Pasos del proceso de selección',
        definition:
          '1) Relevar la necesidad y el perfil → 2) Definir estrategia (interna/externa) → 3) Definir instancias de evaluación y evaluadores → 4) Integrar la información recolectada → 5) Decisión con gerentes de línea → 6) Exámenes pre-ocupacionales → 7) Inducción.',
        simple:
          'Es una receta con pasos en orden: primero entendés qué necesitás, después decidís dónde buscar, evaluás, juntás todo, decidís con el jefe del área, hacés el examen médico y por último le das la bienvenida (inducción).',
        example:
          'Arrancás definiendo el perfil del puesto y terminás haciendo la inducción del nuevo empleado.',
      },
      {
        id: 'c6_herramientas',
        term: 'Herramientas de evaluación',
        definition:
          'La entrevista es central (telefónica, individual, grupal, video). También pruebas técnicas/de habilidades y el pedido de referencias laborales (instancia final).',
        simple:
          'Las herramientas para conocer al candidato: la entrevista es la principal, más pruebas para ver si sabe hacer la tarea, y al final llamar a sus trabajos anteriores para pedir referencias.',
        example:
          'Una entrevista por video + una prueba técnica + pedir referencias a su jefe anterior.',
      },
      {
        id: 'c6_decision',
        term: 'Decisión final: el gerente de línea',
        definition:
          'La decisión final la toman los gerentes de línea, porque son quienes integrarán a esa persona a su equipo. RRHH da soporte.',
        simple:
          'Quien decide a quién contratar NO es RRHH, sino el jefe del área donde va a trabajar la persona, porque es él quien va a trabajar con ella. RRHH ayuda, pero no decide.',
        example:
          'RRHH preselecciona 3 finalistas, pero el gerente del sector elige cuál entra a su equipo.',
      },
    ],
  },

  {
    id: 'w2',
    module: 7,
    title: 'Capacitación y desarrollo',
    emoji: '📚',
    tagline: 'Preparar a la gente para hoy y para el futuro',
    gradient: 'from-emerald-500 to-teal-400',
    ring: 'ring-emerald-400',
    text: 'text-emerald-600',
    soft: 'bg-emerald-50',
    concepts: [
      {
        id: 'c7_capvsdes',
        term: 'Capacitación vs. Desarrollo',
        definition:
          'Capacitación = roles presentes o de corto plazo. Desarrollo = preparar para roles futuros más complejos.',
        simple:
          'Capacitación es enseñarte a hacer bien tu tarea de AHORA. Desarrollo es prepararte para un puesto MÁS GRANDE que vas a tener mañana. Presente vs. futuro.',
        example:
          'Capacitar a un cajero para usar el nuevo sistema (presente) vs. desarrollar a un analista para que sea jefe en 2 años (futuro).',
      },
      {
        id: 'c7_proceso',
        term: 'Proceso de capacitación (4 etapas, es un ciclo)',
        definition:
          '1) Evaluación de necesidades (DNC): relevar planes de negocio, proyectos, cambios y necesidades individuales que reportan los gerentes (necesidades de las personas Y de la organización). 2) Diseño: objetivos y dinámicas. 3) Implementación: en el puesto / fuera del puesto / desarrollo gerencial. 4) Evaluación: retroalimenta el ciclo.',
        simple:
          'Es un círculo de 4 pasos: 1) detectar qué falta aprender (DNC), 2) diseñar el curso, 3) darlo, 4) evaluar si sirvió. Y como es un círculo, la evaluación te dice qué mejorar para la próxima.',
        example:
          'Detectás que el equipo no sabe usar Excel (DNC), armás el curso, lo das y al final medís si lo aplican.',
      },
      {
        id: 'c7_kirkpatrick',
        term: 'Modelo Kirkpatrick (4 niveles de evaluación)',
        definition:
          'Reacción (satisfacción del empleado) → Aprendizaje (asimilación de saberes) → Transferencia (aplicación al trabajo) → Resultados (impacto en el negocio).',
        simple:
          'Mide la capacitación en 4 escalones: ¿les gustó? (reacción), ¿aprendieron? (aprendizaje), ¿lo USAN en el trabajo? (transferencia) y ¿mejoró el negocio? (resultados). Cuanto más alto el escalón, más importa.',
        example:
          'Transferencia es cuando el vendedor realmente aplica en sus ventas lo que vio en el curso.',
      },
      {
        id: 'c7_competencias',
        term: 'Capacitación por competencias',
        definition:
          'Las competencias = conocimientos + habilidades + actitudes. Se parte de situaciones-problema reales del puesto. Métodos de aprendizaje activo: casos, simulaciones, discusiones grupales, juegos de toma de decisiones.',
        simple:
          'Una competencia mezcla 3 cosas: lo que SABÉS, lo que sabés HACER y tu ACTITUD. Y se entrena con problemas reales del trabajo, no con teoría aburrida: casos, simulaciones, juegos.',
        example:
          'Practicar con un caso real de un cliente enojado, en vez de solo leer un manual.',
      },
      {
        id: 'c7_enelpuesto',
        term: 'Capacitación en el puesto',
        definition:
          'Experiencia práctica con el supervisor o un referente experto. Muy eficaz para competencias técnicas; permite que los senior entrenen a los jóvenes.',
        simple:
          'Aprender haciendo, al lado de alguien que ya sabe. Como cuando un cocinero experto te enseña en la cocina mientras cocinan de verdad.',
        example:
          'Un técnico senior acompaña al nuevo en reparaciones reales hasta que aprende.',
      },
      {
        id: 'c7_gerencial',
        term: 'Desarrollo gerencial',
        definition:
          'Actividades más focalizadas para pocas personas: asignaciones suplentes, rotación de puestos, proyectos especiales, coaching, universidades corporativas, becas de posgrado, estudios de casos. Gana relevancia por la escasez de talento gerencial.',
        simple:
          'Es preparar a los futuros jefes. Como son pocos y valiosos, se usan herramientas especiales: rotarlos por áreas, darles proyectos, coaching, becas. Importa cada vez más porque faltan buenos líderes.',
        example:
          'Rotar a un futuro gerente por 3 áreas distintas para que entienda toda la empresa.',
      },
      {
        id: 'c7_rolrrhh',
        term: 'Rol de RRHH en el desarrollo de carrera',
        definition:
          'Alinear necesidades individuales y de la organización, identificar oportunidades de crecimiento, implementar prácticas (talleres, coaching, retroalimentación) y calibrar capacidades/potencial mediante inventarios de talento y planes de sucesión.',
        simple:
          'RRHH conecta lo que la persona quiere ser con lo que la empresa necesita. Lleva un "inventario" de quién tiene potencial y arma planes de sucesión para saber quién reemplazaría a cada jefe.',
        example:
          'Un plan de sucesión que define quién está listo para ser el próximo gerente si el actual se va.',
      },
      {
        id: 'c7_efectividad',
        term: 'Efectividad de la capacitación',
        definition:
          'Capacitación y desarrollo son costosas → hay que medir su efectividad y monitorearlas; deben contribuir a las metas organizacionales.',
        simple:
          'Capacitar cuesta caro, así que hay que medir si sirvió de verdad. Si no aporta a las metas de la empresa, fue plata tirada.',
        example:
          'Medir si después del curso de ventas, las ventas efectivamente subieron.',
      },
    ],
  },

  {
    id: 'w3',
    module: 8,
    title: 'Gestión del desempeño',
    emoji: '📊',
    tagline: 'Que cada persona rinda al máximo',
    gradient: 'from-violet-500 to-purple-400',
    ring: 'ring-violet-400',
    text: 'text-violet-600',
    soft: 'bg-violet-50',
    concepts: [
      {
        id: 'c8_gestvseval',
        term: 'Gestión vs. Evaluación del desempeño',
        definition:
          'Gestión del desempeño = crear un ambiente donde las personas se desempeñen al máximo (proceso global). La evaluación del desempeño es la actividad dentro de ese proceso donde el gerente compara el desempeño con los requerimientos del puesto y muestra dónde mejorar (medición puntual).',
        simple:
          'La gestión es TODO el proceso de lograr que la gente rinda bien durante el año. La evaluación es solo UN momento de ese proceso: la foto donde el jefe mide cómo te fue. La gestión es la película; la evaluación, una foto.',
        example:
          'La gestión es acompañar todo el año; la evaluación es la reunión donde se mide el resultado.',
      },
      {
        id: 'c8_objetivos',
        term: 'Objetivos del proceso de desempeño',
        definition:
          'Medir lo que se logra (lo que no se mide no se valora), influir en el comportamiento para mejorar el desempeño colectivo, dar retroalimentación e identificar necesidades de capacitación y desarrollo. Alimenta atracción, capacitación y desarrollo.',
        simple:
          'Sirve para 4 cosas: medir resultados, mejorar cómo trabaja la gente, dar devoluciones y descubrir qué necesitan aprender. Frase clave: "lo que no se mide no se valora".',
        example:
          'De una evaluación sale que Juan necesita un curso de liderazgo: eso alimenta la capacitación.',
      },
      {
        id: 'c8_pasos',
        term: 'Pasos del proceso (5)',
        definition:
          '1) Fijación de objetivos y expectativas → 2) Retroalimentación continua → 3) Evaluación por parte del gerente → 4) Entrevista de revisión formal → 5) Integración de información y toma de decisiones.',
        simple:
          'Cinco pasos: primero se acuerdan las metas, después se da feedback durante todo el año, el jefe evalúa, hacen la reunión formal y al final se toman decisiones (aumentos, ascensos, cursos).',
        example:
          'Arranca fijando objetivos en enero y termina en diciembre decidiendo si hay ascenso.',
      },
      {
        id: 'c8_mbo',
        term: 'Administración por Objetivos (MBO)',
        definition:
          'Propuesta por Peter Drucker (1954). El empleado fija objetivos asesorado por su supervisor; se miden con un tablero de control / métricas.',
        simple:
          'Método donde el empleado, junto a su jefe, se pone metas claras y medibles, y después se mira un tablero para ver si las cumplió. Lo inventó Peter Drucker en 1954.',
        example:
          'Un vendedor acuerda "vender 100 unidades este trimestre" y se mide con un tablero.',
      },
      {
        id: 'c8_evalcomp',
        term: 'Evaluación por competencias',
        definition:
          'Se define un modelo de competencias para la empresa; unifica expectativas de comportamiento entre distintas áreas.',
        simple:
          'En vez de medir solo números, se evalúan comportamientos (trabajo en equipo, liderazgo, etc.) iguales para toda la empresa, así todos saben qué se espera de ellos.',
        example:
          'Toda la empresa evalúa "trabajo en equipo" con la misma vara, sea de ventas o de sistemas.',
      },
      {
        id: 'c8_factores',
        term: 'Los 3 factores del desempeño',
        definition:
          'Capacidad, Motivación y Ambiente. Toda evaluación debe terminar con un plan de acción consensuado entre supervisor y empleado.',
        simple:
          'Que alguien rinda depende de 3 cosas: si PUEDE (capacidad), si QUIERE (motivación) y si el lugar lo deja (ambiente). Si falla una, baja el rendimiento.',
        example:
          'Un crack desmotivado o sin herramientas rinde mal aunque tenga capacidad.',
      },
      {
        id: 'c8_feedback',
        term: 'Retroalimentación (el hacer, no el ser)',
        definition:
          'Dar ejemplos de conductas esperadas y a mejorar; enfocarse en lo realizado, no en la persona ("el hacer, no el ser"); enfatizar lo que está bajo control del empleado; mantener comunicación activa. No se discute la forma de ser ni los valores: se discute qué logró hacer.',
        simple:
          'El feedback se da sobre lo que la persona HIZO, no sobre cómo ES. No le decís "sos un vago", le decís "este informe llegó tarde". Se habla de acciones que puede cambiar, no de su personalidad.',
        example:
          'Decir "el reporte tuvo 3 errores" (el hacer) en vez de "sos descuidado" (el ser).',
      },
      {
        id: 'c8_calibracion',
        term: 'Mesas de calibración',
        definition:
          'Reuniones de gerentes para alinear las evaluaciones entre sí y que sean consistentes. La calidad del proceso es responsabilidad compartida entre RRHH y los gerentes.',
        simple:
          'Reunión donde los jefes comparan sus notas para que todos usen la misma vara. Así un "8" de un sector vale lo mismo que un "8" de otro y no hay injusticias.',
        example:
          'Los gerentes se juntan para que uno no regale notas altas y otro sea durísimo.',
      },
    ],
  },

  {
    id: 'w4',
    module: 9,
    title: 'Compensaciones',
    emoji: '💰',
    tagline: 'Recompensar el buen desempeño',
    gradient: 'from-amber-500 to-orange-400',
    ring: 'ring-amber-400',
    text: 'text-amber-600',
    soft: 'bg-amber-50',
    concepts: [
      {
        id: 'c9_estrategica',
        term: 'Compensación estratégica',
        definition:
          'Las prácticas de pago y beneficios son una herramienta de comunicación: transmiten qué valora la empresa. Están ligadas a los medios de vida → especial cuidado en contextos de crisis e inflación (muy relevante en Argentina).',
        simple:
          'Cómo y cuánto paga la empresa MANDA UN MENSAJE de qué le importa. Y como el sueldo es de lo que vive la gente, hay que cuidarlo mucho en épocas de inflación.',
        example:
          'Si la empresa paga bonos por calidad, está diciendo "acá valoramos la calidad".',
      },
      {
        id: 'c9_componentes',
        term: 'Tres componentes de la compensación (Snell & Bohlander)',
        definition:
          'Directa: sueldos fijos, incentivos, bonos, comisiones. Indirecta: los beneficios al empleado. No monetaria: reconocimiento, trabajo gratificante, ambiente, flexibilidad horaria/remoto.',
        simple:
          'La compensación tiene 3 partes: la directa (la plata: sueldo, bonos), la indirecta (los beneficios) y la no monetaria (lo que no es plata: reconocimiento, buen clima, home office).',
        example:
          'Sueldo (directa) + obra social (indirecta) + un "felicitaciones" y home office (no monetaria).',
      },
      {
        id: 'c9_ciclo',
        term: 'Alineamiento de la compensación (ciclo)',
        definition:
          'Estrategia de compensación → Diseño de la mezcla de pago → Herramientas de pago → Evaluación de las prácticas (y retroalimenta). Busca equilibrio entre costos laborales y satisfacción de expectativas.',
        simple:
          'Un círculo: primero decidís la estrategia de pago, después armás la mezcla, elegís las herramientas y evaluás si funcionó. Buscás equilibrio entre lo que cuesta y lo que la gente espera.',
        example:
          'Revisar cada año si el esquema de sueldos sigue siendo justo y sostenible.',
      },
      {
        id: 'c9_mezcla',
        term: 'Mezcla de pago: factores internos y externos',
        definition:
          'Internos: estrategia de compensación, valor del trabajo, valor relativo del empleado, capacidad de pago del empleador. Externos: condiciones del mercado de trabajo, tasas del área, costo de vida, negociación colectiva, requisitos legales.',
        simple:
          'Cuánto se paga depende de cosas de ADENTRO (qué puede pagar la empresa, cuánto vale el puesto) y de AFUERA (cuánto paga el mercado, el costo de vida, los sindicatos, la ley).',
        example:
          'La negociación colectiva y el costo de vida son factores EXTERNOS que afectan el sueldo.',
      },
      {
        id: 'c9_merito',
        term: 'Pago por mérito / desempeño',
        definition:
          'Vincula la compensación a desempeño y logros individuales; mejora la motivación y la productividad.',
        simple:
          'Te pagan más si rendís más. Premia tus logros personales, así te motivás y producís mejor.',
        example:
          'Un aumento extra al empleado que cumplió todos sus objetivos del año.',
      },
      {
        id: 'c9_variable',
        term: 'Remuneración variable',
        definition:
          'Requiere administración cuidadosa, objetivos e indicadores de medición, y alineación con la estrategia. Si los pagos son grupales, fomentan el trabajo en equipo.',
        simple:
          'Parte del pago que cambia según resultados. Hay que manejarla con cuidado y con indicadores claros. Si es grupal, hace que el equipo se ayude para cobrar todos.',
        example:
          'Un bono que cobra todo el equipo si juntos llegan a la meta de ventas.',
      },
      {
        id: 'c9_recompensas',
        term: 'Recompensas y sanciones (Chiavenato, Cap. 11)',
        definition:
          'La organización usa recompensas (incentivos) y sanciones (castigos) para reforzar conductas. Objetivos de las recompensas: aumentar conciencia/responsabilidad, ampliar la interdependencia individuo-equipo-organización e impulsar la creación de valor. Criterios: por objetivos alcanzados, antigüedad, desempeño excepcional (mérito), resultados departamentales, competencias, complejidad.',
        simple:
          'La empresa premia lo que quiere que se repita y sanciona lo que no. Las recompensas buscan que la gente se sienta más responsable, más unida al equipo y que cree valor.',
        example:
          'Premiar por objetivos cumplidos o por antigüedad; sancionar conductas indeseadas.',
      },
      {
        id: 'c9_fijavsvar',
        term: 'Remuneración fija vs. variable (Chiavenato)',
        definition:
          'Fija: estable, facilita el equilibrio interno/externo, estandariza salarios. PERO no motiva (solo factor higiénico) y no incentiva a tomar riesgos. Variable: se adecúa a las diferencias individuales, premia el desempeño excepcional, no afecta costos fijos. Contras: rompe la igualdad de ganancias, puede generar quejas y presión sindical.',
        simple:
          'La fija es el sueldo seguro de todos los meses: ordena pero no te entusiasma (solo "factor higiénico"). La variable cambia según cómo rendís: motiva y premia al que se destaca, pero puede generar envidias y quejas del sindicato.',
        example:
          'Sueldo base igual para todos (fija) vs. bono que solo cobra el que se destacó (variable).',
      },
      {
        id: 'c9_bono',
        term: 'Plan de bono anual',
        definition:
          'Valor monetario al cierre del año según aporte al desempeño de la empresa (rentabilidad, market share, productividad, calidad, reducción de costos). Es un ejemplo de remuneración variable.',
        simple:
          'Un premio en plata a fin de año si a la empresa le fue bien (ganó más, vendió más, fue más eficiente). Es el ejemplo típico de pago variable.',
        example:
          'A fin de año se reparte un bono porque la empresa superó su meta de rentabilidad.',
      },
      {
        id: 'c9_prestaciones',
        term: 'Prestaciones / beneficios (Chiavenato, Cap. 12)',
        definition:
          'Por exigibilidad legal: legales (vacaciones, aguinaldo, jubilación, seguro de accidentes, maternidad) vs. espontáneas (gratificaciones, comedor, transporte, seguro de vida, préstamos — voluntarias). Por naturaleza: monetarias vs. no monetarias. Por objetivos: asistenciales, recreativas, complementarias/supletorias. Modernos: trabajo remoto, horarios flexibles.',
        simple:
          'Los beneficios se clasifican: por LEY las legales son obligatorias (aguinaldo, vacaciones) y las espontáneas las da la empresa porque quiere (comedor, transporte). También se ordenan por si son plata o no, y por para qué sirven.',
        example:
          'El aguinaldo es legal (obligatorio); el comedor gratis es espontáneo (voluntario).',
      },
    ],
  },

  {
    id: 'w5',
    module: 10,
    title: 'Relaciones laborales y salud ocupacional',
    emoji: '⚖️',
    tagline: 'Cuidar la relación, la salud y los derechos',
    gradient: 'from-rose-500 to-red-400',
    ring: 'ring-rose-400',
    text: 'text-rose-600',
    soft: 'bg-rose-50',
    concepts: [
      {
        id: 'c10_relaciones',
        term: 'Relaciones laborales',
        definition:
          'El marco de políticas, procedimientos y regulaciones legales que enmarcan los contratos de trabajo. Cada país dicta leyes con derechos y obligaciones; las empresas suman políticas internas para administrar contrataciones, licencias, medidas disciplinarias y desvinculaciones.',
        simple:
          'Son todas las reglas (leyes + políticas internas) que ordenan la relación entre empresa y trabajador: cómo se contrata, las licencias, las sanciones y los despidos.',
        example:
          'La ley de contrato de trabajo + el reglamento interno de la empresa.',
      },
      {
        id: 'c10_psicologico',
        term: 'Contrato psicológico',
        definition:
          'Las expectativas de un intercambio justo de obligaciones entre empleado y empleador. El empleado espera compensación justa, estabilidad, capacitación, promociones; el empleador espera desempeño y cumplimiento de procedimientos. Fortalecerlo = relaciones armónicas.',
        simple:
          'Es un acuerdo NO escrito de qué espera cada uno. El empleado espera sueldo justo, estabilidad y crecer; la empresa espera que rinda y cumpla. Si se respeta, la relación es armónica.',
        example:
          'Vos esperás que te capaciten y asciendan; la empresa espera que cumplas y rindas, aunque nadie lo firmó.',
      },
      {
        id: 'c10_social',
        term: 'Contrato social (Mondy)',
        definition:
          'Reglas escritas y no escritas entre la organización y la sociedad, el gobierno, otras organizaciones y las personas.',
        simple:
          'Mientras el contrato psicológico es entre empleado y empresa, el contrato social es entre la EMPRESA y todo lo de afuera: la sociedad, el gobierno, otras empresas. Reglas escritas y no escritas.',
        example:
          'Que una empresa cuide el medioambiente aunque ninguna ley puntual la obligue.',
      },
      {
        id: 'c10_disciplina',
        term: 'Disciplina laboral',
        definition:
          'NO es castigo: es definir estándares aceptables de conducta y desempeño. Problemas comunes: de asistencia (inasistencias injustificadas), de deshonestidad (robos, falsificación), de desempeño (no cumplir asignaciones/calidad) y de comportamiento (bullying, violencia, alcohol/drogas, acoso, armas).',
        simple:
          'OJO: disciplina NO es castigar. Es dejar claro qué conducta es aceptable. Como las reglas de un juego: no están para retar, sino para que todos sepan cómo jugar bien.',
        example:
          'Fijar que llegar tarde sin aviso no es aceptable: es marcar el estándar, no castigar.',
      },
      {
        id: 'c10_disputas',
        term: 'Resolución de disputas',
        definition:
          'Tendencia a instancias extra-judiciales que ahorren costos. Mecanismos: resolución alternativa de disputas (conciliación extra-judicial), política de puertas abiertas (el empleado puede escalar a niveles por encima de su jefe) y mediación (un tercero neutral facilita un acuerdo).',
        simple:
          'Resolver conflictos SIN ir a juicio, para ahorrar plata y tiempo. Tres formas: conciliar por fuera de tribunales, "puertas abiertas" (poder quejarte arriba de tu jefe) o mediación (alguien neutral ayuda a acordar).',
        example:
          'Antes de un juicio, un mediador neutral ayuda a empleado y empresa a llegar a un acuerdo.',
      },
      {
        id: 'c10_salud',
        term: 'Salud y seguridad ocupacional',
        definition:
          'Mondy: la salud es ausencia de enfermedad física o emocional. Los gerentes de línea son los principales responsables del ambiente seguro; RRHH coordina los programas. Marco legal de referencia: Ley de Seguridad y Salud Ocupacional de 1970 (OSHA) en EE.UU. El marco regula ambientes libres de peligro, equipos de protección personal, información al empleado, capacitación en conductas seguras y sustancias peligrosas.',
        simple:
          'Salud es no estar enfermo ni física ni emocionalmente. El responsable principal de que el lugar sea seguro es el JEFE de cada área (gerente de línea), y RRHH coordina. La ley de referencia es OSHA (1970, EE.UU.).',
        example:
          'El jefe del taller asegura que todos usen casco; RRHH coordina el programa de seguridad.',
      },
      {
        id: 'c10_riesgos',
        term: 'Análisis de riesgos en el trabajo',
        definition:
          'Proceso de varios pasos que divide una tarea para eliminar los riesgos asociados.',
        simple:
          'Agarrás una tarea, la partís en pasitos y revisás cada uno para sacar los peligros antes de que pase un accidente.',
        example:
          'Descomponer "cambiar una lámpara en altura" en pasos para ver dónde puede haber una caída.',
      },
      {
        id: 'c10_estres',
        term: 'Estrés laboral (Mondy)',
        definition:
          'Fuentes: organizacionales (cultura corporativa, el puesto, condiciones laborales), personales (familia, problemas económicos) y del ambiente general.',
        simple:
          'El estrés del trabajo viene de 3 lugares: la empresa (la cultura, el puesto), tu vida personal (familia, plata) y el entorno general. No siempre es culpa del trabajo solo.',
        example:
          'Un puesto muy exigente sumado a problemas económicos en casa dispara el estrés.',
      },
      {
        id: 'c10_roles',
        term: 'Ambigüedad vs. Conflicto de roles',
        definition:
          'Ambigüedad de roles: el empleado no entiende su puesto. Conflicto de roles: debe perseguir objetivos opuestos. También existe la sobrecarga / carga insuficiente de trabajo.',
        simple:
          'Ambigüedad = no sabés qué tenés que hacer (todo confuso). Conflicto = sabés, pero te piden dos cosas opuestas al mismo tiempo. Una es no entender; la otra es que te tiran para los dos lados.',
        example:
          'Ambigüedad: nadie te explicó tu tarea. Conflicto: tu jefe quiere rapidez y calidad máxima a la vez.',
      },
      {
        id: 'c10_burnout',
        term: 'Burnout (desgaste)',
        definition:
          'Forma extrema del estrés. Es "contagioso" y debe prevenirse.',
        simple:
          'Es quemarse del todo por estrés sostenido. Lo peligroso es que se contagia al equipo, así que hay que prevenirlo antes de que se expanda.',
        example:
          'Un empleado al límite contagia el agobio al resto del equipo.',
      },
      {
        id: 'c10_ergonomia',
        term: 'Ambientes saludables y ergonomía',
        definition:
          'Ambientes de trabajo saludables: programas de bienestar (ejercicio, nutrición, manejo del estrés, control de peso, relajación, flexibilidad horaria, trabajo remoto). Ergonomía: revisa el diseño de puestos para que el trabajo sea seguro y cómodo (interacción humana con tareas, equipo y ambiente físico).',
        simple:
          'Ambiente saludable = la empresa ayuda con bienestar (gimnasia, nutrición, flexibilidad). Ergonomía = diseñar el puesto (silla, escritorio, herramientas) para que trabajes cómodo y sin lastimarte.',
        example:
          'Una silla regulable y una pantalla a la altura correcta son ergonomía.',
      },
    ],
  },

  {
    id: 'w6',
    module: 11,
    title: 'Gestión de la diversidad',
    emoji: '🌈',
    tagline: 'Las diferencias como ventaja competitiva',
    gradient: 'from-fuchsia-500 to-pink-400',
    ring: 'ring-fuchsia-400',
    text: 'text-fuchsia-600',
    soft: 'bg-fuchsia-50',
    concepts: [
      {
        id: 'c11_gestion',
        term: 'Gestión de la diversidad',
        definition:
          'Asegurar prácticas y políticas de igualdad de oportunidades y empleo justo y no sesgado. Está en la agenda por dos factores: la creciente diversidad poblacional (migraciones) y la multiculturalidad de la fuerza laboral.',
        simple:
          'Es asegurar que todos tengan las mismas oportunidades, sin favoritismos ni prejuicios. Está de moda por dos motivos: más migración y equipos cada vez más multiculturales.',
        example:
          'Procesos de selección sin sesgos, donde todos compiten en igualdad.',
      },
      {
        id: 'c11_discriminacion',
        term: 'Discriminación',
        definition:
          'Uno de los problemas más graves; tiene consecuencias éticas, económicas y de imagen. Afecta a todos por igual y puede evitarse con buenas prácticas de RRHH. El objetivo de RRHH: que la organización sea un lugar más justo para trabajar.',
        simple:
          'Tratar peor a alguien por cómo es. Es gravísimo: trae problemas éticos, de plata y de imagen. Se evita con buenas prácticas de RRHH para que la empresa sea más justa.',
        example:
          'No contratar a alguien por su edad o género: discriminación que daña la imagen y es injusta.',
      },
      {
        id: 'c11_afirmativa',
        term: 'Acción afirmativa',
        definition:
          'Acciones proactivas para revertir el impacto de discriminaciones pasadas contra grupos minoritarios: alentar la diversidad de empleo, publicar vacantes en bolsas/agencias/organizaciones barriales, eliminar obstáculos innecesarios y brindar capacitación y orientación.',
        simple:
          'Medidas activas para reparar discriminaciones del pasado contra minorías. No es solo "no discriminar", es hacer cosas a propósito para incluir: buscar candidatos en barrios, sacar barreras, capacitar.',
        example:
          'Publicar vacantes en organizaciones barriales para llegar a grupos antes excluidos.',
      },
      {
        id: 'c11_clases',
        term: 'Clases protegidas',
        definition:
          'Grupos protegidos por las leyes de igualdad de oportunidades: minorías étnicas, mujeres, personas mayores y personas con discapacidad.',
        simple:
          'Grupos que la ley protege especialmente porque históricamente fueron discriminados: minorías étnicas, mujeres, personas mayores y personas con discapacidad.',
        example:
          'Una persona con discapacidad está dentro de una clase protegida por ley.',
      },
      {
        id: 'c11_apalancamiento',
        term: 'Apalancamiento de las diferencias (4 pasos, Snell & Bohlander)',
        definition:
          'Observar → Comprender → Valorar → Apalancar la diferencia. Las diferencias suelen negarse, neutralizarse o eliminarse, pero ninguna lleva a una gestión verdadera. Reconocer lo diverso en otros es reconocerlo en uno mismo.',
        simple:
          'Es aprovechar las diferencias en 4 pasos: primero VERLAS, después ENTENDERLAS, después VALORARLAS y por último APALANCARLAS (usarlas a favor). Negarlas o borrarlas nunca sirve.',
        example:
          'Un equipo que ve, entiende y valora sus distintas culturas y las usa para tener más ideas.',
      },
      {
        id: 'c11_practicas',
        term: 'Buenas prácticas (personal y organizacional)',
        definition:
          'Personal: reconocer que las diferencias son comunes, asumir cierto conflicto interpersonal, buscar información, involucrar a personas distintas en tu red, perseverar pese al malestar. Organizacional: enfrentar la tensión abiertamente, evitar el secreto, recopilar datos (encuestas), establecer estructuras inclusivas, recompensar la participación.',
        simple:
          'Hay dos niveles: lo PERSONAL (cada uno se rodea de gente distinta y banca la incomodidad) y lo ORGANIZACIONAL (la empresa habla del tema sin secretos, mide con encuestas y premia participar).',
        example:
          'A nivel empresa: hacer encuestas de clima y crear estructuras inclusivas.',
      },
      {
        id: 'c11_ventajas',
        term: 'Ventajas de la diversidad',
        definition:
          'Fuerza laboral diversa: las diferencias individuales aportan ventaja competitiva. Diversidad organizativa: aporta mayor flexibilidad ante el cambio. Frase clave: "El verdadero apalancamiento de las diferencias implica verlas, comprenderlas y valorarlas".',
        simple:
          'La diversidad da dos ventajas: más miradas distintas para resolver problemas (ventaja competitiva) y más flexibilidad para adaptarse a los cambios.',
        example:
          'Un equipo diverso encuentra soluciones que un grupo todo igual no vería.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
//  Hilo conductor / síntesis integradora (para "Conectar ideas" y cierre oral)
// ---------------------------------------------------------------------------
export const INTEGRACION = {
  hilo:
    'Todos los procesos se conectan a través del análisis y descripción de puestos, que alimenta a la vez reclutamiento, selección, capacitación, evaluación del desempeño y compensación.',
  logica:
    'Atraigo talento (M6) → lo desarrollo (M7) → mido su desempeño (M8) → lo recompenso (M9) → cuido la relación, su salud y sus derechos (M10) → y gestiono la diversidad de toda esa fuerza laboral como ventaja competitiva (M11).',
  principio:
    'En todos los casos, el principio rector es que las prácticas de RRHH deben estar alineadas con la estrategia del negocio.',
}

// ---------------------------------------------------------------------------
//  Autores clave (para el Modo Autores)
// ---------------------------------------------------------------------------
export const AUTORES = [
  {
    id: 'snell',
    name: 'Snell & Bohlander',
    role: 'Manual base (transversal a todos los módulos)',
    temas: [
      'Reclutamiento estratégico',
      'Componentes de la compensación (directa, indirecta, no monetaria)',
      'Apalancamiento de la diversidad (4 pasos)',
      'Pasos de la gestión del desempeño',
    ],
  },
  {
    id: 'chiavenato',
    name: 'Chiavenato',
    role: 'Recompensas, remuneración y prestaciones',
    temas: [
      'Recompensas y sanciones (Cap. 11)',
      'Remuneración fija y variable',
      'Tipología de prestaciones (Cap. 12)',
    ],
  },
  {
    id: 'mondy',
    name: 'Mondy & Noe',
    role: 'Relaciones laborales y bienestar',
    temas: [
      'Salud y seguridad ocupacional',
      'Estrés laboral',
      'Contrato social',
    ],
  },
  {
    id: 'drucker',
    name: 'Peter Drucker',
    role: 'Padre de la Administración por Objetivos',
    temas: ['Administración por Objetivos (MBO), 1954'],
  },
]

export const getWorld = (id) => WORLDS.find((w) => w.id === id)
export const getConcept = (cid) => {
  for (const w of WORLDS) {
    const c = w.concepts.find((x) => x.id === cid)
    if (c) return { ...c, world: w }
  }
  return null
}
