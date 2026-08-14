import type { App } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, h } from 'vue'
import Icon from '../src/components/Icon.tsx'
import createFromIconfontCN from '../src/components/IconFont.tsx'

const VIEWBOX_WARNING = 'Make sure that you provide correct `viewBox`'

function mount(render: () => any) {
  const app: App = createApp({ render })
  const root = document.createElement('div')
  document.body.appendChild(root)
  app.mount(root)
  return {
    root,
    unmount: () => {
      app.unmount()
      root.remove()
    },
  }
}

describe('iconfont viewBox warning (issue #3)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not warn for a single <use> child without viewBox', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const IconFont = createFromIconfontCN()
    const { root, unmount } = mount(() => h(IconFont, { type: 'icon-tuichu' }))

    const use = root.querySelector('svg use')
    expect(use?.getAttribute('xlink:href')).toBe('#icon-tuichu')
    expect(errorSpy.mock.calls.some(args => String(args[0]).includes(VIEWBOX_WARNING))).toBe(false)
    unmount()
  })

  it('still warns for a non-<use> child without viewBox', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { unmount } = mount(() => h(Icon, null, { default: () => h('path', { d: 'M0 0h1024v1024H0z' }) }))

    expect(errorSpy.mock.calls.some(args => String(args[0]).includes(VIEWBOX_WARNING))).toBe(true)
    unmount()
  })

  it('does not warn when viewBox is provided', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { unmount } = mount(() => h(Icon, { viewBox: '0 0 1024 1024' }, { default: () => h('path', { d: 'M0 0h1024v1024H0z' }) }))

    expect(errorSpy.mock.calls.some(args => String(args[0]).includes(VIEWBOX_WARNING))).toBe(false)
    unmount()
  })
})
