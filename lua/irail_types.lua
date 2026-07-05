-- Typed models for the Irail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Composition
---@field composition? table
---@field timestamp? number
---@field vehicle? string
---@field version? string

---@class CompositionLoadMatch
---@field composition? table
---@field timestamp? number
---@field vehicle? string
---@field version? string

---@class Connection
---@field arrival? table
---@field departure? table
---@field duration? number
---@field id? number
---@field occupancy? table
---@field via? table

---@class ConnectionListMatch
---@field arrival? table
---@field departure? table
---@field duration? number
---@field id? number
---@field occupancy? table
---@field via? table

---@class Disturbance
---@field description? string
---@field id? number
---@field link? string
---@field timestamp? number
---@field title? string
---@field type? number

---@class DisturbanceListMatch
---@field description? string
---@field id? number
---@field link? string
---@field timestamp? number
---@field title? string
---@field type? number

---@class Liveboard
---@field departure table
---@field station string
---@field stationinfo table
---@field timestamp number
---@field version string

---@class LiveboardLoadMatch
---@field departure? table
---@field station? string
---@field stationinfo? table
---@field timestamp? number
---@field version? string

---@class Log
---@field querytime? number
---@field querytype? string
---@field user_agent? string

---@class LogListMatch
---@field querytime? number
---@field querytype? string
---@field user_agent? string

---@class Occupancy

---@class OccupancyCreateData

---@class Station
---@field station any
---@field timestamp number
---@field version string

---@class StationLoadMatch
---@field station? any
---@field timestamp? number
---@field version? string

---@class Vehicle
---@field stop table
---@field timestamp number
---@field vehicle string
---@field vehicleinfo? table
---@field version string

---@class VehicleLoadMatch
---@field stop? table
---@field timestamp? number
---@field vehicle? string
---@field vehicleinfo? table
---@field version? string

local M = {}

return M
