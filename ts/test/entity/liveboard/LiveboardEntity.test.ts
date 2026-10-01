

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


describe('LiveboardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Liveboard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'liveboard.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"departures":{"a":true,"h":"Departures","n":"departures","r":true,"t":"`$OBJECT`","key$":"departures","index$":0},"station":{"a":true,"h":"Station","n":"station","r":true,"sh":"Station name","t":"`$STRING`","key$":"station","index$":1},"stationinfo":{"a":true,"h":"Stationinfo","n":"stationinfo","r":true,"t":"`$OBJECT`","key$":"stationinfo","index$":2},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":true,"sh":"Unix timestamp of the response","t":"`$INTEGER`","key$":"timestamp","index$":3},"version":{"a":true,"h":"Version","n":"version","r":true,"sh":"API version","t":"`$STRING`","key$":"version","index$":4}},"name":"liveboard","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /liveboard/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"alert","or":"alerts","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"departure","k":"query","n":"arrdep","or":"arrdep","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"300917","k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"BE.NMBS.008892007","k":"query","n":"id","or":"id","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"Gent-Sint-Pieters","k":"query","n":"station","or":"station","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"1230","k":"query","n":"time","or":"time","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/liveboard/","q":{"exist":["alert","arrdep","date","format","id","lang","station","time"]},"r":{},"s":[{"lit":"liveboard"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"liveboard","name__orig":"liveboard","Name":"Liveboard","name_":"liveboard","name-":"liveboard","NAME":"LIVEBOARD","index$":3}, {"active":true,"entity":"liveboard","key$":"BasicLiveboardFlow","kind":"basic","name":"BasicLiveboardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"liveboard_ref01","srcdatavar":"liveboard_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-liveboard_ref01"}}],"index$":0}]}, 'Liveboard', {"GET /liveboard/":{"protocol":"http","parameters":[{"name":"station","in":"query","description":"The name of the station to query","required":false,"schema":{"type":"string"},"example":"Gent-Sint-Pieters","index$":0},{"name":"id","in":"query","description":"The ID of the station. Do not use both id and station parameters","required":false,"schema":{"type":"string"},"example":"BE.NMBS.008892007","index$":1},{"name":"arrdep","in":"query","description":"Whether the results should show arrivals or departures","required":false,"schema":{"type":"string","enum":["departure","arrival"],"default":"departure"},"index$":2},{"name":"alerts","in":"query","description":"Whether to include alerts about trains in the response","required":false,"schema":{"type":"boolean","default":false},"index$":3},{"name":"time","in":"query","description":"The time to query in hhmm format","required":false,"schema":{"type":"string","pattern":"^[0-2][0-9][0-5][0-9]$"},"example":"1230","index$":4},{"name":"date","in":"query","description":"The date to query in ddmmyy format","required":false,"schema":{"type":"string","pattern":"^[0-3][0-9][0-1][0-9][0-9]{2}$"},"example":"300917","index$":5},{"name":"format","in":"query","description":"The response format","required":false,"schema":{"type":"string","enum":["xml","json","jsonp"],"default":"xml"},"index$":6},{"name":"lang","in":"query","description":"The language of any text or names in the response","required":false,"schema":{"type":"string","enum":["nl","fr","en","de"],"default":"en"},"index$":7}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let liveboard_ref01_data = Object.values(setup.data.existing.liveboard)[0] as any

    // LOAD
    const liveboard_ref01_ent = client.Liveboard()
    const liveboard_ref01_match_dt0: any = {}
    const liveboard_ref01_data_dt0 = (await liveboard_ref01_ent.load(liveboard_ref01_match_dt0)).data()
    assert(null != liveboard_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/liveboard/LiveboardTestData.json')

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
    ['liveboard01','liveboard02','liveboard03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_LIVEBOARD_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_LIVEBOARD_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_LIVEBOARD_ENTID']
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
  
