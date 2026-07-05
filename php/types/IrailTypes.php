<?php
declare(strict_types=1);

// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Composition entity data model. */
class Composition
{
    public ?array $composition = null;
    public ?int $timestamp = null;
    public ?string $vehicle = null;
    public ?string $version = null;
}

/** Request payload for Composition#load. */
class CompositionLoadMatch
{
    public ?array $composition = null;
    public ?int $timestamp = null;
    public ?string $vehicle = null;
    public ?string $version = null;
}

/** Connection entity data model. */
class Connection
{
    public ?array $arrival = null;
    public ?array $departure = null;
    public ?int $duration = null;
    public ?int $id = null;
    public ?array $occupancy = null;
    public ?array $via = null;
}

/** Request payload for Connection#list. */
class ConnectionListMatch
{
    public ?array $arrival = null;
    public ?array $departure = null;
    public ?int $duration = null;
    public ?int $id = null;
    public ?array $occupancy = null;
    public ?array $via = null;
}

/** Disturbance entity data model. */
class Disturbance
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $link = null;
    public ?int $timestamp = null;
    public ?string $title = null;
    public ?int $type = null;
}

/** Request payload for Disturbance#list. */
class DisturbanceListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $link = null;
    public ?int $timestamp = null;
    public ?string $title = null;
    public ?int $type = null;
}

/** Liveboard entity data model. */
class Liveboard
{
    public array $departure;
    public string $station;
    public array $stationinfo;
    public int $timestamp;
    public string $version;
}

/** Request payload for Liveboard#load. */
class LiveboardLoadMatch
{
    public ?array $departure = null;
    public ?string $station = null;
    public ?array $stationinfo = null;
    public ?int $timestamp = null;
    public ?string $version = null;
}

/** Log entity data model. */
class Log
{
    public ?int $querytime = null;
    public ?string $querytype = null;
    public ?string $user_agent = null;
}

/** Request payload for Log#list. */
class LogListMatch
{
    public ?int $querytime = null;
    public ?string $querytype = null;
    public ?string $user_agent = null;
}

/** Occupancy entity data model. */
class Occupancy
{
}

/** Request payload for Occupancy#create. */
class OccupancyCreateData
{
}

/** Station entity data model. */
class Station
{
    public mixed $station;
    public int $timestamp;
    public string $version;
}

/** Request payload for Station#load. */
class StationLoadMatch
{
    public mixed $station = null;
    public ?int $timestamp = null;
    public ?string $version = null;
}

/** Vehicle entity data model. */
class Vehicle
{
    public array $stop;
    public int $timestamp;
    public string $vehicle;
    public ?array $vehicleinfo = null;
    public string $version;
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
    public ?array $stop = null;
    public ?int $timestamp = null;
    public ?string $vehicle = null;
    public ?array $vehicleinfo = null;
    public ?string $version = null;
}

