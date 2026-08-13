// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/irail-sdk/go/core"
)

// Composition is the typed data model for the composition entity.
type Composition struct {
	Segments *map[string]any `json:"segments,omitempty"`
}

// CompositionLoadMatch is the typed request payload for Composition.LoadTyped.
type CompositionLoadMatch struct {
	Segments *map[string]any `json:"segments,omitempty"`
}

// Connection is the typed data model for the connection entity.
type Connection struct {
	Arrival *map[string]any `json:"arrival,omitempty"`
	Departure *map[string]any `json:"departure,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *int `json:"id,omitempty"`
	Occupancy *map[string]any `json:"occupancy,omitempty"`
	Vias *map[string]any `json:"vias,omitempty"`
}

// ConnectionListMatch is the typed request payload for Connection.ListTyped.
type ConnectionListMatch struct {
	Arrival *map[string]any `json:"arrival,omitempty"`
	Departure *map[string]any `json:"departure,omitempty"`
	Duration *int `json:"duration,omitempty"`
	Id *int `json:"id,omitempty"`
	Occupancy *map[string]any `json:"occupancy,omitempty"`
	Vias *map[string]any `json:"vias,omitempty"`
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
	Departures map[string]any `json:"departures"`
	Station string `json:"station"`
	Stationinfo map[string]any `json:"stationinfo"`
	Timestamp int `json:"timestamp"`
	Version string `json:"version"`
}

// LiveboardLoadMatch is the typed request payload for Liveboard.LoadTyped.
type LiveboardLoadMatch struct {
	Departures *map[string]any `json:"departures,omitempty"`
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
	Stops map[string]any `json:"stops"`
	Timestamp int `json:"timestamp"`
	Vehicle string `json:"vehicle"`
	Vehicleinfo *map[string]any `json:"vehicleinfo,omitempty"`
	Version string `json:"version"`
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	Stops *map[string]any `json:"stops,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
