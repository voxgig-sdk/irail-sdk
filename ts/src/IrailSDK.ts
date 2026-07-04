// Irail Ts SDK

import { CompositionEntity } from './entity/CompositionEntity'
import { ConnectionEntity } from './entity/ConnectionEntity'
import { DisturbanceEntity } from './entity/DisturbanceEntity'
import { LiveboardEntity } from './entity/LiveboardEntity'
import { LogEntity } from './entity/LogEntity'
import { OccupancyEntity } from './entity/OccupancyEntity'
import { StationEntity } from './entity/StationEntity'
import { VehicleEntity } from './entity/VehicleEntity'

export type * from './IrailTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { IrailEntityBase } from './IrailEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class IrailSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _composition?: CompositionEntity

  // Idiomatic facade: `client.composition.list()` / `client.composition.load({ id })`.
  get composition(): CompositionEntity {
    return (this._composition ??= new CompositionEntity(this, undefined))
  }

  /** @deprecated Use `client.composition` instead. */
  Composition(data?: any) {
    const self = this
    return new CompositionEntity(self,data)
  }


  _connection?: ConnectionEntity

  // Idiomatic facade: `client.connection.list()` / `client.connection.load({ id })`.
  get connection(): ConnectionEntity {
    return (this._connection ??= new ConnectionEntity(this, undefined))
  }

  /** @deprecated Use `client.connection` instead. */
  Connection(data?: any) {
    const self = this
    return new ConnectionEntity(self,data)
  }


  _disturbance?: DisturbanceEntity

  // Idiomatic facade: `client.disturbance.list()` / `client.disturbance.load({ id })`.
  get disturbance(): DisturbanceEntity {
    return (this._disturbance ??= new DisturbanceEntity(this, undefined))
  }

  /** @deprecated Use `client.disturbance` instead. */
  Disturbance(data?: any) {
    const self = this
    return new DisturbanceEntity(self,data)
  }


  _liveboard?: LiveboardEntity

  // Idiomatic facade: `client.liveboard.list()` / `client.liveboard.load({ id })`.
  get liveboard(): LiveboardEntity {
    return (this._liveboard ??= new LiveboardEntity(this, undefined))
  }

  /** @deprecated Use `client.liveboard` instead. */
  Liveboard(data?: any) {
    const self = this
    return new LiveboardEntity(self,data)
  }


  _log?: LogEntity

  // Idiomatic facade: `client.log.list()` / `client.log.load({ id })`.
  get log(): LogEntity {
    return (this._log ??= new LogEntity(this, undefined))
  }

  /** @deprecated Use `client.log` instead. */
  Log(data?: any) {
    const self = this
    return new LogEntity(self,data)
  }


  _occupancy?: OccupancyEntity

  // Idiomatic facade: `client.occupancy.list()` / `client.occupancy.load({ id })`.
  get occupancy(): OccupancyEntity {
    return (this._occupancy ??= new OccupancyEntity(this, undefined))
  }

  /** @deprecated Use `client.occupancy` instead. */
  Occupancy(data?: any) {
    const self = this
    return new OccupancyEntity(self,data)
  }


  _station?: StationEntity

  // Idiomatic facade: `client.station.list()` / `client.station.load({ id })`.
  get station(): StationEntity {
    return (this._station ??= new StationEntity(this, undefined))
  }

  /** @deprecated Use `client.station` instead. */
  Station(data?: any) {
    const self = this
    return new StationEntity(self,data)
  }


  _vehicle?: VehicleEntity

  // Idiomatic facade: `client.vehicle.list()` / `client.vehicle.load({ id })`.
  get vehicle(): VehicleEntity {
    return (this._vehicle ??= new VehicleEntity(this, undefined))
  }

  /** @deprecated Use `client.vehicle` instead. */
  Vehicle(data?: any) {
    const self = this
    return new VehicleEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new IrailSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return IrailSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Irail' }
  }

  toString() {
    return 'Irail ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = IrailSDK


export {
  stdutil,

  BaseFeature,
  IrailEntityBase,

  IrailSDK,
  SDK,
}


