import { describe ,it,expect} from "vitest"
import { classNames, warning } from '@v-c/util'


describe("warning", () => {
    it('should test', () => {
      expect(true).toBeTruthy()
        warning(false,"sss")

    });
})