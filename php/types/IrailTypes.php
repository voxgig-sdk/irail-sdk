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

/** Match filter for Composition#load (any subset of Composition fields). */
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

/** Match filter for Connection#list (any subset of Connection fields). */
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

/** Match filter for Disturbance#list (any subset of Disturbance fields). */
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

/** Match filter for Liveboard#load (any subset of Liveboard fields). */
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

/** Match filter for Log#list (any subset of Log fields). */
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

/** Match filter for Occupancy#create (any subset of Occupancy fields). */
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

/** Match filter for Station#load (any subset of Station fields). */
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

/** Match filter for Vehicle#load (any subset of Vehicle fields). */
class VehicleLoadMatch
{
    public ?array $stop = null;
    public ?int $timestamp = null;
    public ?string $vehicle = null;
    public ?array $vehicleinfo = null;
    public ?string $version = null;
}

