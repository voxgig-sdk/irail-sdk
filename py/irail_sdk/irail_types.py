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
    segments: dict


class CompositionLoadMatchRequired(TypedDict):
    id: str


class CompositionLoadMatch(CompositionLoadMatchRequired, total=False):
    date: str
    format: str
    lang: str


class Connection(TypedDict, total=False):
    arrival: dict
    departure: dict
    duration: int
    id: int
    occupancy: dict
    vias: dict


class ConnectionListMatchRequired(TypedDict):
    to: str


class ConnectionListMatch(ConnectionListMatchRequired, total=False):
    alert: bool
    date: str
    format: str
    lang: str
    result: int
    time: str
    timesel: str
    type_of_transport: str


class Disturbance(TypedDict, total=False):
    description: str
    id: int
    link: str
    timestamp: int
    title: str
    type: int


class DisturbanceListMatch(TypedDict, total=False):
    format: str
    lang: str
    line_break_character: str


class Liveboard(TypedDict):
    departures: dict
    station: str
    stationinfo: dict
    timestamp: int
    version: str


class LiveboardLoadMatch(TypedDict, total=False):
    alert: bool
    arrdep: str
    date: str
    format: str
    id: str
    lang: str
    station: str
    time: str


class Log(TypedDict, total=False):
    querytime: int
    querytype: str
    user_agent: str


class LogListMatch(TypedDict, total=False):
    format: str


class Occupancy(TypedDict):
    pass


class OccupancyCreateData(TypedDict):
    pass


class Station(TypedDict):
    station: Any
    timestamp: int
    version: str


class StationLoadMatch(TypedDict, total=False):
    format: str
    lang: str


class VehicleRequired(TypedDict):
    stops: dict
    timestamp: int
    vehicle: str
    version: str


class Vehicle(VehicleRequired, total=False):
    vehicleinfo: dict


class VehicleLoadMatchRequired(TypedDict):
    id: str


class VehicleLoadMatch(VehicleLoadMatchRequired, total=False):
    alert: bool
    date: str
    format: str
    lang: str
