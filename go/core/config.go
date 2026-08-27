package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Irail",
			"slug": "irail",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.irail.be",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"composition": map[string]any{},
				"connection": map[string]any{},
				"disturbance": map[string]any{},
				"liveboard": map[string]any{},
				"log": map[string]any{},
				"occupancy": map[string]any{},
				"station": map[string]any{},
				"vehicle": map[string]any{},
			},
		},
		"entity": map[string]any{
			"composition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "segments",
						"type": "`$OBJECT`",
					},
				},
				"name": "composition",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/composition/",
								"parts": []any{
									"composition",
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"id",
										"lang",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.composition`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"connection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arrival",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "departure",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "occupancy",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "vias",
						"type": "`$OBJECT`",
					},
				},
				"name": "connection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 6,
											"kind": "query",
											"name": "result",
											"orig": "result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "departure",
											"kind": "query",
											"name": "timesel",
											"orig": "timesel",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type_of_transport",
											"orig": "type_of_transport",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/connections/",
								"parts": []any{
									"connections",
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.connection`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"disturbance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$INTEGER`",
					},
				},
				"name": "disturbance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "line_break_character",
											"orig": "line_break_character",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/disturbances/",
								"parts": []any{
									"disturbances",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"lang",
										"line_break_character",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.disturbance`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"liveboard": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departures",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "station",
						"req": true,
						"short": "Station name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stationinfo",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timestamp",
						"req": true,
						"short": "Unix timestamp of the response",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "API version",
						"type": "`$STRING`",
					},
				},
				"name": "liveboard",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "departure",
											"kind": "query",
											"name": "arrdep",
											"orig": "arrdep",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "300917",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "BE.NMBS.008892007",
											"kind": "query",
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "Gent-Sint-Pieters",
											"kind": "query",
											"name": "station",
											"orig": "station",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1230",
											"kind": "query",
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/liveboard/",
								"parts": []any{
									"liveboard",
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"log": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "querytime",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "querytype",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_agent",
						"type": "`$STRING`",
					},
				},
				"name": "log",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/logs/",
								"parts": []any{
									"logs",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.logs`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"occupancy": map[string]any{
				"fields": []any{},
				"name": "occupancy",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/feedback/occupancy.php",
								"parts": []any{
									"feedback",
									"occupancy.php",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"station": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "station",
						"req": true,
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "timestamp",
						"req": true,
						"short": "Unix timestamp of the response",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "API version",
						"type": "`$STRING`",
					},
				},
				"name": "station",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/stations/",
								"parts": []any{
									"stations",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"lang",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.station`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "stops",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "timestamp",
						"req": true,
						"short": "Unix timestamp of the response",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "vehicle",
						"req": true,
						"short": "Vehicle identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vehicleinfo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "API version",
						"type": "`$STRING`",
					},
				},
				"name": "vehicle",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "IC532",
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicle/",
								"parts": []any{
									"vehicle",
								},
								"select": map[string]any{
									"exist": []any{
										"alert",
										"date",
										"format",
										"id",
										"lang",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
