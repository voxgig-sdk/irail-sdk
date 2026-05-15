# Irail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IrailFeatures
  def self.make_feature(name)
    case name
    when "base"
      IrailBaseFeature.new
    when "test"
      IrailTestFeature.new
    else
      IrailBaseFeature.new
    end
  end
end
