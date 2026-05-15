-- Irail SDK error

local IrailError = {}
IrailError.__index = IrailError


function IrailError.new(code, msg, ctx)
  local self = setmetatable({}, IrailError)
  self.is_sdk_error = true
  self.sdk = "Irail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IrailError:error()
  return self.msg
end


function IrailError:__tostring()
  return self.msg
end


return IrailError
