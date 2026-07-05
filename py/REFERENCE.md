# Irail Python SDK Reference

Complete API reference for the Irail Python SDK.


## IrailSDK

### Constructor

```python
from irail_sdk import IrailSDK

client = IrailSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IrailSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IrailSDK.test()
```


### Instance Methods

#### `Composition(data=None)`

Create a new `CompositionEntity` instance. Pass `None` for no initial data.

#### `Connection(data=None)`

Create a new `ConnectionEntity` instance. Pass `None` for no initial data.

#### `Disturbance(data=None)`

Create a new `DisturbanceEntity` instance. Pass `None` for no initial data.

#### `Liveboard(data=None)`

Create a new `LiveboardEntity` instance. Pass `None` for no initial data.

#### `Log(data=None)`

Create a new `LogEntity` instance. Pass `None` for no initial data.

#### `Occupancy(data=None)`

Create a new `OccupancyEntity` instance. Pass `None` for no initial data.

#### `Station(data=None)`

Create a new `StationEntity` instance. Pass `None` for no initial data.

#### `Vehicle(data=None)`

Create a new `VehicleEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CompositionEntity

```python
composition = client.Composition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | `dict` | No |  |
| `timestamp` | `int` | No |  |
| `vehicle` | `str` | No |  |
| `version` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Composition().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompositionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionEntity

```python
connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `dict` | No |  |
| `departure` | `dict` | No |  |
| `duration` | `int` | No |  |
| `id` | `int` | No |  |
| `occupancy` | `dict` | No |  |
| `via` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Connection().list()
for connection in results:
    print(connection)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DisturbanceEntity

```python
disturbance = client.Disturbance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `id` | `int` | No |  |
| `link` | `str` | No |  |
| `timestamp` | `int` | No |  |
| `title` | `str` | No |  |
| `type` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Disturbance().list()
for disturbance in results:
    print(disturbance)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisturbanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LiveboardEntity

```python
liveboard = client.Liveboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `dict` | Yes |  |
| `station` | `str` | Yes |  |
| `stationinfo` | `dict` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Liveboard().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiveboardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LogEntity

```python
log = client.Log()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | `int` | No |  |
| `querytype` | `str` | No |  |
| `user_agent` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Log().list()
for log in results:
    print(log)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OccupancyEntity

```python
occupancy = client.Occupancy()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Occupancy().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OccupancyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StationEntity

```python
station = client.Station()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | `Any` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Station().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleEntity

```python
vehicle = client.Vehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stop` | `dict` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `vehicle` | `str` | Yes |  |
| `vehicleinfo` | `dict` | No |  |
| `version` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Vehicle().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IrailSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

