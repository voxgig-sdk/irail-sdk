import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Occupancy, OccupancyCreateData } from '../IrailTypes';
declare class OccupancyEntity extends IrailEntityBase<Occupancy> {
    constructor(client: IrailSDK, entopts: any);
    make(this: OccupancyEntity): OccupancyEntity;
    create(this: any, reqdata?: OccupancyCreateData, ctrl?: Control): Promise<OccupancyEntity>;
}
export { OccupancyEntity };
