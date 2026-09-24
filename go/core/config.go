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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Segments",
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
								"kind": "http",
								"method": "GET",
								"orig": "/composition/",
								"segments": []any{
									map[string]any{
										"lit": "composition",
									},
								},
								"parts": []any{
									"composition",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.composition`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"id",
										"lang",
									},
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
						"title": "Arrival",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "departure",
						"title": "Departure",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "occupancy",
						"title": "Occupancy",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "vias",
						"title": "Vias",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "connection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/connections/",
								"segments": []any{
									map[string]any{
										"lit": "connections",
									},
								},
								"parts": []any{
									"connections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.connection`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "result",
											"orig": "result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 6,
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "timesel",
											"orig": "timesel",
											"type": "`$STRING`",
											"kind": "query",
											"example": "departure",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type_of_transport",
											"orig": "type_of_transport",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
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
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "disturbance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/disturbances/",
								"segments": []any{
									map[string]any{
										"lit": "disturbances",
									},
								},
								"parts": []any{
									"disturbances",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.disturbance`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "line_break_character",
											"orig": "line_break_character",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"lang",
										"line_break_character",
									},
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
						"title": "Departures",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "station",
						"title": "Station",
						"type": "`$STRING`",
						"req": true,
						"short": "Station name",
					},
					map[string]any{
						"name": "stationinfo",
						"title": "Stationinfo",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Unix timestamp of the response",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "API version",
					},
				},
				"name": "liveboard",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/liveboard/",
								"segments": []any{
									map[string]any{
										"lit": "liveboard",
									},
								},
								"parts": []any{
									"liveboard",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "arrdep",
											"orig": "arrdep",
											"type": "`$STRING`",
											"kind": "query",
											"example": "departure",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "300917",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "BE.NMBS.008892007",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "station",
											"orig": "station",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Gent-Sint-Pieters",
										},
										map[string]any{
											"name": "time",
											"orig": "time",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1230",
										},
									},
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
						"title": "Querytime",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "querytype",
						"title": "Querytype",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_agent",
						"title": "User Agent",
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
								"kind": "http",
								"method": "GET",
								"orig": "/logs/",
								"segments": []any{
									map[string]any{
										"lit": "logs",
									},
								},
								"parts": []any{
									"logs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.logs`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
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
								"kind": "http",
								"method": "POST",
								"orig": "/feedback/occupancy.php",
								"segments": []any{
									map[string]any{
										"lit": "feedback",
									},
									map[string]any{
										"lit": "occupancy.php",
									},
								},
								"parts": []any{
									"feedback",
									"occupancy.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Station",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Unix timestamp of the response",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "API version",
					},
				},
				"name": "station",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/stations/",
								"segments": []any{
									map[string]any{
										"lit": "stations",
									},
								},
								"parts": []any{
									"stations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.station`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"lang",
									},
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
						"title": "Stops",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "timestamp",
						"title": "Timestamp",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Unix timestamp of the response",
					},
					map[string]any{
						"name": "vehicle",
						"title": "Vehicle",
						"type": "`$STRING`",
						"req": true,
						"short": "Vehicle identifier",
					},
					map[string]any{
						"name": "vehicleinfo",
						"title": "Vehicleinfo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "API version",
					},
				},
				"name": "vehicle",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/vehicle/",
								"segments": []any{
									map[string]any{
										"lit": "vehicle",
									},
								},
								"parts": []any{
									"vehicle",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "alert",
											"orig": "alert",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "xml",
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "IC532",
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
