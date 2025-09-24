const rawVideos = [
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
    title: "Rutina completa de tren superior",
    link: "#",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800",
    title: "Cómo mejorar tu sentadilla",
    link: "#",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800",
    title: "Cardio HIIT para quemar grasa",
    link: "#",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800",
    title: "Técnica correcta de Peso Muerto",
    link: "#",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1598266663999-e923235a3a8a?q=80&w=800",
    title: "Rutina de movilidad para atletas",
    link: "#",
  },
  {
    thumbnailUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800",
    title: "Plan de nutrición para ganar músculo",
    link: "#",
  },
];

export const youTubeVideos = rawVideos.map((video, index) => ({
  id: `yt-${index + 1}`,
  ...video,
}));
