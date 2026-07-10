# Irail Golang SDK Reference

Complete API reference for the Irail Golang SDK.


## IrailSDK

### Constructor

```go
func NewIrailSDK(options map[string]any) *IrailSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *IrailSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *IrailSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Composition(data map[string]any) IrailEntity`

Create a new `Composition` entity instance. Pass `nil` for no initial data.

#### `Connection(data map[string]any) IrailEntity`

Create a new `Connection` entity instance. Pass `nil` for no initial data.

#### `Disturbance(data map[string]any) IrailEntity`

Create a new `Disturbance` entity instance. Pass `nil` for no initial data.

#### `Liveboard(data map[string]any) IrailEntity`

Create a new `Liveboard` entity instance. Pass `nil` for no initial data.

#### `Log(data map[string]any) IrailEntity`

Create a new `Log` entity instance. Pass `nil` for no initial data.

#### `Occupancy(data map[string]any) IrailEntity`

Create a new `Occupancy` entity instance. Pass `nil` for no initial data.

#### `Station(data map[string]any) IrailEntity`

Create a new `Station` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data map[string]any) IrailEntity`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CompositionEntity

```go
composition := client.Composition(nil)
fmt.Println(composition.GetName()) // "composition"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | `map[string]any` | No |  |
| `timestamp` | `int` | No |  |
| `vehicle` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Composition(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompositionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConnectionEntity

```go
connection := client.Connection(nil)
fmt.Println(connection.GetName()) // "connection"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `map[string]any` | No |  |
| `departure` | `map[string]any` | No |  |
| `duration` | `int` | No |  |
| `id` | `int` | No |  |
| `occupancy` | `map[string]any` | No |  |
| `via` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Connection(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DisturbanceEntity

```go
disturbance := client.Disturbance(nil)
fmt.Println(disturbance.GetName()) // "disturbance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `link` | `string` | No |  |
| `timestamp` | `int` | No |  |
| `title` | `string` | No |  |
| `type` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Disturbance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DisturbanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LiveboardEntity

```go
liveboard := client.Liveboard(nil)
fmt.Println(liveboard.GetName()) // "liveboard"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `map[string]any` | Yes |  |
| `station` | `string` | Yes |  |
| `stationinfo` | `map[string]any` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Liveboard(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LiveboardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LogEntity

```go
log := client.Log(nil)
fmt.Println(log.GetName()) // "log"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | `int` | No |  |
| `querytype` | `string` | No |  |
| `user_agent` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Log(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LogEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OccupancyEntity

```go
occupancy := client.Occupancy(nil)
fmt.Println(occupancy.GetName()) // "occupancy"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Occupancy(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OccupancyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StationEntity

```go
station := client.Station(nil)
fmt.Println(station.GetName()) // "station"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | `any` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Station(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VehicleEntity

```go
vehicle := client.Vehicle(nil)
fmt.Println(vehicle.GetName()) // "vehicle"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stop` | `map[string]any` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `vehicle` | `string` | Yes |  |
| `vehicleinfo` | `map[string]any` | No |  |
| `version` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Vehicle(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewIrailSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

