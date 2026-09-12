import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Liveboard, LiveboardLoadMatch } from '../IrailTypes';
declare class LiveboardEntity extends IrailEntityBase<Liveboard> {
    constructor(client: IrailSDK, entopts: any);
    make(this: LiveboardEntity): LiveboardEntity;
    load(this: any, reqmatch?: LiveboardLoadMatch, ctrl?: Control): Promise<LiveboardEntity>;
}
export { LiveboardEntity };
