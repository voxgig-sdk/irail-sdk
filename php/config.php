<?php
declare(strict_types=1);

// Irail SDK configuration

class IrailConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Irail",
                "slug" => "irail",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.irail.be/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "composition" => [],
                    "connection" => [],
                    "disturbance" => [],
                    "liveboard" => [],
                    "station" => [],
                    "vehicle" => [],
                ],
            ],
            "entity" => [
        'composition' => [
          'fields' => [
            [
              'name' => 'composition',
              'title' => 'Composition',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp of the response',
            ],
            [
              'name' => 'vehicle',
              'title' => 'Vehicle',
              'type' => '`$STRING`',
              'short' => 'Vehicle identifier',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'short' => 'API version',
            ],
          ],
          'name' => 'composition',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/composition',
                  'segments' => [
                    [
                      'lit' => 'composition',
                    ],
                  ],
                  'parts' => [
                    'composition',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.composition`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'IC532',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'connection' => [
          'fields' => [
            [
              'name' => 'arrival',
              'title' => 'Arrival',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'departure',
              'title' => 'Departure',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'duration',
              'title' => 'Duration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'occupancy',
              'title' => 'Occupancy',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'vias',
              'title' => 'Vias',
              'type' => '`$OBJECT`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'connection',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/connections',
                  'segments' => [
                    [
                      'lit' => 'connections',
                    ],
                  ],
                  'parts' => [
                    'connections',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.connection`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'alert',
                        'orig' => 'alerts',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Gent-Sint-Pieters',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'result',
                        'orig' => 'results',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 6,
                      ],
                      [
                        'name' => 'time',
                        'orig' => 'time',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'timesel',
                        'orig' => 'timesel',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'departure',
                      ],
                      [
                        'name' => 'to',
                        'orig' => 'to',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Brussels-Central',
                      ],
                      [
                        'name' => 'type_of_transport',
                        'orig' => 'typeOfTransport',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'from',
                      'to',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'disturbance' => [
          'fields' => [
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'link',
              'title' => 'Link',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'disturbance',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/disturbances',
                  'segments' => [
                    [
                      'lit' => 'disturbances',
                    ],
                  ],
                  'parts' => [
                    'disturbances',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.disturbance`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'line_break_character',
                        'orig' => 'lineBreakCharacter',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'liveboard' => [
          'fields' => [
            [
              'name' => 'departures',
              'title' => 'Departures',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'station',
              'title' => 'Station',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Station name',
            ],
            [
              'name' => 'stationinfo',
              'title' => 'Stationinfo',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Unix timestamp of the response',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'API version',
            ],
          ],
          'name' => 'liveboard',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/liveboard',
                  'segments' => [
                    [
                      'lit' => 'liveboard',
                    ],
                  ],
                  'parts' => [
                    'liveboard',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'alert',
                        'orig' => 'alerts',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'arrdep',
                        'orig' => 'arrdep',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'departure',
                      ],
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'station',
                        'orig' => 'station',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Gent-Sint-Pieters',
                        'field' => true,
                      ],
                      [
                        'name' => 'time',
                        'orig' => 'time',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'station',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'station' => [
          'fields' => [
            [
              'name' => 'station',
              'title' => 'Station',
              'type' => '`$ANY`',
              'req' => true,
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Unix timestamp of the response',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'API version',
            ],
          ],
          'name' => 'station',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/stations',
                  'segments' => [
                    [
                      'lit' => 'stations',
                    ],
                  ],
                  'parts' => [
                    'stations',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.station`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'vehicle' => [
          'fields' => [
            [
              'name' => 'stops',
              'title' => 'Stops',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Unix timestamp of the response',
            ],
            [
              'name' => 'vehicle',
              'title' => 'Vehicle',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Vehicle identifier',
            ],
            [
              'name' => 'vehicleinfo',
              'title' => 'Vehicleinfo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'API version',
            ],
          ],
          'name' => 'vehicle',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vehicle',
                  'segments' => [
                    [
                      'lit' => 'vehicle',
                    ],
                  ],
                  'parts' => [
                    'vehicle',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'alert',
                        'orig' => 'alerts',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'json',
                      ],
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'IC532',
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'raw',
                        'media' => 'application/xml',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IrailFeatures::make_feature($name);
    }
}
