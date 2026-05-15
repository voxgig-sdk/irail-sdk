# Irail SDK utility: make_context
require_relative '../core/context'
module IrailUtilities
  MakeContext = ->(ctxmap, basectx) {
    IrailContext.new(ctxmap, basectx)
  }
end
