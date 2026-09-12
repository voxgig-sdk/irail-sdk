import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Vehicle, VehicleLoadMatch } from '../IrailTypes';
declare class VehicleEntity extends IrailEntityBase<Vehicle> {
    constructor(client: IrailSDK, entopts: any);
    make(this: VehicleEntity): VehicleEntity;
    load(this: any, reqmatch?: VehicleLoadMatch, ctrl?: Control): Promise<VehicleEntity>;
}
export { VehicleEntity };
