
import { Context } from './Context'


class IrailError extends Error {

  isIrailError = true

  sdk = 'Irail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IrailError
}

