

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"arrival","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"departure","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"duration","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"occupancy","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"vias","req":false,"type":"`$OBJECT`","index$":5}],"id":{"field":"id","name":"id"},"name":"connection","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":false,"kind":"query","name":"alert","orig":"alert","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"xml","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":3},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":6,"kind":"query","name":"result","orig":"result","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"kind":"query","name":"time","orig":"time","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":"departure","kind":"query","name":"timesel","orig":"timesel","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":8},{"active":true,"kind":"query","name":"type_of_transport","orig":"type_of_transport","reqd":false,"type":"`$STRING`","index$":9}]},"contract":{"id":"GET /connections/","json":"{\"operationId\":\"getConnections\",\"parameters\":[{\"description\":\"The departure station name\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The arrival station name\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The time to query in hhmm format\",\"in\":\"query\",\"name\":\"time\",\"required\":false,\"schema\":{\"pattern\":\"^[0-2][0-9][0-5][0-9]$\",\"type\":\"string\"}},{\"description\":\"The date to query in ddmmyy format\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"pattern\":\"^[0-3][0-9][0-1][0-9][0-9]{2}$\",\"type\":\"string\"}},{\"description\":\"Whether the time is the departure or arrival time\",\"in\":\"query\",\"name\":\"timesel\",\"required\":false,\"schema\":{\"default\":\"departure\",\"enum\":[\"departure\",\"arrival\"],\"type\":\"string\"}},{\"description\":\"The response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\",\"jsonp\"],\"type\":\"string\"}},{\"description\":\"The language of any text or names in the response\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"nl\",\"fr\",\"en\",\"de\"],\"type\":\"string\"}},{\"description\":\"Whether to include alerts about trains in the response\",\"in\":\"query\",\"name\":\"alerts\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Filter by type of transport\",\"in\":\"query\",\"name\":\"typeOfTransport\",\"required\":false,\"schema\":{\"enum\":[\"automatic\",\"trains\",\"nointernationaltrains\",\"all\"],\"type\":\"string\"}},{\"description\":\"Number of results to return\",\"in\":\"query\",\"name\":\"results\",\"required\":false,\"schema\":{\"default\":6,\"maximum\":6,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"connection\":{\"items\":{\"properties\":{\"arrival\":{\"properties\":{\"canceled\":{\"type\":\"integer\"},\"delay\":{\"type\":\"integer\"},\"platform\":{\"type\":\"string\"},\"station\":{\"type\":\"string\"},\"stationinfo\":{\"properties\":{\"@id\":{\"description\":\"The URI identifier of the station\",\"type\":\"string\"},\"id\":{\"description\":\"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'\",\"type\":\"string\"},\"locationX\":{\"description\":\"The longitude of the station\",\"type\":\"number\"},\"locationY\":{\"description\":\"The latitude of the station\",\"type\":\"number\"},\"name\":{\"description\":\"The default name of this station\",\"type\":\"string\"},\"standardname\":{\"description\":\"The consistent name of this station\",\"type\":\"string\"}},\"required\":[\"id\",\"@id\",\"locationX\",\"locationY\",\"standardname\",\"name\"],\"type\":\"object\"},\"time\":{\"type\":\"integer\"},\"vehicle\":{\"type\":\"string\"}},\"type\":\"object\"},\"departure\":{\"properties\":{\"canceled\":{\"type\":\"integer\"},\"delay\":{\"type\":\"integer\"},\"platform\":{\"type\":\"string\"},\"station\":{\"type\":\"string\"},\"stationinfo\":{\"properties\":{\"@id\":{\"description\":\"The URI identifier of the station\",\"type\":\"string\"},\"id\":{\"description\":\"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'\",\"type\":\"string\"},\"locationX\":{\"description\":\"The longitude of the station\",\"type\":\"number\"},\"locationY\":{\"description\":\"The latitude of the station\",\"type\":\"number\"},\"name\":{\"description\":\"The default name of this station\",\"type\":\"string\"},\"standardname\":{\"description\":\"The consistent name of this station\",\"type\":\"string\"}},\"required\":[\"id\",\"@id\",\"locationX\",\"locationY\",\"standardname\",\"name\"],\"type\":\"object\"},\"time\":{\"type\":\"integer\"},\"vehicle\":{\"type\":\"string\"}},\"type\":\"object\"},\"duration\":{\"type\":\"integer\"},\"id\":{\"type\":\"integer\"},\"occupancy\":{\"properties\":{\"@id\":{\"description\":\"Occupancy level URI\",\"type\":\"string\"},\"name\":{\"description\":\"Occupancy level name\",\"enum\":[\"low\",\"medium\",\"high\",\"unknown\"],\"type\":\"string\"}},\"type\":\"object\"},\"vias\":{\"properties\":{\"number\":{\"type\":\"integer\"},\"via\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"timestamp\":{\"description\":\"Unix timestamp of the response\",\"type\":\"integer\"},\"version\":{\"description\":\"API version\",\"type\":\"string\"}},\"required\":[\"version\",\"timestamp\",\"connection\"],\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with connections\",\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Content-Type\":{\"schema\":{\"type\":\"string\"}},\"cache-control\":{\"schema\":{\"type\":\"string\"}},\"etag\":{\"schema\":{\"type\":\"string\"}}}},\"304\":{\"description\":\"Not Modified - Content has not changed\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"},\"500\":{\"description\":\"Internal Server Error - May occur when querying dates too far in the past or future\"}},\"securitySchemes\":{},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/connections/","segments":[{"lit":"connections"}],"select":{"exist":["alert","date","format","from","lang","result","time","timesel","to","type_of_transport"]},"transform":{"req":"`reqdata`","res":"`body.connection`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"connection","name__orig":"connection","Name":"Connection","name_":"connection","name-":"connection","NAME":"CONNECTION","index$":1}, {"active":true,"entity":"connection","key$":"BasicConnectionFlow","kind":"basic","name":"BasicConnectionFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"connection_ref01"}}],"index$":0}]}, 'Connection')
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
  
