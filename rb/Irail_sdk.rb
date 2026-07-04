# Irail SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Irail_types'


class IrailSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = IrailUtility.new
    @_utility = utility

    config = IrailConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = IrailHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = IrailHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, IrailFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    IrailUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = IrailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = IrailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = IrailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = IrailSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue IrailError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = IrailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = IrailHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.composition.list / client.composition.load({ "id" => ... })
  def composition
    require_relative 'entity/composition_entity'
    @composition ||= CompositionEntity.new(self, nil)
  end

  # Deprecated: use client.composition instead.
  def Composition(data = nil)
    require_relative 'entity/composition_entity'
    CompositionEntity.new(self, data)
  end


  # Idiomatic facade: client.connection.list / client.connection.load({ "id" => ... })
  def connection
    require_relative 'entity/connection_entity'
    @connection ||= ConnectionEntity.new(self, nil)
  end

  # Deprecated: use client.connection instead.
  def Connection(data = nil)
    require_relative 'entity/connection_entity'
    ConnectionEntity.new(self, data)
  end


  # Idiomatic facade: client.disturbance.list / client.disturbance.load({ "id" => ... })
  def disturbance
    require_relative 'entity/disturbance_entity'
    @disturbance ||= DisturbanceEntity.new(self, nil)
  end

  # Deprecated: use client.disturbance instead.
  def Disturbance(data = nil)
    require_relative 'entity/disturbance_entity'
    DisturbanceEntity.new(self, data)
  end


  # Idiomatic facade: client.liveboard.list / client.liveboard.load({ "id" => ... })
  def liveboard
    require_relative 'entity/liveboard_entity'
    @liveboard ||= LiveboardEntity.new(self, nil)
  end

  # Deprecated: use client.liveboard instead.
  def Liveboard(data = nil)
    require_relative 'entity/liveboard_entity'
    LiveboardEntity.new(self, data)
  end


  # Idiomatic facade: client.log.list / client.log.load({ "id" => ... })
  def log
    require_relative 'entity/log_entity'
    @log ||= LogEntity.new(self, nil)
  end

  # Deprecated: use client.log instead.
  def Log(data = nil)
    require_relative 'entity/log_entity'
    LogEntity.new(self, data)
  end


  # Idiomatic facade: client.occupancy.list / client.occupancy.load({ "id" => ... })
  def occupancy
    require_relative 'entity/occupancy_entity'
    @occupancy ||= OccupancyEntity.new(self, nil)
  end

  # Deprecated: use client.occupancy instead.
  def Occupancy(data = nil)
    require_relative 'entity/occupancy_entity'
    OccupancyEntity.new(self, data)
  end


  # Idiomatic facade: client.station.list / client.station.load({ "id" => ... })
  def station
    require_relative 'entity/station_entity'
    @station ||= StationEntity.new(self, nil)
  end

  # Deprecated: use client.station instead.
  def Station(data = nil)
    require_relative 'entity/station_entity'
    StationEntity.new(self, data)
  end


  # Idiomatic facade: client.vehicle.list / client.vehicle.load({ "id" => ... })
  def vehicle
    require_relative 'entity/vehicle_entity'
    @vehicle ||= VehicleEntity.new(self, nil)
  end

  # Deprecated: use client.vehicle instead.
  def Vehicle(data = nil)
    require_relative 'entity/vehicle_entity'
    VehicleEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = IrailSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
