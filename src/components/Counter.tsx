import { type Component, createSignal, type ParentProps } from 'solid-js'

import './Counter.css'

const Counter: Component<ParentProps> = props => {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div class="counter">
        <button onClick={() => setCount(count() - 1)}>-</button>
        <pre>{count()}</pre>
        <button class="btn btn-primary" onClick={() => setCount(count() + 1)}>
          +
        </button>
      </div>
      <div class="counter-message">{props.children}</div>
    </>
  )
}

export { Counter as default }
