import { type Component, onMount } from 'solid-js'
import { useTheme } from '@/hooks/useTheme'

const Header: Component<{
  active: string
}> = (props) => {
  const { toggleTheme, initTheme } = useTheme()

  onMount(initTheme)

  const isActive = (path: string) => {
    return true
    return props.active === path
  }

  return (
    <div h-full py-4 box-border text-2xl flex="~ col items-center">
      <div flex="1">
        <a
          href="/posts"
          class={isActive('/blog') ? 'h-text-hl' : ''}
          title="Blog"
        >
          <div i-material-symbols:file-copy-outline-rounded></div>
        </a>
      </div>

      <div flex="~ col gap-y-2 items-center">
        <a p2 title="Toggle Theme" onClick={toggleTheme}>
          <div class="i-bi:sun-fill dark:i-bi:moon-fill"></div>
        </a>
        <a p2 pt0 href="//github.com/penjj" target="_blank" title="GitHub" text-0>
          <img src="/logo.png" w-8 h-8 rounded-full />
        </a>
      </div>
    </div>
  )
}

export default Header
