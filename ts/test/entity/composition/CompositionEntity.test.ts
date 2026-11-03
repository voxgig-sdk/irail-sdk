

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IrailSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IrailSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Composition().load({"date":1,"format":"x","id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'composition.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"composition":{"a":true,"h":"Composition","n":"composition","r":false,"t":"`$OBJECT`","key$":"composition","index$":0},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"sh":"Unix timestamp of the response","t":"`$INTEGER`","key$":"timestamp","index$":1},"vehicle":{"a":true,"h":"Vehicle","n":"vehicle","r":false,"sh":"Vehicle identifier","t":"`$STRING`","key$":"vehicle","index$":2},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"API version","t":"`$STRING`","key$":"version","index$":3}},"name":"composition","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /composition","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"IC532","k":"query","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/composition","q":{"exist":["format","id"]},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"composition"}],"t":{"req":"`reqdata`","res":"`body.composition`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"composition","name__orig":"composition","Name":"Composition","name_":"composition","name-":"composition","NAME":"COMPOSITION","index$":0}, {"active":true,"entity":"composition","key$":"BasicCompositionFlow","kind":"basic","name":"BasicCompositionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"composition_ref01","srcdatavar":"composition_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-composition_ref01"}}],"index$":0}]}, 'Composition', {"GET /composition":{"protocol":"http","parameters":[{"name":"id","in":"query","description":"The vehicle ID","required":true,"schema":{"type":"string"},"example":"IC532","index$":0},{"name":"date","in":"query","description":"The date to query in ddmmyy format","required":false,"schema":{"type":"string","pattern":"^[0-3][0-9][0-1][0-9][0-9]{2}$"},"index$":1},{"name":"format","in":"query","description":"The response format","required":true,"schema":{"type":"string","enum":["xml","json","jsonp"],"default":"xml"},"example":"json","index$":2},{"name":"lang","in":"query","description":"The language of any text or names in the response","required":false,"schema":{"type":"string","enum":["nl","fr","en","de"],"default":"en"},"index$":3}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
