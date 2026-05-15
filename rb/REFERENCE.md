# Irail Ruby SDK Reference

Complete API reference for the Irail Ruby SDK.


## IrailSDK

### Constructor

```ruby
require_relative 'irail_sdk'

client = IrailSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IrailSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IrailSDK.test
```


### Instance Methods

#### `Composition(data = nil)`

Create a new `Composition` entity instance. Pass `nil` for no initial data.

#### `Connection(data = nil)`

Create a new `Connection` entity instance. Pass `nil` for no initial data.

#### `Disturbance(data = nil)`

Create a new `Disturbance` entity instance. Pass `nil` for no initial data.

#### `Liveboard(data = nil)`

Create a new `Liveboard` entity instance. Pass `nil` for no initial data.

#### `Log(data = nil)`

Create a new `Log` entity instance. Pass `nil` for no initial data.

#### `Occupancy(data = nil)`

Create a new `Occupancy` entity instance. Pass `nil` for no initial data.

#### `Station(data = nil)`

Create a new `Station` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data = nil)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## CompositionEntity

```ruby
composition = client.Composition
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | ``$OBJECT`` | No |  |
| `timestamp` | ``$INTEGER`` | No |  |
| `vehicle` | ``$STRING`` | No |  |
| `version` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Composition.load({ "id" => "composition_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompositionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConnectionEntity

```ruby
connection = client.Connection
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Connection.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DisturbanceEntity

```ruby
disturbance = client.Disturbance
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Disturbance.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DisturbanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LiveboardEntity

```ruby
liveboard = client.Liveboard
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Liveboard.load({ "id" => "liveboard_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LiveboardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LogEntity

```ruby
log = client.Log
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | ``$INTEGER`` | No |  |
| `querytype` | ``$STRING`` | No |  |
| `user_agent` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Log.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OccupancyEntity

```ruby
occupancy = client.Occupancy
```

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Occupancy.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OccupancyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StationEntity

```ruby
station = client.Station
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | ``$ANY`` | Yes |  |
| `timestamp` | ``$INTEGER`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Station.load({ "id" => "station_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleEntity

```ruby
vehicle = client.Vehicle
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Vehicle.load({ "id" => "vehicle_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IrailSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

