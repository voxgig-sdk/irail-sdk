

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


describe('CompositionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Composition()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'composition.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"segments":{"a":true,"h":"Segments","n":"segments","r":false,"t":"`$OBJECT`","key$":"segments","index$":0}},"name":"composition","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /composition/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/composition/","q":{"exist":["date","format","id","lang"]},"r":{},"s":[{"lit":"composition"}],"t":{"req":"`reqdata`","res":"`body.composition`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"composition","name__orig":"composition","Name":"Composition","name_":"composition","name-":"composition","NAME":"COMPOSITION","index$":0}, {"active":true,"entity":"composition","key$":"BasicCompositionFlow","kind":"basic","name":"BasicCompositionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"composition_ref01","srcdatavar":"composition_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-composition_ref01"}}],"index$":0}]}, 'Composition', {"GET /composition/":{"protocol":"http","operationId":"getComposition","responses":{"200":{"description":"Successful response with composition information","headers":{"Content-Type":{"schema":{"type":"string"}},"Access-Control-Allow-Origin":{"schema":{"type":"string"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"version":{"description":"API version","key$":"version","type":"string"},"timestamp":{"description":"Unix timestamp of the response","key$":"timestamp","type":"integer"},"vehicle":{"description":"Vehicle identifier","key$":"vehicle","type":"string"},"composition":{"key$":"composition","properties":{"segments":{"properties":{"number":{"type":"integer"},"segment":{"items":{"type":"object"},"type":"array"}},"type":"object","key$":"segments"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/CompositionResponse"}},"application/xml":{"schema":{"type":"string"}}}},"429":{"description":"Too Many Requests - Rate limit exceeded"}},"parameters":[{"name":"id","in":"query","description":"The vehicle ID","required":true,"schema":{"type":"string"},"index$":0},{"name":"date","in":"query","description":"The date to query in ddmmyy format","required":false,"schema":{"type":"string","pattern":"^[0-3][0-9][0-1][0-9][0-9]{2}$"},"index$":1},{"name":"format","in":"query","description":"The response format","required":false,"schema":{"type":"string","enum":["xml","json","jsonp"],"default":"xml"},"index$":2},{"name":"lang","in":"query","description":"The language of any text or names in the response","required":false,"schema":{"type":"string","enum":["nl","fr","en","de"],"default":"en"},"index$":3}],"securitySource":"unspecified","securitySchemes":{}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let composition_ref01_data = Object.values(setup.data.existing.composition)[0] as any

    // LOAD
    const composition_ref01_ent = client.Composition()
    const composition_ref01_match_dt0: any = {}
    const composition_ref01_data_dt0 = (await composition_ref01_ent.load(composition_ref01_match_dt0)).data()
    assert(null != composition_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/composition/CompositionTestData.json')

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
    ['composition01','composition02','composition03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_COMPOSITION_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_COMPOSITION_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_COMPOSITION_ENTID']
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
  
