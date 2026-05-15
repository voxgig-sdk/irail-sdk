<?php
declare(strict_types=1);

// Irail SDK exists test

require_once __DIR__ . '/../irail_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IrailSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
