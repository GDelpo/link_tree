const rawPosts = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1581009137052-c40971b43bf3?q=80&w=800",
    caption: "Post 1",
    link: "#",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
    caption: "Post 2",
    link: "#",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800",
    caption: "Post 3",
    link: "#",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1594737625787-a8a121c44856?q=80&w=800",
    caption: "Entrenamiento con Kettlebell",
    link: "#",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1554344729-28a838599492?q=80&w=800",
    caption: "Tips para corredores",
    link: "#",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1574680096145-f844349f0409?q=80&w=800",
    caption: "Fundamentos del boxeo",
    link: "#",
  },
];

export const instagramPosts = rawPosts.map((post, index) => ({
  id: `inst-${index + 1}`,
  ...post,
}));
