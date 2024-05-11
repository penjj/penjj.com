import { createEffect, createSignal } from 'solid-js'

export function useTheme() {
  const THEME_STORAGE_KEY = 'data-theme'
  const THEME_ATTRIBUTE = 'data-theme'

  const [theme, setTheme] = createSignal('auto')

  function isDark() {
    return document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark'
  }

  function initTheme() {
    createEffect(() => {
      let currentMode = theme()
      sessionStorage.setItem(THEME_STORAGE_KEY, currentMode)
      if (currentMode === 'auto') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)')
        currentMode = systemDark.matches ? 'dark' : 'light'
      }
      document.documentElement.setAttribute(THEME_ATTRIBUTE, currentMode)
    })
    setTheme(sessionStorage.getItem(THEME_STORAGE_KEY) || 'auto')
  }

  function toggle() {
    setTheme(isDark() ? 'light' : 'dark')
  }

  async function toggleTheme(event: MouseEvent) {
    // @ts-expect-error experimental API
    const isAppearanceTransition = document.startViewTransition

    if (!isAppearanceTransition)
      return toggle()

    const x = event.clientX
    const y = event.clientY

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(toggle)
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      const isDarkMode = isDark()
      document.documentElement.animate(
        {
          clipPath: isDarkMode ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: isDarkMode
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  }

  return {
    initTheme,
    toggleTheme,
  }
}
