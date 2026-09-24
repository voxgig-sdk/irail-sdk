

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"querytime":{"a":true,"h":"Querytime","n":"querytime","r":false,"t":"`$INTEGER`","key$":"querytime","index$":0},"querytype":{"a":true,"h":"Querytype","n":"querytype","r":false,"t":"`$STRING`","key$":"querytype","index$":1},"user_agent":{"a":true,"h":"User Agent","n":"user_agent","r":false,"t":"`$STRING`","key$":"user_agent","index$":2}},"name":"log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /logs/","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"xml","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/logs/","q":{"exist":["format"]},"r":{},"s":[{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.logs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"log","name__orig":"log","Name":"Log","name_":"log","name-":"log","NAME":"LOG","index$":4}, {"active":true,"entity":"log","key$":"BasicLogFlow","kind":"basic","name":"BasicLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"log_ref01"}}],"index$":0}]}, 'Log', {"GET /logs/":{"protocol":"http","operationId":"getLogs","responses":{"200":{"description":"Successful response with log data","content":{"application/json":{"schema":{"type":"object","properties":{"version":{"key$":"version","type":"string"},"timestamp":{"key$":"timestamp","type":"integer"},"logs":{"items":{"properties":{"querytime":{"type":"integer","key$":"querytime"},"querytype":{"type":"string","key$":"querytype"},"user_agent":{"type":"string","key$":"user_agent"}},"type":"object","index$":0},"key$":"logs","type":"array"}},"x-ref":"#/components/schemas/LogsResponse"}}}},"429":{"description":"Too Many Requests - Rate limit exceeded"}},"parameters":[{"name":"format","in":"query","description":"The response format","required":false,"schema":{"type":"string","enum":["xml","json","jsonp"],"default":"xml"},"index$":0}],"securitySource":"unspecified","securitySchemes":{}}})
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
  
