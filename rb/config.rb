# Irail SDK configuration

module IrailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Irail",
        "slug" => "irail",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.irail.be",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "composition" => {},
          "connection" => {},
          "disturbance" => {},
          "liveboard" => {},
          "log" => {},
          "occupancy" => {},
          "station" => {},
          "vehicle" => {},
        },
      },
      "entity" => {
        "composition" => {
          "fields" => [
            {
              "name" => "segments",
              "title" => "Segments",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "composition",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/composition/",
                  "segments" => [
                    {
                      "lit" => "composition",
                    },
                  ],
                  "parts" => [
                    "composition",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.composition`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "id",
                      "lang",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "connection" => {
          "fields" => [
            {
              "name" => "arrival",
              "title" => "Arrival",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "departure",
              "title" => "Departure",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "duration",
              "title" => "Duration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "occupancy",
              "title" => "Occupancy",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "vias",
              "title" => "Vias",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "connection",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/connections/",
                  "segments" => [
                    {
                      "lit" => "connections",
                    },
                  ],
                  "parts" => [
                    "connections",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.connection`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "alert",
                        "orig" => "alert",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "from",
                        "orig" => "from",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                      {
                        "name" => "result",
                        "orig" => "result",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 6,
                      },
                      {
                        "name" => "time",
                        "orig" => "time",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "timesel",
                        "orig" => "timesel",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "departure",
                      },
                      {
                        "name" => "to",
                        "orig" => "to",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "type_of_transport",
                        "orig" => "type_of_transport",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "disturbance" => {
          "fields" => [
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "disturbance",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/disturbances/",
                  "segments" => [
                    {
                      "lit" => "disturbances",
                    },
                  ],
                  "parts" => [
                    "disturbances",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.disturbance`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                      {
                        "name" => "line_break_character",
                        "orig" => "line_break_character",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "lang",
                      "line_break_character",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "liveboard" => {
          "fields" => [
            {
              "name" => "departures",
              "title" => "Departures",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "station",
              "title" => "Station",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Station name",
            },
            {
              "name" => "stationinfo",
              "title" => "Stationinfo",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Unix timestamp of the response",
            },
            {
              "name" => "version",
              "title" => "Version",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "API version",
            },
          ],
          "name" => "liveboard",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/liveboard/",
                  "segments" => [
                    {
                      "lit" => "liveboard",
                    },
                  ],
                  "parts" => [
                    "liveboard",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "alert",
                        "orig" => "alert",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "arrdep",
                        "orig" => "arrdep",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "departure",
                      },
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "300917",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "BE.NMBS.008892007",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                      {
                        "name" => "station",
                        "orig" => "station",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "Gent-Sint-Pieters",
                      },
                      {
                        "name" => "time",
                        "orig" => "time",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "1230",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "log" => {
          "fields" => [
            {
              "name" => "querytime",
              "title" => "Querytime",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "querytype",
              "title" => "Querytype",
              "type" => "`$STRING`",
            },
            {
              "name" => "user_agent",
              "title" => "User Agent",
              "type" => "`$STRING`",
            },
          ],
          "name" => "log",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/logs/",
                  "segments" => [
                    {
                      "lit" => "logs",
                    },
                  ],
                  "parts" => [
                    "logs",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.logs`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "occupancy" => {
          "fields" => [],
          "name" => "occupancy",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/feedback/occupancy.php",
                  "segments" => [
                    {
                      "lit" => "feedback",
                    },
                    {
                      "lit" => "occupancy.php",
                    },
                  ],
                  "parts" => [
                    "feedback",
                    "occupancy.php",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "station" => {
          "fields" => [
            {
              "name" => "station",
              "title" => "Station",
              "type" => "`$ANY`",
              "req" => true,
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Unix timestamp of the response",
            },
            {
              "name" => "version",
              "title" => "Version",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "API version",
            },
          ],
          "name" => "station",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stations/",
                  "segments" => [
                    {
                      "lit" => "stations",
                    },
                  ],
                  "parts" => [
                    "stations",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.station`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "lang",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "vehicle" => {
          "fields" => [
            {
              "name" => "stops",
              "title" => "Stops",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Unix timestamp of the response",
            },
            {
              "name" => "vehicle",
              "title" => "Vehicle",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Vehicle identifier",
            },
            {
              "name" => "vehicleinfo",
              "title" => "Vehicleinfo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "version",
              "title" => "Version",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "API version",
            },
          ],
          "name" => "vehicle",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/vehicle/",
                  "segments" => [
                    {
                      "lit" => "vehicle",
                    },
                  ],
                  "parts" => [
                    "vehicle",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "alert",
                        "orig" => "alert",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "xml",
                      },
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "IC532",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "alert",
                      "date",
                      "format",
                      "id",
                      "lang",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IrailFeatures.make_feature(name)
  end
end
