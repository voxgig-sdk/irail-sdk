# Irail SDK utility: prepare_body
require_relative 'media'
module IrailUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IrailUtilities.raw_body(ctx.reqdata) if IrailUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
