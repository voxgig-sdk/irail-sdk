import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "composition",
    "accessor": "Composition",
    "op": "load",
    "method": "GET",
    "path": "/composition/",
    "args": [],
    "select": {
      "date": "v1",
      "format": "v1",
      "id": "v1",
      "lang": "v1"
    },
    "headers": [],
    "query": [
      "id",
      "date",
      "format",
      "lang"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "vehicle": "x",
      "composition": {
        "segments": {
          "number": 1,
          "segment": [
            {}
          ]
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "connection",
    "accessor": "Connection",
    "op": "list",
    "method": "GET",
    "path": "/connections/",
    "args": [],
    "select": {
      "alert": "v1",
      "date": "v1",
      "format": "v1",
      "from": "v1",
      "lang": "v1",
      "result": "v1",
      "time": "v1",
      "timesel": "v1",
      "to": "v1",
      "type_of_transport": "v1"
    },
    "headers": [],
    "query": [
      "from",
      "to",
      "time",
      "date",
      "timesel",
      "format",
      "lang",
      "alerts",
      "typeOfTransport",
      "results"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "connection": [
        {
          "arrival": {
            "canceled": 1,
            "delay": 1,
            "platform": "x",
            "station": "x",
            "stationinfo": {
              "@id": "x",
              "id": "x",
              "locationX": 1,
              "locationY": 1,
              "name": "x",
              "standardname": "x"
            },
            "time": 1,
            "vehicle": "x"
          },
          "departure": {
            "canceled": 1,
            "delay": 1,
            "platform": "x",
            "station": "x",
            "stationinfo": {
              "@id": "x",
              "id": "x",
              "locationX": 1,
              "locationY": 1,
              "name": "x",
              "standardname": "x"
            },
            "time": 1,
            "vehicle": "x"
          },
          "duration": 1,
          "id": 1,
          "occupancy": {
            "@id": "x",
            "name": "low"
          },
          "vias": {
            "number": 1,
            "via": [
              {}
            ]
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "disturbance",
    "accessor": "Disturbance",
    "op": "list",
    "method": "GET",
    "path": "/disturbances/",
    "args": [],
    "select": {
      "format": "v1",
      "lang": "v1",
      "line_break_character": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "lang",
      "lineBreakCharacter"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "disturbance": [
        {
          "description": "x",
          "id": 1,
          "link": "x",
          "timestamp": 1,
          "title": "x",
          "type": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "liveboard",
    "accessor": "Liveboard",
    "op": "load",
    "method": "GET",
    "path": "/liveboard/",
    "args": [],
    "select": {
      "alert": "v1",
      "arrdep": "v1",
      "date": "300917",
      "format": "v1",
      "id": "BE.NMBS.008892007",
      "lang": "v1",
      "station": "Gent-Sint-Pieters",
      "time": "1230"
    },
    "headers": [],
    "query": [
      "station",
      "id",
      "arrdep",
      "alerts",
      "time",
      "date",
      "format",
      "lang"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "1.1",
      "timestamp": 1489614297,
      "station": "Ghent-Sint-Pieters",
      "stationinfo": {
        "id": "BE.NMBS.008821006",
        "@id": "http://irail.be/stations/NMBS/008821006",
        "locationX": 4.421101,
        "locationY": 51.2172,
        "standardname": "Antwerpen-Centraal",
        "name": "Antwerp-Central"
      },
      "departures": {
        "number": 32,
        "departure": [
          {
            "id": 0,
            "delay": 0,
            "station": "Antwerp-Central",
            "stationinfo": {
              "id": "BE.NMBS.008821006",
              "@id": "http://irail.be/stations/NMBS/008821006",
              "locationX": 4.421101,
              "locationY": 51.2172,
              "standardname": "Antwerpen-Centraal",
              "name": "Antwerp-Central"
            },
            "time": 1489575600,
            "vehicle": "BE.NMBS.IC3033",
            "vehicleinfo": {
              "name": "BE.NMBS.IC3033",
              "shortname": "IC3033",
              "@id": "http://irail.be/vehicle/IC3033"
            },
            "platform": 4,
            "platforminfo": {
              "name": "4",
              "normal": "1"
            },
            "canceled": 0,
            "left": 0,
            "departureConnection": "http://irail.be/connections/8821006/20170316/IC1832",
            "occupancy": {
              "@id": "http://api.irail.be/terms/unknown",
              "name": "unknown"
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "log",
    "accessor": "Log",
    "op": "list",
    "method": "GET",
    "path": "/logs/",
    "args": [],
    "select": {
      "format": "v1"
    },
    "headers": [],
    "query": [
      "format"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "logs": [
        {
          "querytime": 1,
          "querytype": "x",
          "user_agent": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "occupancy",
    "accessor": "Occupancy",
    "op": "create",
    "method": "POST",
    "path": "/feedback/occupancy.php",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "station",
    "accessor": "Station",
    "op": "load",
    "method": "GET",
    "path": "/stations/",
    "args": [],
    "select": {
      "format": "v1",
      "lang": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "lang"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "1.1",
      "timestamp": 1489621486,
      "station": {
        "id": "BE.NMBS.008821006",
        "@id": "http://irail.be/stations/NMBS/008821006",
        "locationX": 4.421101,
        "locationY": 51.2172,
        "standardname": "Antwerpen-Centraal",
        "name": "Antwerp-Central"
      }
    },
    "idField": "id"
  },
  {
    "entity": "vehicle",
    "accessor": "Vehicle",
    "op": "load",
    "method": "GET",
    "path": "/vehicle/",
    "args": [],
    "select": {
      "alert": "v1",
      "date": "v1",
      "format": "v1",
      "id": "IC532",
      "lang": "v1"
    },
    "headers": [],
    "query": [
      "id",
      "date",
      "format",
      "lang",
      "alerts"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "vehicle": "x",
      "vehicleinfo": {
        "@id": "x",
        "name": "x",
        "shortname": "x"
      },
      "stops": {
        "number": 1,
        "stop": [
          {
            "canceled": 1,
            "delay": 1,
            "id": 1,
            "left": 1,
            "occupancy": {
              "@id": "x",
              "name": "low"
            },
            "platform": "x",
            "platforminfo": {
              "name": "x",
              "normal": "x"
            },
            "station": "x",
            "stationinfo": {
              "@id": "x",
              "id": "x",
              "locationX": 1,
              "locationY": 1,
              "name": "x",
              "standardname": "x"
            },
            "time": 1
          }
        ]
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
