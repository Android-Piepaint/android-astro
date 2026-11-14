export interface GalleryItem {
  file: string;      // filename inside src/assets/gallery/
  date: string;      // YYYY-MM-DD
  caption: string;
}

export const gallery: GalleryItem[] = [
  { file: "minecraft-niri.png",  date: "2026-08-20", caption: "Niri Railway Station in my Minecraft subway map." },
  { file: "mtp8750-front-view.jpg", date: "2025-12-11", caption: "Qualcomm's SM8750 MTP engineering device." },
  { file: "mtp8750-axis-view.jpg", date: "2025-12-11", caption: "Qualcomm's SM8750 MTP engineering device." },
  { file: "mtp8750-front-view-2.jpg", date: "2025-12-11", caption: "Qualcomm's SM8750 MTP engineering device." },
  { file: "sdm845-imagination.jpg", date: "2025-10-16", caption: "Qualcomm's SDM845 MTP engineering device." },
  { file: "mtp8750-front-view-2.png", date: "2026-08-16", caption: "Qualcomm's SM8750 MTP booting." },
  { file: "mtp8750-linux4.jpg", date: "2026-11-14", caption: "Qualcomm's SM8750 MTP, with Arch Linux Arm ported." },
  { file: "mtp8750-linux2.jpg", date: "2026-11-14", caption: "Qualcomm's SM8750 MTP, with Arch Linux Arm ported. Using AGC camera and darkLeica filter." },
  { file: "mtp8750-linux5.jpg", date: "2026-11-14", caption: "Qualcomm's SM8750 MTP at a different angle." },
  { file: "mtp8750-linux3.jpg", date: "2026-11-14", caption: "Qualcomm's SM8750 MTP, with GNOME displayed." },
  { file: "fajita-arch-linux.jpeg", date: "2024-07-20", caption: "Oneplus 6T with Arch Linux installed." },
  { file: "minecraft-railway.png", date: "2026-08-20", caption: "Part of my Napali -- Wayland Express Line in Minecraft." },
];