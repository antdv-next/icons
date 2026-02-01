import type { AbstractNode, IconDefinition } from '@ant-design/icons-svg/lib/types'
import type { CSSProperties, Ref } from 'vue'
import { generate as generateColor } from '@ant-design/colors'
import { updateCSS } from '@v-c/util/dist/Dom/dynamicCSS'
import { getShadowRoot } from '@v-c/util/dist/Dom/shadow'
import { warningOnce } from '@v-c/util/dist/warning'
import { h, nextTick, onMounted } from 'vue'
import { useIconContext } from './components/Context.tsx'

function camelCase(input: string) {
  return input.replace(/-(.)/g, (_match, g) => g.toUpperCase())
}

export function warning(valid: boolean, message: string) {
  warningOnce(valid, `[@antdv-next/icons] ${message}`)
}

export function isIconDefinition(target: any): target is IconDefinition {
  return (
    typeof target === 'object'
    && typeof target.name === 'string'
    && typeof target.theme === 'string'
    && (typeof target.icon === 'object' || typeof target.icon === 'function')
  )
}

export function normalizeAttrs(attrs: Attrs = {}): Attrs {
  return Object.keys(attrs).reduce((acc: Attrs, key) => {
    const val = attrs[key]
    switch (key) {
      case 'class':
        // @ts-expect-error this
        acc.className = val
        delete acc.class
        break
      default:
        delete acc[key]
        // @ts-expect-error this
        acc[camelCase(key)] = val
    }
    return acc
  }, {})
}

export type Attrs = Record<string, string>
interface RootProps {
  [key: string]: string | number | CSSProperties
}

export function generate(node: AbstractNode, key: string, rootProps?: RootProps | false): any {
  if (!rootProps) {
    return h(
      node.tag,
      { key, ...node.attrs },
      (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
    )
  }
  return h(
    node.tag,
    {
      key,
      ...rootProps,
      ...node.attrs,
    },
    (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
  )
}

export function getSecondaryColor(primaryColor: string): string {
  // choose the second color
  return generateColor(primaryColor)[0]!
}

export function normalizeTwoToneColors(
  twoToneColor: string | [string, string] | undefined,
): string[] {
  if (!twoToneColor) {
    return []
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor]
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  'width': '1em',
  'height': '1em',
  'fill': 'currentColor',
  'aria-hidden': 'true',
  'focusable': 'false',
}

export const iconStyles = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`

export function useInsertStyles(eleRef: Ref<HTMLDivElement | HTMLElement | undefined>) {
  const iconContext = useIconContext()
  let mergedStyleStr = iconStyles

  onMounted(async () => {
    await nextTick()
    const { prefixCls, csp, layer } = iconContext.value
    if (prefixCls) {
      mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls)
    }

    if (layer) {
      mergedStyleStr = `@layer ${layer} {\n${mergedStyleStr}\n}`
    }
    const ele = eleRef.value
    const shadowRoot = getShadowRoot(ele!)

    updateCSS(mergedStyleStr, '@ant-design-icons', {
      prepend: !layer,
      csp,
      attachTo: shadowRoot!,
    })
  })
}
