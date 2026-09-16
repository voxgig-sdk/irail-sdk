# Irail SDK feature factory

from irail_sdk.feature.base_feature import IrailBaseFeature
from irail_sdk.feature.ratelimit_feature import IrailRatelimitFeature
from irail_sdk.feature.retry_feature import IrailRetryFeature
from irail_sdk.feature.test_feature import IrailTestFeature
from irail_sdk.feature.timeout_feature import IrailTimeoutFeature


_FEATURES = {
    "base": lambda: IrailBaseFeature(),
    "ratelimit": lambda: IrailRatelimitFeature(),
    "retry": lambda: IrailRetryFeature(),
    "test": lambda: IrailTestFeature(),
    "timeout": lambda: IrailTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
