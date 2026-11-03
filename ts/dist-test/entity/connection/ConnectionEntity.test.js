"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ConnectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IRAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IrailSDK.test();
        const ent = testsdk.Connection();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('connection hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.IrailSDK.test(offline).Connection().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.IrailSDK.test(offline).Connection()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.IrailSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Connection().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.IrailSDK.test().Connection().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.IrailSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Connection().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Connection().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.IrailSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Connection().list({ "alert": "x", "format": "x", "from": "x", "to": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IRAIL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'connection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "arrival": { "a": true, "h": "Arrival", "n": "arrival", "r": false, "t": "`$OBJECT`", "key$": "arrival", "index$": 0 }, "departure": { "a": true, "h": "Departure", "n": "departure", "r": false, "t": "`$OBJECT`", "key$": "departure", "index$": 1 }, "duration": { "a": true, "h": "Duration", "n": "duration", "r": false, "t": "`$INTEGER`", "key$": "duration", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "occupancy": { "a": true, "h": "Occupancy", "n": "occupancy", "r": false, "t": "`$OBJECT`", "key$": "occupancy", "index$": 4 }, "vias": { "a": true, "h": "Vias", "n": "vias", "r": false, "t": "`$OBJECT`", "key$": "vias", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "connection", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /connections", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "alert", "or": "alerts", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "Gent-Sint-Pieters", "k": "query", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": 6, "k": "query", "n": "result", "or": "results", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "k": "query", "n": "time", "or": "time", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "departure", "k": "query", "n": "timesel", "or": "timesel", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "Brussels-Central", "k": "query", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 8 }, { "a": true, "k": "query", "n": "type_of_transport", "or": "typeOfTransport", "r": false, "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/connections", "q": { "exist": ["format", "from", "to"] }, "r": {}, "rs": { "alternatives": [{ "kind": "raw", "media": "application/xml" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "connections" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "connection", "name__orig": "connection", "Name": "Connection", "name_": "connection", "name-": "connection", "NAME": "CONNECTION", "index$": 1 }, { "active": true, "entity": "connection", "key$": "BasicConnectionFlow", "kind": "basic", "name": "BasicConnectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "connection_ref01" } }], "index$": 0 }] }, 'Connection', { "GET /connections": { "protocol": "http", "parameters": [{ "name": "from", "in": "query", "description": "The departure station name", "required": true, "schema": { "type": "string" }, "example": "Gent-Sint-Pieters", "index$": 0 }, { "name": "to", "in": "query", "description": "The arrival station name", "required": true, "schema": { "type": "string" }, "example": "Brussels-Central", "index$": 1 }, { "name": "time", "in": "query", "description": "The time to query in hhmm format", "required": false, "schema": { "type": "string", "pattern": "^[0-2][0-9][0-5][0-9]$" }, "index$": 2 }, { "name": "date", "in": "query", "description": "The date to query in ddmmyy format", "required": false, "schema": { "type": "string", "pattern": "^[0-3][0-9][0-1][0-9][0-9]{2}$" }, "index$": 3 }, { "name": "timesel", "in": "query", "description": "Whether the time is the departure or arrival time", "required": false, "schema": { "type": "string", "enum": ["departure", "arrival"], "default": "departure" }, "index$": 4 }, { "name": "format", "in": "query", "description": "The response format", "required": true, "schema": { "type": "string", "enum": ["xml", "json", "jsonp"], "default": "xml" }, "example": "json", "index$": 5 }, { "name": "lang", "in": "query", "description": "The language of any text or names in the response", "required": false, "schema": { "type": "string", "enum": ["nl", "fr", "en", "de"], "default": "en" }, "index$": 6 }, { "name": "alerts", "in": "query", "description": "Whether to include alerts about trains in the response", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 7 }, { "name": "typeOfTransport", "in": "query", "description": "Filter by type of transport", "required": false, "schema": { "type": "string", "enum": ["automatic", "trains", "nointernationaltrains", "all"] }, "index$": 8 }, { "name": "results", "in": "query", "description": "Number of results to return", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 6, "default": 6 }, "index$": 9 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let connection_ref01_data = Object.values(setup.data.existing.connection)[0];
        // LIST
        const connection_ref01_ent = client.Connection();
        const connection_ref01_match = {};
        const connection_ref01_list = (await connection_ref01_ent.list(connection_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/connection/ConnectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IrailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['connection01', 'connection02', 'connection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IRAIL_TEST_CONNECTION_ENTID': idmap,
        'IRAIL_TEST_LIVE': 'FALSE',
        'IRAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IRAIL_TEST_CONNECTION_ENTID'];
    const live = 'TRUE' === env.IRAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IRAIL_TEST_CONNECTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IrailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IRAIL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ConnectionEntity.test.js.map