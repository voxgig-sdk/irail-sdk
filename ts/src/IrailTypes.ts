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
  segments?: Record<string, any>
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
  arrival?: Record<string, any>
  departure?: Record<string, any>
  duration?: number
  id?: number
  occupancy?: Record<string, any>
  vias?: Record<string, any>
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
  description?: string
  id?: number
  link?: string
  timestamp?: number
  title?: string
  type?: number
}

export interface Liveboard {
  departures: Record<string, any>
  station: string
  stationinfo: Record<string, any>
  timestamp: number
  version: string
}

export interface LiveboardLoadMatch {
  departures?: Record<string, any>
  station?: string
  stationinfo?: Record<string, any>
  timestamp?: number
  version?: string
}

export interface Log {
  querytime?: number
  querytype?: string
  user_agent?: string
}

export interface LogListMatch {
  querytime?: number
  querytype?: string
  user_agent?: string
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
  station?: any
  timestamp?: number
  version?: string
}

export interface Vehicle {
  stops: Record<string, any>
  timestamp: number
  vehicle: string
  vehicleinfo?: Record<string, any>
  version: string
}

export interface VehicleLoadMatch {
  stops?: Record<string, any>
  timestamp?: number
  vehicle?: string
  vehicleinfo?: Record<string, any>
  version?: string
}

