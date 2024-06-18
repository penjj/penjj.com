import type { Component } from 'solid-js'
import {} from 'algoliasearch'

const Search: Component = () => {
  return (
    <div
      class="input h-6!"
      lh-6
      text-center
      text-sm
      b="1px solid #d9d9d9"
    >
      <span flex="~ items-center justify-center">
        <div i-material-symbols:search inline-block text="xl gray-4">
        </div>
        <span pl1>penjj.fun</span>
      </span>
    </div>
  )
}

export default Search
