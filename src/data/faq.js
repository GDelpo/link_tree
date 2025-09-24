const rawFaq = [
  {
    title: "¿Cómo accedo al programa una vez que lo compro?",
    content:
      "Una vez completada la compra, recibirás un correo electrónico de confirmación con un enlace para acceder a todo el material del programa de forma inmediata. Podrás verlo online o descargarlo en tus dispositivos.",
  },
  {
    title: "¿Necesito equipamiento especial?",
    content:
      "La mayoría de mis programas están diseñados para ser flexibles. Algunos se pueden hacer solo con peso corporal, mientras que otros pueden requerir equipamiento básico como mancuernas o bandas de resistencia. Cada programa especifica claramente qué necesitas antes de comprarlo.",
  },
  {
    title: "¿Qué pasa si soy principiante?",
    content:
      "¡No hay problema! Tengo programas específicos para todos los niveles, desde principiantes absolutos hasta avanzados. Además, cada ejercicio incluye instrucciones detalladas y videos para asegurar que lo realices con la técnica correcta y de forma segura.",
  },
  {
    title: "¿Ofreces soporte si tengo dudas durante el programa?",
    content:
      "¡Claro que sí! Dependiendo del programa que elijas, tendrás acceso a soporte por correo electrónico o a una comunidad privada donde podrás hacer preguntas, compartir tu progreso y motivarte con otros miembros. Para un soporte 1-a-1, te recomiendo el plan personalizado.",
  },
];

export const faqData = rawFaq.map((item, index) => ({
  id: `faq-${index + 1}`,
  title: item.title,
  collapsibleContent: item.content,
}));
