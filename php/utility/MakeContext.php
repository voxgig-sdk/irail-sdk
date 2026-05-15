<?php
declare(strict_types=1);

// Irail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IrailMakeContext
{
    public static function call(array $ctxmap, ?IrailContext $basectx): IrailContext
    {
        return new IrailContext($ctxmap, $basectx);
    }
}
