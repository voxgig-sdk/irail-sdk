<?php
declare(strict_types=1);

// Irail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IrailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IrailBaseFeature();
            case "test":
                return new IrailTestFeature();
            default:
                return new IrailBaseFeature();
        }
    }
}
