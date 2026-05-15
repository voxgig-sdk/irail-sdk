<?php
declare(strict_types=1);

// Irail SDK utility: prepare_body

class IrailPrepareBody
{
    public static function call(IrailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
