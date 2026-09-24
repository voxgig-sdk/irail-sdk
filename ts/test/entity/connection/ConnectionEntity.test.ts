

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IrailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Connection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arrival":{"a":true,"h":"Arrival","n":"arrival","r":false,"t":"`$OBJECT`","key$":"arrival","index$":0},"departure":{"a":true,"h":"Departure","n":"departure","r":false,"t":"`$OBJECT`","key$":"departure","index$":1},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"t":"`$INTEGER`","key$":"duration","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":3},"occupancy":{"a":true,"h":"Occupancy","n":"occupancy","r":false,"t":"`$OBJECT`","key$":"occupancy","index$":4},"vias":{"a":true,"h":"Vias","n":"vias","r":false,"t":"`$OBJECT`","key$":"vias","index$":5}},"id":{"field":"id","name":"id"},"name":"connection","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /connections/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"alert","or":"alert","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$STRING`","index$":3},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":6,"k":"query","n":"result","or":"result","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"time","or":"time","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"departure","k":"query","n":"timesel","or":"timesel","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"type_of_transport","or":"type_of_transport","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/connections/","q":{"exist":["alert","date","format","from","lang","result","time","timesel","to","type_of_transport"]},"r":{},"s":[{"lit":"connections"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"connection","name__orig":"connection","Name":"Connection","name_":"connection","name-":"connection","NAME":"CONNECTION","index$":1}, {"active":true,"entity":"connection","key$":"BasicConnectionFlow","kind":"basic","name":"BasicConnectionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"connection_ref01"}}],"index$":0}]}, 'Connection', {"GET /connections/":{"protocol":"http","operationId":"getConnections","responses":{"200":{"description":"Successful response with connections","headers":{"Content-Type":{"schema":{"type":"string"}},"Access-Control-Allow-Origin":{"schema":{"type":"string"}},"cache-control":{"schema":{"type":"string"}},"etag":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"version":{"description":"API version","key$":"version","type":"string"},"timestamp":{"description":"Unix timestamp of the response","key$":"timestamp","type":"integer"},"connection":{"items":{"properties":{"arrival":{"properties":{"canceled":{"type":"integer"},"delay":{"type":"integer"},"platform":{"type":"string"},"station":{"type":"string"},"stationinfo":{"properties":{"@id":{"description":"The URI identifier of the station","type":"string"},"id":{"description":"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'","type":"string"},"locationX":{"description":"The longitude of the station","type":"number"},"locationY":{"description":"The latitude of the station","type":"number"},"name":{"description":"The default name of this station","type":"string"},"standardname":{"description":"The consistent name of this station","type":"string"}},"required":["id","@id","locationX","locationY","standardname","name"],"type":"object","x-ref":"#/components/schemas/Station"},"time":{"type":"integer"},"vehicle":{"type":"string"}},"type":"object","key$":"arrival"},"departure":{"properties":{"canceled":{"type":"integer"},"delay":{"type":"integer"},"platform":{"type":"string"},"station":{"type":"string"},"stationinfo":{"properties":{"@id":{"description":"The URI identifier of the station","type":"string"},"id":{"description":"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'","type":"string"},"locationX":{"description":"The longitude of the station","type":"number"},"locationY":{"description":"The latitude of the station","type":"number"},"name":{"description":"The default name of this station","type":"string"},"standardname":{"description":"The consistent name of this station","type":"string"}},"required":["id","@id","locationX","locationY","standardname","name"],"type":"object","x-ref":"#/components/schemas/Station"},"time":{"type":"integer"},"vehicle":{"type":"string"}},"type":"object","key$":"departure"},"duration":{"type":"integer","key$":"duration"},"id":{"type":"integer","key$":"id"},"occupancy":{"properties":{"@id":{"description":"Occupancy level URI","type":"string"},"name":{"description":"Occupancy level name","enum":["low","medium","high","unknown"],"type":"string"}},"type":"object","x-ref":"#/components/schemas/Occupancy","key$":"occupancy"},"vias":{"properties":{"number":{"type":"integer"},"via":{"items":{"type":"object"},"type":"array"}},"type":"object","key$":"vias"}},"type":"object","index$":0},"key$":"connection","type":"array"}},"required":["version","timestamp","connection"],"x-ref":"#/components/schemas/ConnectionsResponse"}},"application/xml":{"schema":{"type":"string"}}}},"304":{"description":"Not Modified - Content has not changed"},"429":{"description":"Too Many Requests - Rate limit exceeded"},"500":{"description":"Internal Server Error - May occur when querying dates too far in the past or future"}},"parameters":[{"name":"from","in":"query","description":"The departure station name","required":true,"schema":{"type":"string"},"index$":0},{"name":"to","in":"query","description":"The arrival station name","required":true,"schema":{"type":"string"},"index$":1},{"name":"time","in":"query","description":"The time to query in hhmm format","required":false,"schema":{"type":"string","pattern":"^[0-2][0-9][0-5][0-9]$"},"index$":2},{"name":"date","in":"query","description":"The date to query in ddmmyy format","required":false,"schema":{"type":"string","pattern":"^[0-3][0-9][0-1][0-9][0-9]{2}$"},"index$":3},{"name":"timesel","in":"query","description":"Whether the time is the departure or arrival time","required":false,"schema":{"type":"string","enum":["departure","arrival"],"default":"departure"},"index$":4},{"name":"format","in":"query","description":"The response format","required":false,"schema":{"type":"string","enum":["xml","json","jsonp"],"default":"xml"},"index$":5},{"name":"lang","in":"query","description":"The language of any text or names in the response","required":false,"schema":{"type":"string","enum":["nl","fr","en","de"],"default":"en"},"index$":6},{"name":"alerts","in":"query","description":"Whether to include alerts about trains in the response","required":false,"schema":{"type":"boolean","default":false},"index$":7},{"name":"typeOfTransport","in":"query","description":"Filter by type of transport","required":false,"schema":{"type":"string","enum":["automatic","trains","nointernationaltrains","all"]},"index$":8},{"name":"results","in":"query","description":"Number of results to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":6,"default":6},"index$":9}],"securitySource":"unspecified","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let connection_ref01_data = Object.values(setup.data.existing.connection)[0] as any

    // LIST
    const connection_ref01_ent = client.Connection()
    const connection_ref01_match: any = {}

    const connection_ref01_list = (await connection_ref01_ent.list(connection_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/connection/ConnectionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IrailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['connection01','connection02','connection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_CONNECTION_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_CONNECTION_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_CONNECTION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IrailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.IRAIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
