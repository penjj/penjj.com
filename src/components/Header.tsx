import { onMount, type Component } from 'solid-js'
import { useTheme } from '@/hooks/useTheme'

const Header: Component<{
  active: string
}> = props => {
  const { toggleTheme, initTheme } = useTheme()

  const isActive = (path: string) => {
    return props.active.startsWith(path)
  }

  onMount(initTheme)

  return (
    <header
      class="
        flex justify-between items-center h-16 shadow-md transition-all
        pl-3  select-none
        sm:(shadow-none h-20 px-4)
      "
    >
      <a href="/" title="Penjj's home">
        <img class="w-10 h-10 rounded-full" src="/logo.png" />
      </a>
      <nav class="flex items-center gap-4 h-text sm:gap-12">
        <a
          href="/blog"
          class={isActive('/blog') ? 'h-text-hl' : ''}
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
          <a title="Toggle Theme" onClick={toggleTheme}>
            <div class="i-bi:sun-fill dark:i-bi:moon-fill"></div>
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
