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
(0, node_test_1.describe)('DisturbanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IRAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IrailSDK.test();
        const ent = testsdk.Disturbance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IRAIL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'disturbance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "link": { "a": true, "h": "Link", "n": "link", "r": false, "t": "`$STRING`", "key$": "link", "index$": 2 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "t": "`$INTEGER`", "key$": "timestamp", "index$": 3 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 4 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$INTEGER`", "key$": "type", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "disturbance", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /disturbances/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "xml", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "line_break_character", "or": "line_break_character", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/disturbances/", "q": { "exist": ["format", "lang", "line_break_character"] }, "r": {}, "s": [{ "lit": "disturbances" }], "t": { "req": "`reqdata`", "res": "`body.disturbance`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "disturbance", "name__orig": "disturbance", "Name": "Disturbance", "name_": "disturbance", "name-": "disturbance", "NAME": "DISTURBANCE", "index$": 2 }, { "active": true, "entity": "disturbance", "key$": "BasicDisturbanceFlow", "kind": "basic", "name": "BasicDisturbanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "disturbance_ref01" } }], "index$": 0 }] }, 'Disturbance', { "GET /disturbances/": { "protocol": "http", "operationId": "getDisturbances", "responses": { "200": { "description": "Successful response with disturbances information", "headers": { "Content-Type": { "schema": { "type": "string" } }, "Access-Control-Allow-Origin": { "schema": { "type": "string" } }, "cache-control": { "schema": { "type": "string" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "version": { "description": "API version", "key$": "version", "type": "string" }, "timestamp": { "description": "Unix timestamp of the response", "key$": "timestamp", "type": "integer" }, "disturbance": { "items": { "properties": { "description": { "type": "string", "key$": "description" }, "id": { "type": "integer", "key$": "id" }, "link": { "type": "string", "key$": "link" }, "timestamp": { "type": "integer", "key$": "timestamp" }, "title": { "type": "string", "key$": "title" }, "type": { "type": "integer", "key$": "type" } }, "type": "object", "index$": 0 }, "key$": "disturbance", "type": "array" } }, "required": ["version", "timestamp", "disturbance"], "x-ref": "#/components/schemas/DisturbancesResponse" } }, "application/xml": { "schema": { "type": "string" } } } }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "format", "in": "query", "description": "The response format", "required": false, "schema": { "type": "string", "enum": ["xml", "json", "jsonp"], "default": "xml" }, "index$": 0 }, { "name": "lang", "in": "query", "description": "The language of any text or names in the response", "required": false, "schema": { "type": "string", "enum": ["nl", "fr", "en", "de"], "default": "en" }, "index$": 1 }, { "name": "lineBreakCharacter", "in": "query", "description": "Character to use for line breaks in disturbance descriptions", "required": false, "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let disturbance_ref01_data = Object.values(setup.data.existing.disturbance)[0];
        // LIST
        const disturbance_ref01_ent = client.Disturbance();
        const disturbance_ref01_match = {};
        const disturbance_ref01_list = (await disturbance_ref01_ent.list(disturbance_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/disturbance/DisturbanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IrailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['disturbance01', 'disturbance02', 'disturbance03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IRAIL_TEST_DISTURBANCE_ENTID': idmap,
        'IRAIL_TEST_LIVE': 'FALSE',
        'IRAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IRAIL_TEST_DISTURBANCE_ENTID'];
    const live = 'TRUE' === env.IRAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IRAIL_TEST_DISTURBANCE_ENTID'];
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
//# sourceMappingURL=DisturbanceEntity.test.js.map