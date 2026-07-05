# frozen_string_literal: true

# Typed models for the Irail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Composition entity data model.
#
# @!attribute [rw] composition
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] vehicle
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Composition = Struct.new(
  :composition,
  :timestamp,
  :vehicle,
  :version,
  keyword_init: true
)

# Request payload for Composition#load.
#
# @!attribute [rw] composition
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] vehicle
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
CompositionLoadMatch = Struct.new(
  :composition,
  :timestamp,
  :vehicle,
  :version,
  keyword_init: true
)

# Connection entity data model.
#
# @!attribute [rw] arrival
#   @return [Hash, nil]
#
# @!attribute [rw] departure
#   @return [Hash, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] occupancy
#   @return [Hash, nil]
#
# @!attribute [rw] via
#   @return [Hash, nil]
Connection = Struct.new(
  :arrival,
  :departure,
  :duration,
  :id,
  :occupancy,
  :via,
  keyword_init: true
)

# Request payload for Connection#list.
#
# @!attribute [rw] arrival
#   @return [Hash, nil]
#
# @!attribute [rw] departure
#   @return [Hash, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] occupancy
#   @return [Hash, nil]
#
# @!attribute [rw] via
#   @return [Hash, nil]
ConnectionListMatch = Struct.new(
  :arrival,
  :departure,
  :duration,
  :id,
  :occupancy,
  :via,
  keyword_init: true
)

# Disturbance entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Integer, nil]
Disturbance = Struct.new(
  :description,
  :id,
  :link,
  :timestamp,
  :title,
  :type,
  keyword_init: true
)

# Request payload for Disturbance#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Integer, nil]
DisturbanceListMatch = Struct.new(
  :description,
  :id,
  :link,
  :timestamp,
  :title,
  :type,
  keyword_init: true
)

# Liveboard entity data model.
#
# @!attribute [rw] departure
#   @return [Hash]
#
# @!attribute [rw] station
#   @return [String]
#
# @!attribute [rw] stationinfo
#   @return [Hash]
#
# @!attribute [rw] timestamp
#   @return [Integer]
#
# @!attribute [rw] version
#   @return [String]
Liveboard = Struct.new(
  :departure,
  :station,
  :stationinfo,
  :timestamp,
  :version,
  keyword_init: true
)

# Request payload for Liveboard#load.
#
# @!attribute [rw] departure
#   @return [Hash, nil]
#
# @!attribute [rw] station
#   @return [String, nil]
#
# @!attribute [rw] stationinfo
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
LiveboardLoadMatch = Struct.new(
  :departure,
  :station,
  :stationinfo,
  :timestamp,
  :version,
  keyword_init: true
)

# Log entity data model.
#
# @!attribute [rw] querytime
#   @return [Integer, nil]
#
# @!attribute [rw] querytype
#   @return [String, nil]
#
# @!attribute [rw] user_agent
#   @return [String, nil]
Log = Struct.new(
  :querytime,
  :querytype,
  :user_agent,
  keyword_init: true
)

# Request payload for Log#list.
#
# @!attribute [rw] querytime
#   @return [Integer, nil]
#
# @!attribute [rw] querytype
#   @return [String, nil]
#
# @!attribute [rw] user_agent
#   @return [String, nil]
LogListMatch = Struct.new(
  :querytime,
  :querytype,
  :user_agent,
  keyword_init: true
)

# Occupancy entity data model.
class Occupancy
end

# Request payload for Occupancy#create.
class OccupancyCreateData
end

# Station entity data model.
#
# @!attribute [rw] station
#   @return [Object]
#
# @!attribute [rw] timestamp
#   @return [Integer]
#
# @!attribute [rw] version
#   @return [String]
Station = Struct.new(
  :station,
  :timestamp,
  :version,
  keyword_init: true
)

# Request payload for Station#load.
#
# @!attribute [rw] station
#   @return [Object, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
StationLoadMatch = Struct.new(
  :station,
  :timestamp,
  :version,
  keyword_init: true
)

# Vehicle entity data model.
#
# @!attribute [rw] stop
#   @return [Hash]
#
# @!attribute [rw] timestamp
#   @return [Integer]
#
# @!attribute [rw] vehicle
#   @return [String]
#
# @!attribute [rw] vehicleinfo
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String]
Vehicle = Struct.new(
  :stop,
  :timestamp,
  :vehicle,
  :vehicleinfo,
  :version,
  keyword_init: true
)

# Request payload for Vehicle#load.
#
# @!attribute [rw] stop
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [Integer, nil]
#
# @!attribute [rw] vehicle
#   @return [String, nil]
#
# @!attribute [rw] vehicleinfo
#   @return [Hash, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
VehicleLoadMatch = Struct.new(
  :stop,
  :timestamp,
  :vehicle,
  :vehicleinfo,
  :version,
  keyword_init: true
)

