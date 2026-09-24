-- Typed models for the Irail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Composition
---@field segments? table

---@class CompositionLoadMatch
---@field date? string
---@field format? string
---@field id string
---@field lang? string

---@class Connection
---@field arrival? table
---@field departure? table
---@field duration? number
---@field id? number
---@field occupancy? table
---@field vias? table

---@class ConnectionListMatch
---@field alert? boolean
---@field date? string
---@field format? string
---@field from string
---@field lang? string
---@field result? number
---@field time? string
---@field timesel? string
---@field to string
---@field type_of_transport? string

---@class Disturbance
---@field description? string
---@field id? number
---@field link? string
---@field timestamp? number
---@field title? string
---@field type? number

---@class DisturbanceListMatch
---@field format? string
---@field lang? string
---@field line_break_character? string

---@class Liveboard
---@field departures table
---@field station string
---@field stationinfo table
---@field timestamp number
---@field version string

---@class LiveboardLoadMatch
---@field alert? boolean
---@field arrdep? string
---@field date? string
---@field format? string
---@field id? string
---@field lang? string
---@field station? string
---@field time? string

---@class Log
---@field querytime? number
---@field querytype? string
---@field user_agent? string

---@class LogListMatch
---@field format? string

---@class Occupancy

---@class OccupancyCreateData

---@class Station
---@field station any
---@field timestamp number
---@field version string

---@class StationLoadMatch
---@field format? string
---@field lang? string

---@class Vehicle
---@field stops table
---@field timestamp number
---@field vehicle string
---@field vehicleinfo? table
---@field version string

---@class VehicleLoadMatch
---@field alert? boolean
---@field date? string
---@field format? string
---@field id string
---@field lang? string

local M = {}

return M
