# @antdv-next/icons

[![npm version](https://img.shields.io/npm/v/@antdv-next/icons.svg)](https://www.npmjs.com/package/@antdv-next/icons)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Ant Design icon components for Vue 3, built for [antdv-next](https://github.com/antdv-next/antdv-next). Ships all official [`@ant-design/icons-svg`](https://github.com/ant-design/ant-design-icons) icons (outlined / filled / two-tone) as tree-shakable Vue components, plus a few extra icons maintained in this repo.

## Install

```bash
pnpm add @antdv-next/icons
# or
npm install @antdv-next/icons
```

Requires `vue >= 3.2.0` as a peer dependency.

## Usage

```vue
<script setup lang="ts">
import { HomeOutlined, LoadingOutlined, SettingFilled, SmileTwoTone, SyncOutlined } from '@antdv-next/icons'
</script>

<template>
  <HomeOutlined />
  <SettingFilled />
  <SmileTwoTone two-tone-color="#eb2f96" />
  <SyncOutlined spin />
  <LoadingOutlined :rotate="180" :style="{ fontSize: '24px', color: '#08c' }" />
</template>
```

Icons are regular Vue components — `class`, `style` and DOM events fall through to the root `<span class="anticon">` element.

### Common props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spin` | `boolean` | `false` | Rotate the icon with an infinite spin animation |
| `rotate` | `number` | - | Rotate the icon by the given degrees (no animation) |
| `twoToneColor` | `string \| [string, string]` | `blue.primary` | Primary (and optional secondary) color, two-tone icons only |
| `tabIndex` | `number` | - | Tab index of the root element (defaults to `-1` when `onClick` is set) |

### Import a single icon

Every icon is also published as a standalone module, useful when you want to avoid the barrel file entirely:

```ts
import StarOutlined from '@antdv-next/icons/icons/StarOutlined'
```

`@antdv-next/icons/all` exports every icon component without the runtime helpers (`Icon` / `IconContextProvider` / `createFromIconfontCN` / two-tone utilities).

### Two-tone color

Set the global primary color for all two-tone icons:

```ts
import { getTwoToneColor, setTwoToneColor } from '@antdv-next/icons'

setTwoToneColor('#eb2f96')
getTwoToneColor() // '#eb2f96'
```

### Custom SVG icons

Use the default-exported `Icon` component to wrap your own SVG, either via the `component` prop or as children:

```vue
<script setup lang="ts">
import Icon from '@antdv-next/icons'
import HeartSvg from './HeartSvg.vue' // any component rendering an <svg>
</script>

<template>
  <Icon :component="HeartSvg" />
  <Icon view-box="0 0 24 24">
    <path d="M12 21l-8-8a5.5 5.5 0 118-6 5.5 5.5 0 118 6z" fill="currentColor" />
  </Icon>
</template>
```

When passing children, provide a correct `viewBox` (the warning about it is skipped only for the single-`<use>` iconfont case below).

### Use iconfont.cn

```vue
<script setup lang="ts">
import { createFromIconfontCN } from '@antdv-next/icons'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // also accepts string[]
})
</script>

<template>
  <IconFont type="icon-tuichu" />
</template>
```

### Global config (`IconContextProvider`)

```vue
<script setup lang="ts">
import { IconContextProvider } from '@antdv-next/icons'
</script>

<template>
  <IconContextProvider prefix-cls="my-icon" :csp="{ nonce: 'your-nonce' }">
    <App />
  </IconContextProvider>
</template>
```

| Prop | Type | Description |
| --- | --- | --- |
| `prefixCls` | `string` | Replace the default `anticon` class prefix |
| `rootClass` | `string` | Extra class added to every icon root element |
| `csp` | `{ nonce?: string }` | CSP nonce for the injected style tag |
| `layer` | `string` | Wrap the injected reset CSS in a CSS `@layer` |
| `zeroRuntime` | `boolean` | Skip runtime style injection entirely (extract the reset/spin CSS statically instead) |

### Extra icons

Icons that only exist in this repo (not in `@ant-design/icons-svg`) live under `extra-icons`. They are exported from the main entry as well:

```ts
import { AntdvNextOutlined } from '@antdv-next/icons'
// or
import { AntdvNextOutlined } from '@antdv-next/icons/extra-icons'
```

## Development

```bash
pnpm install
pnpm gen    # generate icon components (ant-design icons + custom svgs in src/svgs)
pnpm test   # vitest
pnpm build  # build dist (esm + umd)
```

## License

[MIT](./LICENSE)
