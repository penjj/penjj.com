import type { Component } from 'solid-js'

function changeTheme(event: MouseEvent) {
  const { getItem, setItem } = sessionStorage
  const isLight = getItem('data-theme') === 'light'
  const theme = isLight ? 'dark' : 'light'

  setItem('data-theme', theme)
  document.documentElement.setAttribute('data-theme', theme)

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${endRadius}px at ${x}px ${y}px)`,
  ]
  document.documentElement.animate(
    {
      clipPath: isLight ? clipPath : [...clipPath].reverse(),
    },
    {
      duration: 400,
      easing: 'ease-out',
      pseudoElement: isLight
        ? '::view-transition-new(root)'
        : '::view-transition-old(root)',
    }
  )
}

const Header: Component<{
  active: string
}> = props => {
  const isActive = (path: string) => {
    return props.active === path
  }

  return (
    <header
      class="
        flex justify-between items-center h-16 shadow-md transition-all
        pl-3  select-none
        sm:(shadow-none h-20 px-4)
      "
    >
      <a href="/" title="Penjj's home">
        <img class="w-10 h-10 rounded-full" src="/favicon.ico" />
      </a>
      <nav class="flex items-center gap-4 h-text sm:gap-12">
        <a
          href="/blogs"
          class={isActive('/blogs') ? 'h-text-hl' : ''}
          title="Blog"
        >
          <span>Blog</span>
        </a>
        <a
          href="/projects"
          class={isActive('/projects') ? 'h-text-hl' : ''}
          title="Project"
        >
          <span>Projects</span>
        </a>
        <div class="flex gap-5 text-xl mr-3">
          <a
            title="Contact with me"
            class={isActive('/contact') ? 'h-text-hl' : ''}
            href="/contact"
          >
            <div class="i-bi:wechat"></div>
          </a>
          <a title="Toggle Theme" onClick={changeTheme}>
            <div class="i-bi:sun-fill dark:i-bi:cloud-moon-fill"></div>
          </a>
          <a href="//github.com/penjj" target="_blank" title="GitHub">
            <div class="i-bi:github" />
          </a>
        </div>
      </nav>
    </header>
  )
}

export { Header as default }
