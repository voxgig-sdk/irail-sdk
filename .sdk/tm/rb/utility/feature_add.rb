# Irail SDK utility: feature_add
module IrailUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
