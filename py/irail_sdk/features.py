# Irail SDK feature factory

from irail_sdk.feature.base_feature import IrailBaseFeature
from irail_sdk.feature.test_feature import IrailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IrailBaseFeature(),
        "test": lambda: IrailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
