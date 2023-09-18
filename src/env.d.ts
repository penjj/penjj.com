/// <reference types="astro/client" />

import type { AttributifyAttributes } from '@unocss/preset-attributify'

// attributify ts supports for unocss
declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      [key: string]: any
    }
  }
}

// attributify ts supports for unocss
declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      [key: string]: any
    }
  }
}
