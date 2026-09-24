"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrailError = void 0;
class IrailError extends Error {
    isIrailError = true;
    sdk = 'Irail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IrailError = IrailError;
//# sourceMappingURL=IrailError.js.map