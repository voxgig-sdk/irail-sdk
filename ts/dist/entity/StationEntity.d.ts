import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Station, StationLoadMatch } from '../IrailTypes';
declare class StationEntity extends IrailEntityBase<Station> {
    constructor(client: IrailSDK, entopts: any);
    make(this: StationEntity): StationEntity;
    load(this: any, reqmatch?: StationLoadMatch, ctrl?: Control): Promise<StationEntity>;
}
export { StationEntity };
