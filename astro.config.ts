import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import unocss from 'unocss/astro'

import { presetDaisy } from 'unocss-preset-daisy'
import {
  presetAttributify,
  presetMini,
  presetIcons,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss'

// https://astro.build/config
export default defineConfig({
  server: {
    open: true,
  },
  integrations: [
    mdx(),
    solid(),
    unocss({
      injectReset: true,
      transformers: [transformerVariantGroup()],
      presets: [
        presetDaisy({
          themes: ['light', 'dark'],
        }),
        presetAttributify(),
        presetMini(),
        presetIcons({
          autoInstall: true,
        }),
        presetWebFonts(),
      ],
    }),
  ],
})
