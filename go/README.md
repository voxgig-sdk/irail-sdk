# Irail Golang SDK

The Golang SDK for the Irail API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/irail-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/irail-sdk/go=../path/to/github.com/voxgig-sdk/irail-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/irail-sdk/go"
    "github.com/voxgig-sdk/irail-sdk/go/core"
)

func main() {
    client := sdk.NewIrailSDK(map[string]any{})
```

### 3. Load a composition

```go
    result, err = client.Composition(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIrailSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IRAIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewIrailSDK

```go
func NewIrailSDK(options map[string]any) *IrailSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IrailSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IrailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Composition` | `(data map[string]any) IrailEntity` | Create a Composition entity instance. |
| `Connection` | `(data map[string]any) IrailEntity` | Create a Connection entity instance. |
| `Disturbance` | `(data map[string]any) IrailEntity` | Create a Disturbance entity instance. |
| `Liveboard` | `(data map[string]any) IrailEntity` | Create a Liveboard entity instance. |
| `Log` | `(data map[string]any) IrailEntity` | Create a Log entity instance. |
| `Occupancy` | `(data map[string]any) IrailEntity` | Create a Occupancy entity instance. |
| `Station` | `(data map[string]any) IrailEntity` | Create a Station entity instance. |
| `Vehicle` | `(data map[string]any) IrailEntity` | Create a Vehicle entity instance. |

### Entity interface (IrailEntity)

All entities implement the `IrailEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Composition

| Field | Description |
| --- | --- |
| `"composition"` |  |
| `"timestamp"` |  |
| `"vehicle"` |  |
| `"version"` |  |

Operations: Load.

API path: `/composition/`

#### Connection

| Field | Description |
| --- | --- |
| `"arrival"` |  |
| `"departure"` |  |
| `"duration"` |  |
| `"id"` |  |
| `"occupancy"` |  |
| `"via"` |  |

Operations: List.

API path: `/connections/`

#### Disturbance

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"link"` |  |
| `"timestamp"` |  |
| `"title"` |  |
| `"type"` |  |

Operations: List.

API path: `/disturbances/`

#### Liveboard

| Field | Description |
| --- | --- |
| `"departure"` |  |
| `"station"` |  |
| `"stationinfo"` |  |
| `"timestamp"` |  |
| `"version"` |  |

Operations: Load.

API path: `/liveboard/`

#### Log

| Field | Description |
| --- | --- |
| `"querytime"` |  |
| `"querytype"` |  |
| `"user_agent"` |  |

Operations: List.

API path: `/logs/`

#### Occupancy

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/feedback/occupancy.php`

#### Station

| Field | Description |
| --- | --- |
| `"station"` |  |
| `"timestamp"` |  |
| `"version"` |  |

Operations: Load.

API path: `/stations/`

#### Vehicle

| Field | Description |
| --- | --- |
| `"stop"` |  |
| `"timestamp"` |  |
| `"vehicle"` |  |
| `"vehicleinfo"` |  |
| `"version"` |  |

Operations: Load.

API path: `/vehicle/`



## Entities


### Composition

Create an instance: `composition := client.Composition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `composition` | ``$OBJECT`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `vehicle` | ``$STRING`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Composition(nil).Load(map[string]any{"id": "composition_id"}, nil)
```


### Connection

Create an instance: `connection := client.Connection(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrival` | ``$OBJECT`` |  |
| `departure` | ``$OBJECT`` |  |
| `duration` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `occupancy` | ``$OBJECT`` |  |
| `via` | ``$OBJECT`` |  |

#### Example: List

```go
results, err := client.Connection(nil).List(nil, nil)
```


### Disturbance

Create an instance: `disturbance := client.Disturbance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `link` | ``$STRING`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$INTEGER`` |  |

#### Example: List

```go
results, err := client.Disturbance(nil).List(nil, nil)
```


### Liveboard

Create an instance: `liveboard := client.Liveboard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | ``$OBJECT`` |  |
| `station` | ``$STRING`` |  |
| `stationinfo` | ``$OBJECT`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Liveboard(nil).Load(map[string]any{"id": "liveboard_id"}, nil)
```


### Log

Create an instance: `log := client.Log(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `querytime` | ``$INTEGER`` |  |
| `querytype` | ``$STRING`` |  |
| `user_agent` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Log(nil).List(nil, nil)
```


### Occupancy

Create an instance: `occupancy := client.Occupancy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Occupancy(nil).Create(map[string]any{
}, nil)
```


### Station

Create an instance: `station := client.Station(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `station` | ``$ANY`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Station(nil).Load(map[string]any{"id": "station_id"}, nil)
```


### Vehicle

Create an instance: `vehicle := client.Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `stop` | ``$OBJECT`` |  |
| `timestamp` | ``$INTEGER`` |  |
| `vehicle` | ``$STRING`` |  |
| `vehicleinfo` | ``$OBJECT`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/irail-sdk/go/
├── irail.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/irail-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
