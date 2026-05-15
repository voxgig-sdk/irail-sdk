# Irail Lua SDK Reference

Complete API reference for the Irail Lua SDK.


## IrailSDK

### Constructor

```lua
local sdk = require("irail_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `Composition(data)`

Create a new `Composition` entity instance. Pass `nil` for no initial data.

#### `Connection(data)`

Create a new `Connection` entity instance. Pass `nil` for no initial data.

#### `Disturbance(data)`

Create a new `Disturbance` entity instance. Pass `nil` for no initial data.

#### `Liveboard(data)`

Create a new `Liveboard` entity instance. Pass `nil` for no initial data.

#### `Log(data)`

Create a new `Log` entity instance. Pass `nil` for no initial data.

#### `Occupancy(data)`

Create a new `Occupancy` entity instance. Pass `nil` for no initial data.

#### `Station(data)`

Create a new `Station` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CompositionEntity

```lua
local composition = client:Composition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | ``$OBJECT`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `vehicle` | ``$STRING`` | No |  |
| `version` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Composition(nil):load({ id = "composition_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompositionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConnectionEntity

```lua
local connection = client:Connection(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | ``$OBJECT`` | No |  |
| `departure` | ``$OBJECT`` | No |  |
| `duration` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `occupancy` | ``$OBJECT`` | No |  |
| `via` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Connection(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DisturbanceEntity

```lua
local disturbance = client:Disturbance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `link` | ``$STRING`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Disturbance(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisturbanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LiveboardEntity

```lua
local liveboard = client:Liveboard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | ``$OBJECT`` | Yes |  |
| `station` | ``$STRING`` | Yes |  |
| `stationinfo` | ``$OBJECT`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Liveboard(nil):load({ id = "liveboard_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiveboardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LogEntity

```lua
local log = client:Log(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | ``$INTEGER`` | No |  |
| `querytype` | ``$STRING`` | No |  |
| `user_agent` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Log(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OccupancyEntity

```lua
local occupancy = client:Occupancy(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Occupancy(nil):create({
}, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OccupancyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StationEntity

```lua
local station = client:Station(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | ``$ANY`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Station(nil):load({ id = "station_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VehicleEntity

```lua
local vehicle = client:Vehicle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stop` | ``$OBJECT`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |
| `vehicle` | ``$STRING`` | Yes |  |
| `vehicleinfo` | ``$OBJECT`` | No |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Vehicle(nil):load({ id = "vehicle_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

