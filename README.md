# Irail SDK

Query Belgian rail schedules, stations, liveboards, connections, and disruptions from the iRail open-data API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About iRail API

[iRail](https://docs.irail.be/) is a community-driven project that exposes data from Belgian rail operator NMBS/SNCB as a clean HTTP API. It backs a long-running family of apps and tools and is widely used to build journey planners, station displays, and mobility research projects.

What you get from the API:

- Belgian railway **stations** with locations.
- **Liveboards** of real-time arrivals and departures at a station.
- **Connections** between two stations, including delay information.
- **Vehicle** details: stops, occupancy, and current position.
- **Composition** of a train (carriages and locomotive specs).
- **Disturbances**: current incidents and planned maintenance.
- **Occupancy** feedback submissions for crowding reports.
- **Logs** of recent API usage (1000 most recent entries).

Operational notes: responses are available in JSON, XML, and JSONP. The server is rate limited to roughly 3 requests/second per source IP with a small burst allowance, returning HTTP 429 when exceeded. TLS 1.1 or higher is required, and CORS is enabled.

## Try it

**TypeScript**
```bash
npm install irail
```

**Python**
```bash
pip install irail-sdk
```

**PHP**
```bash
composer require voxgig/irail-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/irail-sdk/go
```

**Ruby**
```bash
gem install irail-sdk
```

**Lua**
```bash
luarocks install irail-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IrailSDK } from 'irail'

const client = new IrailSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o irail-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "irail": {
      "command": "/abs/path/to/irail-mcp"
    }
  }
}
```

## Entities

The API exposes 8 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Composition** | Carriage and locomotive make-up of a specific train. | `/composition/` |
| **Connection** | Route between two stations with timing and delay information. | `/connections/` |
| **Disturbance** | Current network disruptions and planned maintenance notices. | `/disturbances/` |
| **Liveboard** | Real-time arrivals and departures board for a station. | `/liveboard/` |
| **Log** | Recent API usage entries (most recent 1000). | `/logs/` |
| **Occupancy** | Crowding feedback that clients can read or submit for a vehicle. | `/feedback/occupancy.php` |
| **Station** | Belgian railway stations with locations and identifiers. | `/stations/` |
| **Vehicle** | Train details including stops, occupancy, and current location, served from `GET /v1/vehicle/`. | `/vehicle/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from irail_sdk import IrailSDK

client = IrailSDK({})


# Load a specific composition
composition, err = client.Composition(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'irail_sdk.php';

$client = new IrailSDK([]);


// Load a specific composition
[$composition, $err] = $client->Composition(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/irail-sdk/go"

client := sdk.NewIrailSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Irail_sdk"

client = IrailSDK.new({})


# Load a specific composition
composition, err = client.Composition(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("irail_sdk")

local client = sdk.new({})


-- Load a specific composition
local composition, err = client:Composition(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IrailSDK.test()
const result = await client.Composition().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IrailSDK.test(None, None)
result, err = client.Composition(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IrailSDK::test(null, null);
[$result, $err] = $client->Composition(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Composition(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IrailSDK.test(nil, nil)
result, err = client.Composition(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Composition(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the iRail API

- Upstream: [https://docs.irail.be/](https://docs.irail.be/)

- Open data published by the community-run iRail project.
- No explicit license statement in the docs; treat as open data with attribution.
- Requests should include a descriptive `User-Agent` identifying your application; unidentified clients may be blocked.
- Use the semantic URIs returned in responses rather than composing your own.

---

Generated from the iRail API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
