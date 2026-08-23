# Irail SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Irail",
            "slug": "irail",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.irail.be",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "composition": {},
                "connection": {},
                "disturbance": {},
                "liveboard": {},
                "log": {},
                "occupancy": {},
                "station": {},
                "vehicle": {},
            },
        },
        "entity": {
      "composition": {
        "fields": [
          {
            "name": "segments",
            "type": "`$OBJECT`",
          },
        ],
        "name": "composition",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/composition/",
                "parts": [
                  "composition",
                ],
                "select": {
                  "exist": [
                    "date",
                    "format",
                    "id",
                    "lang",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.composition`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "connection": {
        "fields": [
          {
            "name": "arrival",
            "type": "`$OBJECT`",
          },
          {
            "name": "departure",
            "type": "`$OBJECT`",
          },
          {
            "name": "duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "occupancy",
            "type": "`$OBJECT`",
          },
          {
            "name": "vias",
            "type": "`$OBJECT`",
          },
        ],
        "name": "connection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "alert",
                      "orig": "alert",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 6,
                      "kind": "query",
                      "name": "result",
                      "orig": "result",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "time",
                      "orig": "time",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "departure",
                      "kind": "query",
                      "name": "timesel",
                      "orig": "timesel",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type_of_transport",
                      "orig": "type_of_transport",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/connections/",
                "parts": [
                  "connections",
                ],
                "select": {
                  "exist": [
                    "alert",
                    "date",
                    "format",
                    "from",
                    "lang",
                    "result",
                    "time",
                    "timesel",
                    "to",
                    "type_of_transport",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.connection`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "disturbance": {
        "fields": [
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "link",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$INTEGER`",
          },
        ],
        "name": "disturbance",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "line_break_character",
                      "orig": "line_break_character",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/disturbances/",
                "parts": [
                  "disturbances",
                ],
                "select": {
                  "exist": [
                    "format",
                    "lang",
                    "line_break_character",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.disturbance`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "liveboard": {
        "fields": [
          {
            "name": "departures",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "station",
            "req": True,
            "short": "Station name",
            "type": "`$STRING`",
          },
          {
            "name": "stationinfo",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "req": True,
            "short": "Unix timestamp of the response",
            "type": "`$INTEGER`",
          },
          {
            "name": "version",
            "req": True,
            "short": "API version",
            "type": "`$STRING`",
          },
        ],
        "name": "liveboard",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "alert",
                      "orig": "alert",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": "departure",
                      "kind": "query",
                      "name": "arrdep",
                      "orig": "arrdep",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "300917",
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "BE.NMBS.008892007",
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "Gent-Sint-Pieters",
                      "kind": "query",
                      "name": "station",
                      "orig": "station",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "1230",
                      "kind": "query",
                      "name": "time",
                      "orig": "time",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/liveboard/",
                "parts": [
                  "liveboard",
                ],
                "select": {
                  "exist": [
                    "alert",
                    "arrdep",
                    "date",
                    "format",
                    "id",
                    "lang",
                    "station",
                    "time",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "log": {
        "fields": [
          {
            "name": "querytime",
            "type": "`$INTEGER`",
          },
          {
            "name": "querytype",
            "type": "`$STRING`",
          },
          {
            "name": "user_agent",
            "type": "`$STRING`",
          },
        ],
        "name": "log",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/logs/",
                "parts": [
                  "logs",
                ],
                "select": {
                  "exist": [
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.logs`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "occupancy": {
        "fields": [],
        "name": "occupancy",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/feedback/occupancy.php",
                "parts": [
                  "feedback",
                  "occupancy.php",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "station": {
        "fields": [
          {
            "name": "station",
            "req": True,
            "type": "`$ANY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "timestamp",
            "req": True,
            "short": "Unix timestamp of the response",
            "type": "`$INTEGER`",
          },
          {
            "name": "version",
            "req": True,
            "short": "API version",
            "type": "`$STRING`",
          },
        ],
        "name": "station",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/stations/",
                "parts": [
                  "stations",
                ],
                "select": {
                  "exist": [
                    "format",
                    "lang",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.station`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vehicle": {
        "fields": [
          {
            "name": "stops",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "timestamp",
            "req": True,
            "short": "Unix timestamp of the response",
            "type": "`$INTEGER`",
          },
          {
            "name": "vehicle",
            "req": True,
            "short": "Vehicle identifier",
            "type": "`$STRING`",
          },
          {
            "name": "vehicleinfo",
            "type": "`$OBJECT`",
          },
          {
            "name": "version",
            "req": True,
            "short": "API version",
            "type": "`$STRING`",
          },
        ],
        "name": "vehicle",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "alert",
                      "orig": "alert",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "xml",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "IC532",
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/vehicle/",
                "parts": [
                  "vehicle",
                ],
                "select": {
                  "exist": [
                    "alert",
                    "date",
                    "format",
                    "id",
                    "lang",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
