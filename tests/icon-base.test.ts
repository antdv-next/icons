/** @vitest-environment node */

import StarFilledSvg from '@ant-design/icons-svg/es/asn/StarFilled.js'
import { describe, expect, it } from 'vitest'
import { unwrapIconDefinition } from '../src/components/IconBase.tsx'

describe('unwrapIconDefinition', () => {
  it('returns icon definition directly when input is IconDefinition', () => {
    const resolved = unwrapIconDefinition(StarFilledSvg)
    expect(resolved?.name).toBe('star')
    expect(resolved?.theme).toBe('filled')
  })

  it('returns icon definition from default namespace object', () => {
    const resolved = unwrapIconDefinition({ default: StarFilledSvg })
    expect(resolved?.name).toBe('star')
    expect(resolved?.theme).toBe('filled')
  })

  it('returns undefined for invalid icon payload', () => {
    expect(unwrapIconDefinition(undefined)).toBeUndefined()
    expect(unwrapIconDefinition({} as any)).toBeUndefined()
    expect(unwrapIconDefinition({ default: {} } as any)).toBeUndefined()
  })
})
