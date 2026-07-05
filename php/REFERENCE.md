# Irail PHP SDK Reference

Complete API reference for the Irail PHP SDK.


## IrailSDK

### Constructor

```php
require_once __DIR__ . '/irail_sdk.php';

$client = new IrailSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IrailSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IrailSDK::test();
```


### Instance Methods

#### `Composition($data = null)`

Create a new `CompositionEntity` instance. Pass `null` for no initial data.

#### `Connection($data = null)`

Create a new `ConnectionEntity` instance. Pass `null` for no initial data.

#### `Disturbance($data = null)`

Create a new `DisturbanceEntity` instance. Pass `null` for no initial data.

#### `Liveboard($data = null)`

Create a new `LiveboardEntity` instance. Pass `null` for no initial data.

#### `Log($data = null)`

Create a new `LogEntity` instance. Pass `null` for no initial data.

#### `Occupancy($data = null)`

Create a new `OccupancyEntity` instance. Pass `null` for no initial data.

#### `Station($data = null)`

Create a new `StationEntity` instance. Pass `null` for no initial data.

#### `Vehicle($data = null)`

Create a new `VehicleEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IrailUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CompositionEntity

```php
$composition = $client->Composition();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `composition` | `array` | No |  |
| `timestamp` | `int` | No |  |
| `vehicle` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Composition()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CompositionEntity`

Create a new `CompositionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConnectionEntity

```php
$connection = $client->Connection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `array` | No |  |
| `departure` | `array` | No |  |
| `duration` | `int` | No |  |
| `id` | `int` | No |  |
| `occupancy` | `array` | No |  |
| `via` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Connection()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConnectionEntity`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DisturbanceEntity

```php
$disturbance = $client->Disturbance();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Disturbance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DisturbanceEntity`

Create a new `DisturbanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LiveboardEntity

```php
$liveboard = $client->Liveboard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `array` | Yes |  |
| `station` | `string` | Yes |  |
| `stationinfo` | `array` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Liveboard()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LiveboardEntity`

Create a new `LiveboardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LogEntity

```php
$log = $client->Log();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `querytime` | `int` | No |  |
| `querytype` | `string` | No |  |
| `user_agent` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Log()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LogEntity`

Create a new `LogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OccupancyEntity

```php
$occupancy = $client->Occupancy();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Occupancy()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OccupancyEntity`

Create a new `OccupancyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StationEntity

```php
$station = $client->Station();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `station` | `mixed` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Station()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StationEntity`

Create a new `StationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->Vehicle();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stop` | `array` | Yes |  |
| `timestamp` | `int` | Yes |  |
| `vehicle` | `string` | Yes |  |
| `vehicleinfo` | `array` | No |  |
| `version` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Vehicle()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IrailSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

