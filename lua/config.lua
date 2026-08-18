-- Irail SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Irail",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.irail.be",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["composition"] = {},
        ["connection"] = {},
        ["disturbance"] = {},
        ["liveboard"] = {},
        ["log"] = {},
        ["occupancy"] = {},
        ["station"] = {},
        ["vehicle"] = {},
      },
    },
    entity = {
      ["composition"] = {
        ["fields"] = {
          {
            ["name"] = "segments",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "composition",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/composition/",
                ["parts"] = {
                  "composition",
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "format",
                    "id",
                    "lang",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.composition`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["connection"] = {
        ["fields"] = {
          {
            ["name"] = "arrival",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "departure",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "duration",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "occupancy",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "vias",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "connection",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "alert",
                      ["orig"] = "alert",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 6,
                      ["kind"] = "query",
                      ["name"] = "result",
                      ["orig"] = "result",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "time",
                      ["orig"] = "time",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "departure",
                      ["kind"] = "query",
                      ["name"] = "timesel",
                      ["orig"] = "timesel",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type_of_transport",
                      ["orig"] = "type_of_transport",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/connections/",
                ["parts"] = {
                  "connections",
                },
                ["select"] = {
                  ["exist"] = {
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
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.connection`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["disturbance"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "link",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "disturbance",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "line_break_character",
                      ["orig"] = "line_break_character",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/disturbances/",
                ["parts"] = {
                  "disturbances",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "lang",
                    "line_break_character",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.disturbance`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["liveboard"] = {
        ["fields"] = {
          {
            ["name"] = "departures",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "station",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "stationinfo",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "timestamp",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "liveboard",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "alert",
                      ["orig"] = "alert",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = "departure",
                      ["kind"] = "query",
                      ["name"] = "arrdep",
                      ["orig"] = "arrdep",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "300917",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "BE.NMBS.008892007",
                      ["kind"] = "query",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "Gent-Sint-Pieters",
                      ["kind"] = "query",
                      ["name"] = "station",
                      ["orig"] = "station",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "1230",
                      ["kind"] = "query",
                      ["name"] = "time",
                      ["orig"] = "time",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/liveboard/",
                ["parts"] = {
                  "liveboard",
                },
                ["select"] = {
                  ["exist"] = {
                    "alert",
                    "arrdep",
                    "date",
                    "format",
                    "id",
                    "lang",
                    "station",
                    "time",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["log"] = {
        ["fields"] = {
          {
            ["name"] = "querytime",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "querytype",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "user_agent",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "log",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/logs/",
                ["parts"] = {
                  "logs",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.logs`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["occupancy"] = {
        ["fields"] = {},
        ["name"] = "occupancy",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/feedback/occupancy.php",
                ["parts"] = {
                  "feedback",
                  "occupancy.php",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["station"] = {
        ["fields"] = {
          {
            ["name"] = "station",
            ["req"] = true,
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 0,
            },
          },
          {
            ["name"] = "timestamp",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "station",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/stations/",
                ["parts"] = {
                  "stations",
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "lang",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.station`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["vehicle"] = {
        ["fields"] = {
          {
            ["name"] = "stops",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "timestamp",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "vehicle",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "vehicleinfo",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "vehicle",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "alert",
                      ["orig"] = "alert",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "xml",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "IC532",
                      ["kind"] = "query",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/vehicle/",
                ["parts"] = {
                  "vehicle",
                },
                ["select"] = {
                  ["exist"] = {
                    "alert",
                    "date",
                    "format",
                    "id",
                    "lang",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
