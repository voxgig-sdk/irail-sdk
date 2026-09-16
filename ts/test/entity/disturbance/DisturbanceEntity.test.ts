

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


describe('DisturbanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Disturbance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'disturbance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"link","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"timestamp","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"type","req":false,"type":"`$INTEGER`","index$":5}],"id":{"field":"id","name":"id"},"name":"disturbance","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"xml","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"line_break_character","orig":"line_break_character","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /disturbances/","json":"{\"operationId\":\"getDisturbances\",\"parameters\":[{\"description\":\"The response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\",\"jsonp\"],\"type\":\"string\"}},{\"description\":\"The language of any text or names in the response\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"nl\",\"fr\",\"en\",\"de\"],\"type\":\"string\"}},{\"description\":\"Character to use for line breaks in disturbance descriptions\",\"in\":\"query\",\"name\":\"lineBreakCharacter\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"disturbance\":{\"items\":{\"properties\":{\"description\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"link\":{\"type\":\"string\"},\"timestamp\":{\"type\":\"integer\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"timestamp\":{\"description\":\"Unix timestamp of the response\",\"type\":\"integer\"},\"version\":{\"description\":\"API version\",\"type\":\"string\"}},\"required\":[\"version\",\"timestamp\",\"disturbance\"],\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with disturbances information\",\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Content-Type\":{\"schema\":{\"type\":\"string\"}},\"cache-control\":{\"schema\":{\"type\":\"string\"}}}},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"securitySchemes\":{},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/disturbances/","segments":[{"lit":"disturbances"}],"select":{"exist":["format","lang","line_break_character"]},"transform":{"req":"`reqdata`","res":"`body.disturbance`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"disturbance","name__orig":"disturbance","Name":"Disturbance","name_":"disturbance","name-":"disturbance","NAME":"DISTURBANCE","index$":2}, {"active":true,"entity":"disturbance","key$":"BasicDisturbanceFlow","kind":"basic","name":"BasicDisturbanceFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"disturbance_ref01"}}],"index$":0}]}, 'Disturbance')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let disturbance_ref01_data = Object.values(setup.data.existing.disturbance)[0] as any

    // LIST
    const disturbance_ref01_ent = client.Disturbance()
    const disturbance_ref01_match: any = {}

    const disturbance_ref01_list = (await disturbance_ref01_ent.list(disturbance_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/disturbance/DisturbanceTestData.json')

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
    ['disturbance01','disturbance02','disturbance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_DISTURBANCE_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_DISTURBANCE_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_DISTURBANCE_ENTID']
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
  
