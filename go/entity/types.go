// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Composition is the typed data model for the composition entity.
type Composition struct {
	Composition *map[string]any `json:"composition,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Vehicle *string `json:"vehicle,omitempty"`
	Version *string `json:"version,omitempty"`
}

// CompositionLoadMatch is the typed request payload for Composition.LoadTyped.
type CompositionLoadMatch struct {
	Composition *map[string]any `json:"composition,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Vehicle *string `json:"vehicle,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Connection is the typed data model for the connection entity.
type Connection struct {
	Arrival *map[string]any `json:"arrival,omitempty"`
	Departure *map[string]any `json:"departure,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *int `json:"id,omitempty"`
	Occupancy *map[string]any `json:"occupancy,omitempty"`
	Via *map[string]any `json:"via,omitempty"`
}

// ConnectionListMatch is the typed request payload for Connection.ListTyped.
type ConnectionListMatch struct {
	Arrival *map[string]any `json:"arrival,omitempty"`
	Departure *map[string]any `json:"departure,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *int `json:"id,omitempty"`
	Occupancy *map[string]any `json:"occupancy,omitempty"`
	Via *map[string]any `json:"via,omitempty"`
}

// Disturbance is the typed data model for the disturbance entity.
type Disturbance struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Link *string `json:"link,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *int `json:"type,omitempty"`
}

// DisturbanceListMatch is the typed request payload for Disturbance.ListTyped.
type DisturbanceListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Link *string `json:"link,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *int `json:"type,omitempty"`
}

// Liveboard is the typed data model for the liveboard entity.
type Liveboard struct {
	Departure map[string]any `json:"departure"`
	Station string `json:"station"`
	Stationinfo map[string]any `json:"stationinfo"`
	Timestamp int `json:"timestamp"`
	Version string `json:"version"`
}

// LiveboardLoadMatch is the typed request payload for Liveboard.LoadTyped.
type LiveboardLoadMatch struct {
	Departure *map[string]any `json:"departure,omitempty"`
	Station *string `json:"station,omitempty"`
	Stationinfo *map[string]any `json:"stationinfo,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Log is the typed data model for the log entity.
type Log struct {
	Querytime *int `json:"querytime,omitempty"`
	Querytype *string `json:"querytype,omitempty"`
	UserAgent *string `json:"user_agent,omitempty"`
}

// LogListMatch is the typed request payload for Log.ListTyped.
type LogListMatch struct {
	Querytime *int `json:"querytime,omitempty"`
	Querytype *string `json:"querytype,omitempty"`
	UserAgent *string `json:"user_agent,omitempty"`
}

// Occupancy is the typed data model for the occupancy entity.
type Occupancy struct {
}

// OccupancyCreateData is the typed request payload for Occupancy.CreateTyped.
type OccupancyCreateData struct {
}

// Station is the typed data model for the station entity.
type Station struct {
	Station any `json:"station"`
	Timestamp int `json:"timestamp"`
	Version string `json:"version"`
}

// StationLoadMatch is the typed request payload for Station.LoadTyped.
type StationLoadMatch struct {
	Station *any `json:"station,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
	Stop map[string]any `json:"stop"`
	Timestamp int `json:"timestamp"`
	Vehicle string `json:"vehicle"`
	Vehicleinfo *map[string]any `json:"vehicleinfo,omitempty"`
	Version string `json:"version"`
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	Stop *map[string]any `json:"stop,omitempty"`
	Timestamp *int `json:"timestamp,omitempty"`
	Vehicle *string `json:"vehicle,omitempty"`
	Vehicleinfo *map[string]any `json:"vehicleinfo,omitempty"`
	Version *string `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
