<?php
declare(strict_types=1);

// Irail SDK utility: feature_add

class IrailFeatureAdd
{
    public static function call(IrailContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
