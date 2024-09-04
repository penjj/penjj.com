import { defineConfig, passthroughImageService } from 'astro/config'
import solid from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import unocss from 'unocss/astro'
import nested from 'postcss-nested'
import cssnano from 'cssnano'
import {
  presetAttributify,
  presetIcons,
  presetMini,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss'

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [nested as any, cssnano],
      },
    },
  },
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      wrap: true,
      theme: 'vitesse-dark',
    },
    syntaxHighlight: 'shiki',
  },
  server: {
    host: true,
  },
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    solid(),
    unocss({
      injectReset: true,
      shortcuts: {
        'text-primary': 'dark:text-#fdfdfd light:text-#161616',
        'text-tertiary': 'dark:text-#a3a3a3 light:text-#6f6f6f',
        'page-header': 'dark:(b-b-1 border-neutral-900) light:(b-b-1 bg-#fff)',
        'page-main': 'dark:bg-black light:bg-#fff',
      },
      transformers: [transformerVariantGroup()],
      presets: [
        // presetForme(),
        presetAttributify(),
        presetMini({
          dark: {
            light: '[data-theme=light]',
            dark: '[data-theme=dark]',
          },
        }),
        presetIcons({
          autoInstall: true,
        }),
        presetWebFonts(),
      ],
    }),
  ],
})
