# Typed models for the Irail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Composition:
    composition: Optional[dict] = None
    timestamp: Optional[int] = None
    vehicle: Optional[str] = None
    version: Optional[str] = None


@dataclass
class CompositionLoadMatch:
    composition: Optional[dict] = None
    timestamp: Optional[int] = None
    vehicle: Optional[str] = None
    version: Optional[str] = None


@dataclass
class Connection:
    arrival: Optional[dict] = None
    departure: Optional[dict] = None
    duration: Optional[int] = None
    id: Optional[int] = None
    occupancy: Optional[dict] = None
    via: Optional[dict] = None


@dataclass
class ConnectionListMatch:
    arrival: Optional[dict] = None
    departure: Optional[dict] = None
    duration: Optional[int] = None
    id: Optional[int] = None
    occupancy: Optional[dict] = None
    via: Optional[dict] = None


@dataclass
class Disturbance:
    description: Optional[str] = None
    id: Optional[int] = None
    link: Optional[str] = None
    timestamp: Optional[int] = None
    title: Optional[str] = None
    type: Optional[int] = None


@dataclass
class DisturbanceListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    link: Optional[str] = None
    timestamp: Optional[int] = None
    title: Optional[str] = None
    type: Optional[int] = None


@dataclass
class Liveboard:
    departure: dict
    station: str
    stationinfo: dict
    timestamp: int
    version: str


@dataclass
class LiveboardLoadMatch:
    departure: Optional[dict] = None
    station: Optional[str] = None
    stationinfo: Optional[dict] = None
    timestamp: Optional[int] = None
    version: Optional[str] = None


@dataclass
class Log:
    querytime: Optional[int] = None
    querytype: Optional[str] = None
    user_agent: Optional[str] = None


@dataclass
class LogListMatch:
    querytime: Optional[int] = None
    querytype: Optional[str] = None
    user_agent: Optional[str] = None


@dataclass
class Occupancy:
    pass


@dataclass
class OccupancyCreateData:
    pass


@dataclass
class Station:
    station: Any
    timestamp: int
    version: str


@dataclass
class StationLoadMatch:
    station: Optional[Any] = None
    timestamp: Optional[int] = None
    version: Optional[str] = None


@dataclass
class Vehicle:
    stop: dict
    timestamp: int
    vehicle: str
    version: str
    vehicleinfo: Optional[dict] = None


@dataclass
class VehicleLoadMatch:
    stop: Optional[dict] = None
    timestamp: Optional[int] = None
    vehicle: Optional[str] = None
    vehicleinfo: Optional[dict] = None
    version: Optional[str] = None

