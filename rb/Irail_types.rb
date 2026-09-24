# frozen_string_literal: true

# Typed models for the Irail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Composition entity data model.
#
# @!attribute [rw] segments
#   @return [Hash, nil]
Composition = Struct.new(
  :segments,
  keyword_init: true
)

# Request payload for Composition#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
CompositionLoadMatch = Struct.new(
  :date,
  :format,
  :id,
  :lang,
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
# @!attribute [rw] vias
#   @return [Hash, nil]
Connection = Struct.new(
  :arrival,
  :departure,
  :duration,
  :id,
  :occupancy,
  :vias,
  keyword_init: true
)

# Request payload for Connection#list.
#
# @!attribute [rw] alert
#   @return [Boolean, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Integer, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] timesel
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String]
#
# @!attribute [rw] type_of_transport
#   @return [String, nil]
ConnectionListMatch = Struct.new(
  :alert,
  :date,
  :format,
  :from,
  :lang,
  :result,
  :time,
  :timesel,
  :to,
  :type_of_transport,
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
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] line_break_character
#   @return [String, nil]
DisturbanceListMatch = Struct.new(
  :format,
  :lang,
  :line_break_character,
  keyword_init: true
)

# Liveboard entity data model.
#
# @!attribute [rw] departures
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
  :departures,
  :station,
  :stationinfo,
  :timestamp,
  :version,
  keyword_init: true
)

# Request payload for Liveboard#load.
#
# @!attribute [rw] alert
#   @return [Boolean, nil]
#
# @!attribute [rw] arrdep
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] station
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
LiveboardLoadMatch = Struct.new(
  :alert,
  :arrdep,
  :date,
  :format,
  :id,
  :lang,
  :station,
  :time,
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
# @!attribute [rw] format
#   @return [String, nil]
LogListMatch = Struct.new(
  :format,
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
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
StationLoadMatch = Struct.new(
  :format,
  :lang,
  keyword_init: true
)

# Vehicle entity data model.
#
# @!attribute [rw] stops
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
  :stops,
  :timestamp,
  :vehicle,
  :vehicleinfo,
  :version,
  keyword_init: true
)

# Request payload for Vehicle#load.
#
# @!attribute [rw] alert
#   @return [Boolean, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lang
#   @return [String, nil]
VehicleLoadMatch = Struct.new(
  :alert,
  :date,
  :format,
  :id,
  :lang,
  keyword_init: true
)

