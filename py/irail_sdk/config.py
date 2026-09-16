# Irail SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
                "segments": [
                  {
                    "lit": "composition",
                  },
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
                "parts": [
                  "composition",
                ],
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "connections",
                  },
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
                "parts": [
                  "connections",
                ],
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "disturbances",
                  },
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
                "parts": [
                  "disturbances",
                ],
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
                "segments": [
                  {
                    "lit": "liveboard",
                  },
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
                "parts": [
                  "liveboard",
                ],
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
                "segments": [
                  {
                    "lit": "logs",
                  },
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
                "parts": [
                  "logs",
                ],
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
                "segments": [
                  {
                    "lit": "feedback",
                  },
                  {
                    "lit": "occupancy.php",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "feedback",
                  "occupancy.php",
                ],
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
                "segments": [
                  {
                    "lit": "stations",
                  },
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
                "parts": [
                  "stations",
                ],
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
                "segments": [
                  {
                    "lit": "vehicle",
                  },
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
                "parts": [
                  "vehicle",
                ],
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
