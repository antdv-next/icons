/** @vitest-environment jsdom */

import { describe, expect, it } from 'vitest'
import { createApp, h } from 'vue'
import { AntdvNextOutlined } from '../src'

function renderToDom(component: any) {
  const host = document.createElement('div')
  const app = createApp({
    render: () => h(component),
  })
  app.mount(host)
  return { host, app }
}

describe('antdvNextOutlined custom icon', () => {
  it('renders an anticon span wrapping an svg', () => {
    const { host, app } = renderToDom(AntdvNextOutlined)
    const span = host.querySelector('span.anticon')
    const svg = host.querySelector('svg')

    expect(span).not.toBeNull()
    expect(span?.classList.contains('anticon-antdv-next')).toBe(true)
    expect(svg).not.toBeNull()
    // sizing handled by 1em like all ant-design icons
    expect(svg?.getAttribute('width')).toBe('1em')
    expect(svg?.getAttribute('height')).toBe('1em')
    // inherits color via currentColor (fills stripped during generation)
    expect(svg?.getAttribute('fill')).toBe('currentColor')
    expect(svg?.getAttribute('data-icon')).toBe('antdv-next')

    app.unmount()
  })

  it('strips gradients/defs and keeps the three brand paths', () => {
    const { host, app } = renderToDom(AntdvNextOutlined)

    expect(host.querySelectorAll('svg path')).toHaveLength(3)
    expect(host.querySelector('defs')).toBeNull()
    expect(host.querySelector('linearGradient')).toBeNull()
    // no per-path fills left -> everything inherits currentColor
    expect(host.querySelector('svg path[fill]')).toBeNull()

    app.unmount()
  })
})
