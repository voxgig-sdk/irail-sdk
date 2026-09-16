

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


describe('LogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Log()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"querytime","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"querytype","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"user_agent","req":false,"type":"`$STRING`","index$":2}],"name":"log","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"xml","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /logs/","json":"{\"operationId\":\"getLogs\",\"parameters\":[{\"description\":\"The response format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"xml\",\"enum\":[\"xml\",\"json\",\"jsonp\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"logs\":{\"items\":{\"properties\":{\"querytime\":{\"type\":\"integer\"},\"querytype\":{\"type\":\"string\"},\"user_agent\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"timestamp\":{\"type\":\"integer\"},\"version\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with log data\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"securitySchemes\":{},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/logs/","segments":[{"lit":"logs"}],"select":{"exist":["format"]},"transform":{"req":"`reqdata`","res":"`body.logs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"log","name__orig":"log","Name":"Log","name_":"log","name-":"log","NAME":"LOG","index$":4}, {"active":true,"entity":"log","key$":"BasicLogFlow","kind":"basic","name":"BasicLogFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"log_ref01"}}],"index$":0}]}, 'Log')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let log_ref01_data = Object.values(setup.data.existing.log)[0] as any

    // LIST
    const log_ref01_ent = client.Log()
    const log_ref01_match: any = {}

    const log_ref01_list = (await log_ref01_ent.list(log_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/log/LogTestData.json')

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
    ['log01','log02','log03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_LOG_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_LOG_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_LOG_ENTID']
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
  
