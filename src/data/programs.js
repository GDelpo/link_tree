import { LayoutGrid, Layers, Dumbbell, BicepsFlexed, Zap, Feather } from "lucide-react";
import { generateWhatsAppLink } from "./contact";

const rawPrograms = [
  {
    title: "REBUILD PROGRAM",
    description:"MEJORÁ TUS BÁSICOS, DESARROLLÁ MASA MUSCULAR Y MANTENETE ATLÉTICO",
    duration: "12 SEMANAS",
    Icon: Layers,
    gradientClasses: "from-blue-500 to-cyan-400",
  },
  {
    title: "BIGGER & ATHLETIC",
    description: "DESARROLLAR MASA MUSCULAR MANTENIENDOSE ATLÉTICO",
    duration: "9 / 12 SEMANAS",
    Icon: Dumbbell,
    gradientClasses: "from-red-500 to-orange-400",
  },
  {
    title: "SPEED LAB",
    description: "ACELERACIÓN, VELOCIDAD MAXIMA, CAMBIO DE DIRECCIÓN",
    duration: "6 / 9 SEMANAS",
    Icon: Zap,
    gradientClasses: "from-amber-400 to-yellow-300",
  },
  {
    title: "STRENGHT & POWER IN SEASON",
    description: "FUERZA - POTENCIA - HIPERTROFIA | EN TEMPORADA",
    duration: "8 / 12 SEMANAS",
    Icon: BicepsFlexed,
    gradientClasses: "from-emerald-500 to-green-400",
  },
  {
    title: "BEGINNER",
    description: "CONSTRUIR UNA BASE SÓLIDA DE FUERZA",
    duration: "8 SEMANAS",
    Icon: Feather,
    gradientClasses: "from-purple-500 to-indigo-400",
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
    link: generateWhatsAppLink(program.title),
  })),
};
