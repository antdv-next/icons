import { warning } from '@v-c/util'
import { describe, expect, it } from 'vitest'

describe('warning', () => {
  it('should test', () => {
    expect(true).toBeTruthy()
    warning(false, 'sss')
  })
})
