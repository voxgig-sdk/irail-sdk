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
    "path": "/composition",
    "args": [],
    "select": {
      "format": "json",
      "id": "IC532",
      "date": "v1",
      "lang": "en"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [
      "id",
      "date",
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "id",
        "wire": "id"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
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
    "path": "/connections",
    "args": [],
    "select": {
      "format": "json",
      "from": "Gent-Sint-Pieters",
      "to": "Brussels-Central",
      "alert": "v1",
      "date": "v1",
      "lang": "en",
      "result": 6,
      "time": "v1",
      "timesel": "departure",
      "type_of_transport": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
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
    "queryArgs": [
      {
        "name": "alert",
        "wire": "alerts"
      },
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "result",
        "wire": "results"
      },
      {
        "name": "time",
        "wire": "time"
      },
      {
        "name": "timesel",
        "wire": "timesel"
      },
      {
        "name": "to",
        "wire": "to"
      },
      {
        "name": "type_of_transport",
        "wire": "typeOfTransport"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "connection": [
        {
          "id": 1,
          "departure": {
            "delay": 1,
            "station": "x",
            "stationinfo": {
              "id": "x",
              "@id": "x",
              "locationX": 1,
              "locationY": 1,
              "standardname": "x",
              "name": "x"
            },
            "time": 1,
            "vehicle": "x",
            "platform": "x",
            "canceled": 1
          },
          "arrival": {
            "delay": 1,
            "station": "x",
            "stationinfo": {
              "id": "x",
              "@id": "x",
              "locationX": 1,
              "locationY": 1,
              "standardname": "x",
              "name": "x"
            },
            "time": 1,
            "vehicle": "x",
            "platform": "x",
            "canceled": 1
          },
          "vias": {
            "number": 1,
            "via": [
              {}
            ]
          },
          "duration": 1,
          "occupancy": {
            "@id": "x",
            "name": "low"
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
    "path": "/disturbances",
    "args": [],
    "select": {
      "format": "json",
      "lang": "en",
      "line_break_character": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [
      "format",
      "lang",
      "lineBreakCharacter"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "line_break_character",
        "wire": "lineBreakCharacter"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "disturbance": [
        {
          "id": 1,
          "title": "x",
          "description": "x",
          "type": 1,
          "timestamp": 1,
          "link": "x"
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
    "path": "/liveboard",
    "args": [],
    "select": {
      "format": "json",
      "station": "Gent-Sint-Pieters",
      "alert": "v1",
      "arrdep": "departure",
      "date": "v1",
      "id": "v1",
      "lang": "en",
      "time": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
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
    "queryArgs": [
      {
        "name": "alert",
        "wire": "alerts"
      },
      {
        "name": "arrdep",
        "wire": "arrdep"
      },
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "id",
        "wire": "id"
      },
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "station",
        "wire": "station"
      },
      {
        "name": "time",
        "wire": "time"
      }
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
    "entity": "station",
    "accessor": "Station",
    "op": "load",
    "method": "GET",
    "path": "/stations",
    "args": [],
    "select": {
      "format": "json",
      "lang": "en"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [
      "format",
      "lang"
    ],
    "queryArgs": [
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
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
    "path": "/vehicle",
    "args": [],
    "select": {
      "format": "json",
      "id": "IC532",
      "alert": "v1",
      "date": "v1",
      "lang": "en"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "application/xml"
    ],
    "query": [
      "id",
      "date",
      "format",
      "lang",
      "alerts"
    ],
    "queryArgs": [
      {
        "name": "alert",
        "wire": "alerts"
      },
      {
        "name": "date",
        "wire": "date"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "id",
        "wire": "id"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "x",
      "timestamp": 1,
      "vehicle": "x",
      "vehicleinfo": {
        "name": "x",
        "shortname": "x",
        "@id": "x"
      },
      "stops": {
        "number": 1,
        "stop": [
          {
            "id": 1,
            "station": "x",
            "stationinfo": {
              "id": "x",
              "@id": "x",
              "locationX": 1,
              "locationY": 1,
              "standardname": "x",
              "name": "x"
            },
            "time": 1,
            "delay": 1,
            "platform": "x",
            "platforminfo": {
              "name": "x",
              "normal": "x"
            },
            "canceled": 1,
            "left": 1,
            "occupancy": {
              "@id": "x",
              "name": "low"
            }
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
