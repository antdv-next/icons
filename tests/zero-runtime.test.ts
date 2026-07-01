/** @vitest-environment jsdom */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createApp, h, nextTick } from 'vue'
import { IconContextProvider, SmileOutlined } from '../src'

// useInsertStyles injects the icon reset CSS inside an async onMounted (await
// nextTick -> updateCSS), so flush both the Vue tick and a macrotask.
async function flush() {
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 0))
}

function renderWithContext(contextProps: Record<string, any>) {
  const host = document.createElement('div')
  const app = createApp({
    render: () => h(IconContextProvider, contextProps, { default: () => h(SmileOutlined) }),
  })
  app.mount(host)
  return { host, app }
}

describe('zeroRuntime', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.head.innerHTML = ''
    document.body.innerHTML = ''
  })

  it('should not inject styles when zeroRuntime is true', async () => {
    const { app } = renderWithContext({ zeroRuntime: true })
    await flush()
    expect(document.head.querySelector('style')).toBeFalsy()
    app.unmount()
  })

  it('should still inject styles when zeroRuntime is false', async () => {
    const { app } = renderWithContext({ zeroRuntime: false })
    await flush()
    expect(document.head.querySelector('style')).toBeTruthy()
    app.unmount()
  })

  it('should still inject styles when zeroRuntime is not set', async () => {
    const { app } = renderWithContext({})
    await flush()
    expect(document.head.querySelector('style')).toBeTruthy()
    app.unmount()
  })
})
