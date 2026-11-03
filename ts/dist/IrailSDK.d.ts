import { CompositionEntity } from './entity/CompositionEntity';
import { ConnectionEntity } from './entity/ConnectionEntity';
import { DisturbanceEntity } from './entity/DisturbanceEntity';
import { LiveboardEntity } from './entity/LiveboardEntity';
import { StationEntity } from './entity/StationEntity';
import { VehicleEntity } from './entity/VehicleEntity';
export type * from './IrailTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IrailEntityBase } from './IrailEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class IrailSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Composition(entopts?: Record<string, any>): CompositionEntity;
    Connection(entopts?: Record<string, any>): ConnectionEntity;
    Disturbance(entopts?: Record<string, any>): DisturbanceEntity;
    Liveboard(entopts?: Record<string, any>): LiveboardEntity;
    Station(entopts?: Record<string, any>): StationEntity;
    Vehicle(entopts?: Record<string, any>): VehicleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IrailSDK;
    tester(testopts?: any, sdkopts?: any): IrailSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IrailSDK;
export { stdutil, config, BaseFeature, IrailEntityBase, IrailSDK, SDK, };
export type { DirectResult };
