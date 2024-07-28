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
        'h-text-hl': 'text-gray-7 dark:text-gray-4',
        'text-tertiary': 'text-#a3a3a3',
        'page-header': 'b-b bg-#fff dark:border-neutral-900',
        'page-main': 'bg-#fff dark:bg-black',
      },
      transformers: [transformerVariantGroup()],
      presets: [
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
