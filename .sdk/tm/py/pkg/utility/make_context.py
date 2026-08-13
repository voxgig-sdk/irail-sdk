# Irail SDK utility: make_context

from projectname_sdk.core.context import IrailContext


def make_context_util(ctxmap, basectx):
    return IrailContext(ctxmap, basectx)
