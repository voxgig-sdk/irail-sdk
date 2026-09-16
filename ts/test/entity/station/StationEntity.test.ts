

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


describe('StationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Station()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'station.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"station","req":true,"type":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"index$":0},{"active":true,"name":"timestamp","req":true,"short":"Unix timestamp of the response","type":"`$INTEGER`","index$":1},{"active":true,"name":"version","req":true,"short":"API version","type":"`$STRING`","index$":2}],"name":"station","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"xml","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /stations/","json":"{\"operationId\":\"getStations\",\"parameters\":[{\"description\":\"The response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\",\"jsonp\"],\"type\":\"string\"}},{\"description\":\"The language of any text or names in the response\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"nl\",\"fr\",\"en\",\"de\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"station\":{\"@id\":\"http://irail.be/stations/NMBS/008821006\",\"id\":\"BE.NMBS.008821006\",\"locationX\":4.421101,\"locationY\":51.2172,\"name\":\"Antwerp-Central\",\"standardname\":\"Antwerpen-Centraal\"},\"timestamp\":1489621486,\"version\":\"1.1\"},\"schema\":{\"properties\":{\"station\":{\"oneOf\":[{\"properties\":{\"@id\":{\"description\":\"The URI identifier of the station\",\"type\":\"string\"},\"id\":{\"description\":\"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'\",\"type\":\"string\"},\"locationX\":{\"description\":\"The longitude of the station\",\"type\":\"number\"},\"locationY\":{\"description\":\"The latitude of the station\",\"type\":\"number\"},\"name\":{\"description\":\"The default name of this station\",\"type\":\"string\"},\"standardname\":{\"description\":\"The consistent name of this station\",\"type\":\"string\"}},\"required\":[\"id\",\"@id\",\"locationX\",\"locationY\",\"standardname\",\"name\"],\"type\":\"object\"},{\"items\":{\"properties\":{\"@id\":{\"description\":\"The URI identifier of the station\",\"type\":\"string\"},\"id\":{\"description\":\"The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'\",\"type\":\"string\"},\"locationX\":{\"description\":\"The longitude of the station\",\"type\":\"number\"},\"locationY\":{\"description\":\"The latitude of the station\",\"type\":\"number\"},\"name\":{\"description\":\"The default name of this station\",\"type\":\"string\"},\"standardname\":{\"description\":\"The consistent name of this station\",\"type\":\"string\"}},\"required\":[\"id\",\"@id\",\"locationX\",\"locationY\",\"standardname\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}]},\"timestamp\":{\"description\":\"Unix timestamp of the response\",\"type\":\"integer\"},\"version\":{\"description\":\"API version\",\"type\":\"string\"}},\"required\":[\"version\",\"timestamp\",\"station\"],\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with list of stations\",\"headers\":{\"Access-Control-Allow-Origin\":{\"description\":\"CORS header\",\"schema\":{\"type\":\"string\"}},\"Content-Type\":{\"description\":\"application/json or application/xml\",\"schema\":{\"type\":\"string\"}},\"cache-control\":{\"description\":\"Cache control directive\",\"schema\":{\"type\":\"string\"}},\"etag\":{\"description\":\"ETag for caching\",\"schema\":{\"type\":\"string\"}}}},\"304\":{\"description\":\"Not Modified - Content has not changed\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"securitySchemes\":{},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/stations/","segments":[{"lit":"stations"}],"select":{"exist":["format","lang"]},"transform":{"req":"`reqdata`","res":"`body.station`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"station","name__orig":"station","Name":"Station","name_":"station","name-":"station","NAME":"STATION","index$":6}, {"active":true,"entity":"station","key$":"BasicStationFlow","kind":"basic","name":"BasicStationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"station_ref01","srcdatavar":"station_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-station_ref01"}}],"index$":0}]}, 'Station')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let station_ref01_data = Object.values(setup.data.existing.station)[0] as any

    // LOAD
    const station_ref01_ent = client.Station()
    const station_ref01_match_dt0: any = {}
    const station_ref01_data_dt0 = (await station_ref01_ent.load(station_ref01_match_dt0)).data()
    assert(null != station_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/station/StationTestData.json')

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
    ['station01','station02','station03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_STATION_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_STATION_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_STATION_ENTID']
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
  
