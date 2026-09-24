<?php
declare(strict_types=1);

// Typed models for the Irail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Composition entity data model. */
class Composition
{
    public ?array $segments = null;
}

/** Request payload for Composition#load. */
class CompositionLoadMatch
{
    public ?string $date = null;
    public ?string $format = null;
    public string $id;
    public ?string $lang = null;
}

/** Connection entity data model. */
class Connection
{
    public ?array $arrival = null;
    public ?array $departure = null;
    public ?int $duration = null;
    public ?int $id = null;
    public ?array $occupancy = null;
    public ?array $vias = null;
}

/** Request payload for Connection#list. */
class ConnectionListMatch
{
    public ?bool $alert = null;
    public ?string $date = null;
    public ?string $format = null;
    public string $from;
    public ?string $lang = null;
    public ?int $result = null;
    public ?string $time = null;
    public ?string $timesel = null;
    public string $to;
    public ?string $type_of_transport = null;
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
    public ?string $format = null;
    public ?string $lang = null;
    public ?string $line_break_character = null;
}

/** Liveboard entity data model. */
class Liveboard
{
    public array $departures;
    public string $station;
    public array $stationinfo;
    public int $timestamp;
    public string $version;
}

/** Request payload for Liveboard#load. */
class LiveboardLoadMatch
{
    public ?bool $alert = null;
    public ?string $arrdep = null;
    public ?string $date = null;
    public ?string $format = null;
    public ?string $id = null;
    public ?string $lang = null;
    public ?string $station = null;
    public ?string $time = null;
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
    public ?string $format = null;
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
    public ?string $format = null;
    public ?string $lang = null;
}

/** Vehicle entity data model. */
class Vehicle
{
    public array $stops;
    public int $timestamp;
    public string $vehicle;
    public ?array $vehicleinfo = null;
    public string $version;
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
    public ?bool $alert = null;
    public ?string $date = null;
    public ?string $format = null;
    public string $id;
    public ?string $lang = null;
}

