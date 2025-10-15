import { LayoutGrid, Layers, Dumbbell, BicepsFlexed, Zap, Feather } from "lucide-react";

// Utilidades extraídas a utils para mantener este archivo sólo con data
import { createProgram, PROGRAM_EMOJIS } from '@/utils/programUtils.js';
export { getSmartPrice, getSmartPriceDisplay } from '@/utils/programUtils.js';

// 📊 DATOS ÚNICOS DE CADA PROGRAMA (solo lo que cambia)
const PROGRAMS_CONFIG = {
  "REBUILD PROGRAM": {
    emoji: PROGRAM_EMOJIS.strength,
    shortDescription: "MEJORÁ TUS BÁSICOS, DESARROLLÁ MASA MUSCULAR Y MANTENETE ATLÉTICO",
    duration: "12 SEMANAS",
    frequency: "4 estímulos de fuerza / 1 estímulo de velocidad",
    price: {
      options: {
        default: {
          regular: { local: "$110.000", international: "U$80" },
          specialOffer: { local: "$85.000", international: "U$65" },
        }
      }
    },
    Icon: Layers,
    gradientClasses: "from-blue-500 to-cyan-400",
    targetAudience: "Atletas que buscan mejorar ejercicios básicos y desarrollar masa muscular fuera de temporada",
    description: [
      "Rebuild es un programa diseñado para hacer fuera de la temporada deportiva, 4 o 5 veces por semana. Basado en los principios del entrenamiento, el objetivo principal es mejorar los ejercicios básicos (sentadilla, peso muerto, banco plano) y desarrollar la masa muscular, sin perder la condición atlética.",
      "¿Sentís que no progresás en tus ejercicios básicos o en la ganancia de masa muscular? Con este programa, compuesto por trabajos de fuerza, hipertrofia y potencia, vamos a salir de lo tradicional y romper tu estancamiento."
    ],
    
  },

  "BIGGER & ATHLETIC": {
    emoji: PROGRAM_EMOJIS.athletic,
    shortDescription: "DESARROLLAR MASA MUSCULAR MANTENIENDOSE ATLÉTICO",
    duration: "9 / 12 SEMANAS",
    frequency: "4 estímulos por semana",
    price: {
      options: {
        "9weeks": { regular: { local: "$56.000", international: "U$40" } },
        "12weeks": { regular: { local: "$70.000", international: "U$50" } },
      }
    },
    Icon: Dumbbell,
    gradientClasses: "from-red-500 to-orange-400",
    targetAudience: "Atletas estancados que buscan aumentar fuerza máxima y crecer muscularmente",
    description: [
      "Bigger & Athletic es un programa basado en los principios del entrenamiento, diseñado para hacer 3 o 4 veces por semana, idealmente fuera de la temporada deportiva. El objetivo principal es desarrollar la masa muscular, sin perder la condición atlética.",
      "Si venís estancado en tu objetivo de aumentar la fuerza máxima o crecer muscularmente, este programa, compuesto por trabajos de fuerza, hipertrofia y potencia, te va a permitir dar el salto."
    ]
  },

  "STRENGHT & POWER IN SEASON": {
    emoji: PROGRAM_EMOJIS.strength,
    shortDescription: "FUERZA - POTENCIA - HIPERTROFIA | EN TEMPORADA",
    duration: "8 / 12 SEMANAS",
    frequency: "3 estímulos por semana",
    price: {
      options: {
        "8weeks": { regular: { local: "$56.000", international: "U$40" } },
        "12weeks": { regular: { local: "$70.000", international: "U$50" } },
      }
    },
    Icon: BicepsFlexed,
    gradientClasses: "from-emerald-500 to-green-400",
    targetAudience: "Atletas en temporada deportiva que buscan mantener y mejorar capacidades físicas",
    description: [
      "Strength & Power es un programa, diseñado para realizarse 3 veces por semana durante la temporada deportiva, permitiendo a los atletas mejorar su fuerza, potencia, salud tendinosa y masa muscular de forma equilibrada.",
      "Este programa está basado en los principios del entrenamiento, y especialmente estructurado para integrarse en la temporada deportiva, donde los atletas pueden trabajar estos aspectos de manera equilibrada y progresiva. En cada día se trabaja la potencia, la fuerza máxima y la hipertrofia, asegurando que todas las capacidades físicas se desarrollen de manera integral y equilibrada."
    ],
    equipment: [
      "Peso libre (barras y mancuernas)",
      "Pelotas de lanzamiento",
      "Herramientas de reemplazo para ejercicios según necesidades"
    ]
  },

  "SPEED LAB": {
    emoji: PROGRAM_EMOJIS.speed,
    shortDescription: "ACELERACIÓN, VELOCIDAD MÁXIMA, CAMBIO DE DIRECCIÓN",
    duration: "6 / 9 SEMANAS",
    frequency: "3 estímulos por semana",
    price: {
      options: {
        "6weeks": { regular: { local: "$40.000", international: "U$35" } },
        "9weeks": { regular: { local: "$50.000", international: "U$40" } },
      }
    },
    Icon: Zap,
    gradientClasses: "from-amber-400 to-yellow-300",
    targetAudience: "Atletas que buscan desarrollar condición atlética y velocidad para rendimiento deportivo",
    description: [
      "Speed Lab es el programa de entrenamiento especializado en desarrollar tu condición atlética a través de un enfoque en la aceleración, velocidad máxima y el cambio de dirección, entendiendo a estas últimas como cualidades claves en el rendimiento deportivo.",
      "Mejora tu velocidad máxima: esta cualidad es determinante en el rendimiento deportivo. Además, es la herramienta número 1 para disminuir el riesgo a sufrir lesiones musculares, sobre todo en la musculatura isquiotibial.",
      "Acelerar, desacelerar y cambiar de dirección son las acciones que predominan en gran parte en la mayoría de los deportes de situación. Dominar estas 2 a través de distintos driles y ejercicios, te va a ayudar a moverte con mayor precisión y rapidez."
    ],
    equipment: [
      "Implementos atléticos (conos, escalera)",
      "Espacio para correr y cambios de dirección"
    ],
    specialNote: "Speed Lab es una herramienta para convertirte en un atleta de verdad, que pueda rendir dentro del campo de juego."
  },

  "BEGINNER": {
    emoji: PROGRAM_EMOJIS.beginner,
    shortDescription: "CONSTRUIR UNA BASE SÓLIDA DE FUERZA",
    duration: "8 SEMANAS",
    frequency: "3 estímulos por semana",
    price: {
      options: {
        default: { regular: { local: "$56.000", international: "U$40" } },
      }
    },
    Icon: Feather,
    gradientClasses: "from-purple-500 to-indigo-400",
    targetAudience: "Aquellos que no tienen tanta experiencia en el entrenamiento de la fuerza y necesitan ordenarse",
    description: [
      "Beginner está diseñado para aquellos que no tienen tanta experiencia en el entrenamiento de la fuerza y necesitan ordenarse. Basado en principios sólidos del entrenamiento de la fuerza, la idea es progresar abarcando todos los patrones de movimiento, sin dejar de lado ningún músculo.",
      "La fuerza es la capacidad madre, a partir de mejorar esta, podemos crecer en otros aspectos, como la velocidad, resistencia, masa muscular, etc. Este programa, a través de un enfoque gradual, permite crear una base sólida de esta capacidad tan importante, a través del desarrollo de la fuerza máxima y la hipertrofia."
    ]
  }
};

// 🚀 Generar programas usando la factory function
export const programsData = Object.keys(PROGRAMS_CONFIG).reduce((acc, key) => {
  acc[key] = createProgram(key, PROGRAMS_CONFIG[key]);
  return acc;
}, {});

// Datos para la sección de programas (compatibilidad con estructura existente)
const rawPrograms = [
  {
    title: "REBUILD PROGRAM",
    description: programsData["REBUILD PROGRAM"].shortDescription,
    duration: programsData["REBUILD PROGRAM"].duration,
    Icon: programsData["REBUILD PROGRAM"].Icon,
    gradientClasses: programsData["REBUILD PROGRAM"].gradientClasses,
  },
  {
    title: "BIGGER & ATHLETIC",
    description: programsData["BIGGER & ATHLETIC"].shortDescription,
    duration: programsData["BIGGER & ATHLETIC"].duration,
    Icon: programsData["BIGGER & ATHLETIC"].Icon,
    gradientClasses: programsData["BIGGER & ATHLETIC"].gradientClasses,
  },
  {
    title: "SPEED LAB",
    description: programsData["SPEED LAB"].shortDescription,
    duration: programsData["SPEED LAB"].duration,
    Icon: programsData["SPEED LAB"].Icon,
    gradientClasses: programsData["SPEED LAB"].gradientClasses,
  },
  {
    title: "STRENGHT & POWER IN SEASON",
    description: programsData["STRENGHT & POWER IN SEASON"].shortDescription,
    duration: programsData["STRENGHT & POWER IN SEASON"].duration,
    Icon: programsData["STRENGHT & POWER IN SEASON"].Icon,
    gradientClasses: programsData["STRENGHT & POWER IN SEASON"].gradientClasses,
  },
  {
    title: "BEGINNER",
    description: programsData["BEGINNER"].shortDescription,
    duration: programsData["BEGINNER"].duration,
    Icon: programsData["BEGINNER"].Icon,
    gradientClasses: programsData["BEGINNER"].gradientClasses,
  },
];

export const programsSectionData = {
  id: "programs-section",
  title: "Programas de Entrenamiento",
  icon: LayoutGrid,
  description: 'Explorá mis programas diseñados científicamente para ayudarte a alcanzar tus metas, sea cual sea tu nivel.',
  content: rawPrograms.map((program, index) => ({
    id: `prog-${index + 1}`,
    ...program,
    // Agregar referencia a datos detallados
    detailedInfo: programsData[program.title] || null,
  })),
};

export default programsSectionData;