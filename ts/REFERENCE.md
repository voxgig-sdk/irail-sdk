# Irail TypeScript SDK Reference

Complete API reference for the Irail TypeScript SDK.


## IrailSDK

### Constructor

```ts
new IrailSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IrailSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IrailSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IrailSDK` instance in test mode.


### Instance Methods

#### `Composition(data?: object)`

Create a new `Composition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompositionEntity` instance.

#### `Connection(data?: object)`

Create a new `Connection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionEntity` instance.

#### `Disturbance(data?: object)`

Create a new `Disturbance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DisturbanceEntity` instance.

#### `Liveboard(data?: object)`

Create a new `Liveboard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LiveboardEntity` instance.

#### `Log(data?: object)`

Create a new `Log` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LogEntity` instance.

#### `Occupancy(data?: object)`

Create a new `Occupancy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OccupancyEntity` instance.

#### `Station(data?: object)`

Create a new `Station` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StationEntity` instance.

#### `Vehicle(data?: object)`

Create a new `Vehicle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VehicleEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IrailSDK.test()`.

**Returns:** `IrailSDK` instance in test mode.


---

## CompositionEntity

```ts
const composition = client.Composition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | `Record<string, any>` | No |  |
| `timestamp` | `number` | No |  |
| `vehicle` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Composition().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompositionEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionEntity

```ts
const connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `Record<string, any>` | No |  |
| `departure` | `Record<string, any>` | No |  |
| `duration` | `number` | No |  |
| `id` | `number` | No |  |
| `occupancy` | `Record<string, any>` | No |  |
| `via` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Connection().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DisturbanceEntity

```ts
const disturbance = client.Disturbance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `link` | `string` | No |  |
| `timestamp` | `number` | No |  |
| `title` | `string` | No |  |
| `type` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Disturbance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DisturbanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LiveboardEntity

```ts
const liveboard = client.Liveboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `Record<string, any>` | Yes |  |
| `station` | `string` | Yes |  |
| `stationinfo` | `Record<string, any>` | Yes |  |
| `timestamp` | `number` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Liveboard().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LiveboardEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LogEntity

```ts
const log = client.Log()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | `number` | No |  |
| `querytype` | `string` | No |  |
| `user_agent` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Log().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LogEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OccupancyEntity

```ts
const occupancy = client.Occupancy()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Occupancy().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OccupancyEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StationEntity

```ts
const station = client.Station()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | `any` | Yes |  |
| `timestamp` | `number` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Station().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StationEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VehicleEntity

```ts
const vehicle = client.Vehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stop` | `Record<string, any>` | Yes |  |
| `timestamp` | `number` | Yes |  |
| `vehicle` | `string` | Yes |  |
| `vehicleinfo` | `Record<string, any>` | No |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Vehicle().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VehicleEntity` instance with the same client and
options.

#### `client()`

Return the parent `IrailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IrailSDK({
  feature: {
    test: { active: true },
  }
})
```

