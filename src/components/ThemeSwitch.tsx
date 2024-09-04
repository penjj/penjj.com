import type { VoidComponent } from 'solid-js'

const THEME_STORAGE_KEY = 'data-theme'
const THEME_ATTRIBUTE = 'data-theme'

function getCurrentTheme() {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE)
}
function isDark() {
  return getCurrentTheme() === 'dark'
}

function toggle() {
  const nextMode = isDark() ? 'light' : 'dark'
  document.documentElement.setAttribute(THEME_ATTRIBUTE, nextMode)
  localStorage.setItem(THEME_STORAGE_KEY, nextMode)
}

function toggleTheme({ clientX: x, clientY: y }: MouseEvent) {
  // @ts-expect-error experimental API
  if (!document.startViewTransition)
    return toggle()

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

export const ThemeSwitch: VoidComponent = () => {
  return (
    <a title="Toggle Theme" text-6 onClick={toggleTheme}>
      <div class="dark:i-material-symbols-light:dark-mode-outline-rounded i-material-symbols-light:light-mode-rounded"></div>
    </a>
  )
}
