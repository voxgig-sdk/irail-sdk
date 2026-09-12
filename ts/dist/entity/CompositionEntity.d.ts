import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Composition, CompositionLoadMatch } from '../IrailTypes';
declare class CompositionEntity extends IrailEntityBase<Composition> {
    constructor(client: IrailSDK, entopts: any);
    make(this: CompositionEntity): CompositionEntity;
    load(this: any, reqmatch?: CompositionLoadMatch, ctrl?: Control): Promise<CompositionEntity>;
}
export { CompositionEntity };
