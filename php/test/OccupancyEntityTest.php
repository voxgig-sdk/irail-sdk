<?php
declare(strict_types=1);

// Occupancy entity test

require_once __DIR__ . '/../irail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OccupancyEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IrailSDK::test(null, null);
        $ent = $testsdk->Occupancy(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = occupancy_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "occupancy." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IRAIL_TEST_OCCUPANCY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $occupancy_ref01_ent = $client->Occupancy(null);
        $occupancy_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.occupancy"), "occupancy_ref01"));

        [$occupancy_ref01_data_result, $err] = $occupancy_ref01_ent->create($occupancy_ref01_data, null);
        $this->assertNull($err);
        $occupancy_ref01_data = Helpers::to_map($occupancy_ref01_data_result);
        $this->assertNotNull($occupancy_ref01_data);

    }
}

function occupancy_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/occupancy/OccupancyTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IrailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["occupancy01", "occupancy02", "occupancy03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IRAIL_TEST_OCCUPANCY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IRAIL_TEST_OCCUPANCY_ENTID" => $idmap,
        "IRAIL_TEST_LIVE" => "FALSE",
        "IRAIL_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IRAIL_TEST_OCCUPANCY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IRAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new IrailSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IRAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IRAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
