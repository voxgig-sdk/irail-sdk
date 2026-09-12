import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Connection, ConnectionListMatch } from '../IrailTypes';
declare class ConnectionEntity extends IrailEntityBase<Connection> {
    constructor(client: IrailSDK, entopts: any);
    make(this: ConnectionEntity): ConnectionEntity;
    list(this: any, reqmatch?: ConnectionListMatch, ctrl?: Control): Promise<ConnectionEntity[]>;
}
export { ConnectionEntity };
