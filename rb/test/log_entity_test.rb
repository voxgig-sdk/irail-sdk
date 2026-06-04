# Log entity test

require "minitest/autorun"
require "json"
require_relative "../Irail_sdk"
require_relative "runner"

class LogEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IrailSDK.test(nil, nil)
    ent = testsdk.Log(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = log_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "log." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IRAIL_TEST_LOG_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    log_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.log")))
    log_ref01_data = nil
    if log_ref01_data_raw.length > 0
      log_ref01_data = Helpers.to_map(log_ref01_data_raw[0][1])
    end

    # LIST
    log_ref01_ent = client.Log(nil)
    log_ref01_match = {}

    log_ref01_list_result, err = log_ref01_ent.list(log_ref01_match, nil)
    assert_nil err
    assert log_ref01_list_result.is_a?(Array)

  end
end

def log_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "log", "LogTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IrailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["log01", "log02", "log03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IRAIL_TEST_LOG_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IRAIL_TEST_LOG_ENTID" => idmap,
    "IRAIL_TEST_LIVE" => "FALSE",
    "IRAIL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["IRAIL_TEST_LOG_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IRAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = IrailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IRAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IRAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
