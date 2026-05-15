# ProjectName SDK exists test

import pytest
from irail_sdk import IrailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IrailSDK.test(None, None)
        assert testsdk is not None
