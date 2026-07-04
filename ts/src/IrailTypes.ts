// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Composition {
  composition?: Record<string, any>
  timestamp?: number
  vehicle?: string
  version?: string
}

export type CompositionLoadMatch = Partial<Composition>

export interface Connection {
  arrival?: Record<string, any>
  departure?: Record<string, any>
  duration?: number
  id?: number
  occupancy?: Record<string, any>
  via?: Record<string, any>
}

export type ConnectionListMatch = Partial<Connection>

export interface Disturbance {
  description?: string
  id?: number
  link?: string
  timestamp?: number
  title?: string
  type?: number
}

export type DisturbanceListMatch = Partial<Disturbance>

export interface Liveboard {
  departure: Record<string, any>
  station: string
  stationinfo: Record<string, any>
  timestamp: number
  version: string
}

export type LiveboardLoadMatch = Partial<Liveboard>

export interface Log {
  querytime?: number
  querytype?: string
  user_agent?: string
}

export type LogListMatch = Partial<Log>

export interface Occupancy {
}

export type OccupancyCreateData = Partial<Occupancy>

export interface Station {
  station: any
  timestamp: number
  version: string
}

export type StationLoadMatch = Partial<Station>

export interface Vehicle {
  stop: Record<string, any>
  timestamp: number
  vehicle: string
  vehicleinfo?: Record<string, any>
  version: string
}

export type VehicleLoadMatch = Partial<Vehicle>

