const rawFaq = [
  {
    title: "¿Cómo accedo a un programa una vez que lo compro?",
    content:
      "Una vez completada la compra, recibirás un correo electrónico de confirmación con la información para acceder al programa.",
  },
  {
    title: "¿Necesito algún equipamiento especial?",
    content:
      "En cuanto a los programas de entrenamiento de la fuerza (Bigger & Athletic, Rebuild, Strenght & Power y Beginner), están diseñados para realizar con pesos libres (barras, mancuernas) y pelotas de lanzamiento (medicine ball). Pero esto es flexible, si no contas con los mismos, podes hacer variantes similares, como puede ser utilizar poleas o máquinas en lugar de mancuernas. En cuanto al programa de velocidad (Speed Lab), solo necesitas algo que te sirva para tener referencia de los espacios, como puede ser conos.",
  },
  {
    title: "¿Quién puede hacer los programas?",
    content:
      "Hay programas para todos los niveles, desde principiantes hasta experimentados/avanzados. Además, a través de la aplicación podes acceder al plan, en el cual cada ejercicio incluye videos y notas (en caso que sean necesarias) para asegurar que comprendas todo de la mejor manera posible.",
  },
  {
    title: "¿En qué momento del año puedo hacer los programas?",
    content:
      'Si sos deportista, juvenil o adulto, y competís semanalmente, hay ciertos programas que, por su demanda física, lo mejor es hacerlos fuera de temporada, estos son "Rebuild" y "Bigger & Athletic". En cambio, si estás en plena competencia, te recomiendo optar por los programas "Strenght & Power" o "Beginner", este último en caso que te estés iniciando en el entrenamiento de la fuerza. Por último, el programa Speed Lab podés realizarlo dentro o fuera del período competitivo.',
  },
  {
    title: "¿Ofreces soporte si tengo dudas durante el programa?",
    content:
      "Por supuesto que si no comprendés algo, podes escribirme a mi whatsapp. Para un seguimiento y feedback adicional sobre tu técnica, etiquétame en una historia de Instagram mientras entrenas, y revisaré tu ejecución para ayudarte en caso que sea necesario..",
  },
  {
    title: "¿Cuánto duran los programas de entrenamiento?",
    content:
      "¡Los programas con foco en el entrenamiento de la fuerza duran 8-9 a 12 semanas por lo general, mientras que el programa Speed Lab (velocidad) se encuentra disponible en su modalidad de 6 o 9 semanas.",
  },
];

export const faqData = rawFaq.map((item, index) => ({
  id: `faq-${index + 1}`,
  title: item.title,
  collapsibleContent: item.content,
}));
