

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


describe('OccupancyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('IRAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IrailSDK.test()
    const ent = testsdk.Occupancy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IRAIL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'occupancy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"occupancy","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /feedback/occupancy.php","json":"{\"operationId\":\"postOccupancy\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"connection\":{\"description\":\"The connection URI\",\"type\":\"string\"},\"date\":{\"description\":\"The date in YYYYMMDD format\",\"type\":\"string\"},\"from\":{\"description\":\"The departure station URI\",\"type\":\"string\"},\"occupancy\":{\"description\":\"The occupancy level\",\"enum\":[\"low\",\"medium\",\"high\"],\"type\":\"string\"},\"vehicle\":{\"description\":\"The vehicle ID\",\"type\":\"string\"}},\"required\":[\"connection\",\"from\",\"date\",\"vehicle\",\"occupancy\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"description\":\"Feedback successfully submitted\"},\"400\":{\"description\":\"Bad Request - Invalid parameters\"},\"429\":{\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"securitySchemes\":{},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/feedback/occupancy.php","segments":[{"lit":"feedback"},{"lit":"occupancy.php"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"occupancy","name__orig":"occupancy","Name":"Occupancy","name_":"occupancy","name-":"occupancy","NAME":"OCCUPANCY","index$":5}, {"active":true,"entity":"occupancy","key$":"BasicOccupancyFlow","kind":"basic","name":"BasicOccupancyFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"occupancy_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Occupancy')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const occupancy_ref01_ent = client.Occupancy()
    let occupancy_ref01_data = setup.data.new.occupancy['occupancy_ref01']

    occupancy_ref01_data = (await occupancy_ref01_ent.create(occupancy_ref01_data)).data()
    assert(null != occupancy_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/occupancy/OccupancyTestData.json')

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
    ['occupancy01','occupancy02','occupancy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IRAIL_TEST_OCCUPANCY_ENTID': idmap,
    'IRAIL_TEST_LIVE': 'FALSE',
    'IRAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IRAIL_TEST_OCCUPANCY_ENTID']

  const live = 'TRUE' === env.IRAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IRAIL_TEST_OCCUPANCY_ENTID']
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
  
