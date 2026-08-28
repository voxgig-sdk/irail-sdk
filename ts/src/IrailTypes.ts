// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Composition {
  segments?: Record<string, any>
}

export interface CompositionLoadMatch {
  date?: string
  format?: string
  id: string
  lang?: string
}

export interface Connection {
  arrival?: Record<string, any>
  departure?: Record<string, any>
  duration?: number
  id?: number
  occupancy?: Record<string, any>
  vias?: Record<string, any>
}

export interface ConnectionListMatch {
  alert?: boolean
  date?: string
  format?: string
  from: string
  lang?: string
  result?: number
  time?: string
  timesel?: string
  to: string
  type_of_transport?: string
}

export interface Disturbance {
  description?: string
  id?: number
  link?: string
  timestamp?: number
  title?: string
  type?: number
}

export interface DisturbanceListMatch {
  format?: string
  lang?: string
  line_break_character?: string
}

export interface Liveboard {
  departures: Record<string, any>
  station: string
  stationinfo: Record<string, any>
  timestamp: number
  version: string
}

export interface LiveboardLoadMatch {
  alert?: boolean
  arrdep?: string
  date?: string
  format?: string
  id?: string
  lang?: string
  station?: string
  time?: string
}

export interface Log {
  querytime?: number
  querytype?: string
  user_agent?: string
}

export interface LogListMatch {
  format?: string
}

export interface Occupancy {
}

export interface OccupancyCreateData {
}

export interface Station {
  station: any
  timestamp: number
  version: string
}

export interface StationLoadMatch {
  format?: string
  lang?: string
}

export interface Vehicle {
  stops: Record<string, any>
  timestamp: number
  vehicle: string
  vehicleinfo?: Record<string, any>
  version: string
}

export interface VehicleLoadMatch {
  alert?: boolean
  date?: string
  format?: string
  id: string
  lang?: string
}

