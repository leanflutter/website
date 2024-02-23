import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

const googleAnalyticsId = "G-10PX6JWP7L";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "LeanFlutter",
      logo: {
        src: "./src/assets/logo.png",
      },
      editLink: {
        baseUrl: "https://github.com/leanflutter/website/tree/main/",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        "zh-hans": {
          label: "简体中文",
          lang: "zh-hans",
        },
      },
      social: {
        github: "https://github.com/leanflutter",
        discord: "https://discord.com/invite/zPa6EZ2jqb",
      },
      sidebar: [
        {
          label: "Guides",
          translations: { "zh-hans": "指南" },
          items: [
            {
              label: "Getting started",
              link: "/getting-started/",
              translations: { "zh-hans": "开始" },
            },
          ],
        },
      ],
      components: {
        SiteTitle: "./src/components/starlight/SiteTitle.astro",
      },
      customCss: ["./src/tailwind.css"],
      head: [
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
            src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
            async: true,
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
          },
          content: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `,
        },
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
