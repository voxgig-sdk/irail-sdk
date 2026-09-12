import { IrailEntityBase } from '../IrailEntityBase';
import type { IrailSDK } from '../IrailSDK';
import type { Control } from '../types';
import type { Log, LogListMatch } from '../IrailTypes';
declare class LogEntity extends IrailEntityBase<Log> {
    constructor(client: IrailSDK, entopts: any);
    make(this: LogEntity): LogEntity;
    list(this: any, reqmatch?: LogListMatch, ctrl?: Control): Promise<LogEntity[]>;
}
export { LogEntity };
