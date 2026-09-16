# Irail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IrailFeatures
  def self.make_feature(name)
    case name
    when "base"
      IrailBaseFeature.new
    when "ratelimit"
      IrailRatelimitFeature.new
    when "retry"
      IrailRetryFeature.new
    when "test"
      IrailTestFeature.new
    when "timeout"
      IrailTimeoutFeature.new
    else
      IrailBaseFeature.new
    end
  end
end
