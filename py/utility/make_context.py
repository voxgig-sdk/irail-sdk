# Irail SDK utility: make_context

from core.context import IrailContext


def make_context_util(ctxmap, basectx):
    return IrailContext(ctxmap, basectx)
