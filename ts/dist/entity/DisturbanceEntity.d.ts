import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Disturbance, DisturbanceListMatch } from '../IrailTypes';
declare class DisturbanceEntity extends IrailEntityBase<Disturbance> {
    constructor(client: IrailSDK, entopts: any);
    make(this: DisturbanceEntity): DisturbanceEntity;
    list(this: any, reqmatch?: DisturbanceListMatch, ctrl?: Control): Promise<DisturbanceEntity[]>;
}
export { DisturbanceEntity };
