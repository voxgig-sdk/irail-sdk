import { Context } from './Context';
declare class IrailError extends Error {
    isIrailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IrailError };
