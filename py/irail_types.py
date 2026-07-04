# Typed models for the Irail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Composition(TypedDict, total=False):
    composition: dict
    timestamp: int
    vehicle: str
    version: str


class CompositionLoadMatch(TypedDict, total=False):
    composition: dict
    timestamp: int
    vehicle: str
    version: str


class Connection(TypedDict, total=False):
    arrival: dict
    departure: dict
    duration: int
    id: int
    occupancy: dict
    via: dict


class ConnectionListMatch(TypedDict, total=False):
    arrival: dict
    departure: dict
    duration: int
    id: int
    occupancy: dict
    via: dict


class Disturbance(TypedDict, total=False):
    description: str
    id: int
    link: str
    timestamp: int
    title: str
    type: int


class DisturbanceListMatch(TypedDict, total=False):
    description: str
    id: int
    link: str
    timestamp: int
    title: str
    type: int


class Liveboard(TypedDict):
    departure: dict
    station: str
    stationinfo: dict
    timestamp: int
    version: str


class LiveboardLoadMatch(TypedDict, total=False):
    departure: dict
    station: str
    stationinfo: dict
    timestamp: int
    version: str


class Log(TypedDict, total=False):
    querytime: int
    querytype: str
    user_agent: str


class LogListMatch(TypedDict, total=False):
    querytime: int
    querytype: str
    user_agent: str


class Occupancy(TypedDict):
    pass


class OccupancyCreateData(TypedDict):
    pass


class Station(TypedDict):
    station: Any
    timestamp: int
    version: str


class StationLoadMatch(TypedDict, total=False):
    station: Any
    timestamp: int
    version: str


class VehicleRequired(TypedDict):
    stop: dict
    timestamp: int
    vehicle: str
    version: str


class Vehicle(VehicleRequired, total=False):
    vehicleinfo: dict


class VehicleLoadMatch(TypedDict, total=False):
    stop: dict
    timestamp: int
    vehicle: str
    vehicleinfo: dict
    version: str
