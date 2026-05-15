package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/irail-sdk"
	"github.com/voxgig-sdk/irail-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestOccupancyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Occupancy(nil)
		if ent == nil {
			t.Fatal("expected non-nil OccupancyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := occupancyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "occupancy." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IRAIL_TEST_OCCUPANCY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		occupancyRef01Ent := client.Occupancy(nil)
		occupancyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "occupancy"}, setup.data), "occupancy_ref01"))

		occupancyRef01DataResult, err := occupancyRef01Ent.Create(occupancyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		occupancyRef01Data = core.ToMapAny(occupancyRef01DataResult)
		if occupancyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func occupancyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "occupancy", "OccupancyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read occupancy test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse occupancy test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"occupancy01", "occupancy02", "occupancy03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IRAIL_TEST_OCCUPANCY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IRAIL_TEST_OCCUPANCY_ENTID": idmap,
		"IRAIL_TEST_LIVE":      "FALSE",
		"IRAIL_TEST_EXPLAIN":   "FALSE",
		"IRAIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IRAIL_TEST_OCCUPANCY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IRAIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IRAIL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIrailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IRAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IRAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
