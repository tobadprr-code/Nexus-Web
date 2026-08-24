import { MetadataRoute } from "next";

const siteUrl = "https://nexusdev.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "es-AR": siteUrl,
          en: siteUrl,
          "pt-BR": siteUrl,
        },
      },
    },
    // Cuando existan páginas propias (blog, casos de estudio, /nexus-webs,
    // /nexus-gym, /nexus-secure, etc.) cada una va acá como su propia
    // entrada, con su changeFrequency y priority según qué tan seguido cambia.
  ];
}
