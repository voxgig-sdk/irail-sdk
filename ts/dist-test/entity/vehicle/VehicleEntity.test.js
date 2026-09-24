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
(0, node_test_1.describe)('VehicleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IRAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IRAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IrailSDK.test();
        const ent = testsdk.Vehicle();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IRAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "stops": { "a": true, "h": "Stops", "n": "stops", "r": true, "t": "`$OBJECT`", "key$": "stops", "index$": 0 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": true, "sh": "Unix timestamp of the response", "t": "`$INTEGER`", "key$": "timestamp", "index$": 1 }, "vehicle": { "a": true, "h": "Vehicle", "n": "vehicle", "r": true, "sh": "Vehicle identifier", "t": "`$STRING`", "key$": "vehicle", "index$": 2 }, "vehicleinfo": { "a": true, "h": "Vehicleinfo", "n": "vehicleinfo", "r": false, "t": "`$OBJECT`", "key$": "vehicleinfo", "index$": 3 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "API version", "t": "`$STRING`", "key$": "version", "index$": 4 } }, "name": "vehicle", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /vehicle/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "alert", "or": "alert", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "xml", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "IC532", "k": "query", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/vehicle/", "q": { "exist": ["alert", "date", "format", "id", "lang"] }, "r": {}, "s": [{ "lit": "vehicle" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "vehicle", "name__orig": "vehicle", "Name": "Vehicle", "name_": "vehicle", "name-": "vehicle", "NAME": "VEHICLE", "index$": 7 }, { "active": true, "entity": "vehicle", "key$": "BasicVehicleFlow", "kind": "basic", "name": "BasicVehicleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "vehicle_ref01", "srcdatavar": "vehicle_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vehicle_ref01" } }], "index$": 0 }] }, 'Vehicle', { "GET /vehicle/": { "protocol": "http", "operationId": "getVehicle", "responses": { "200": { "description": "Successful response with vehicle information", "headers": { "Content-Type": { "schema": { "type": "string" } }, "Access-Control-Allow-Origin": { "schema": { "type": "string" } }, "cache-control": { "schema": { "type": "string" } }, "etag": { "schema": { "type": "string" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "version": { "description": "API version", "key$": "version", "type": "string" }, "timestamp": { "description": "Unix timestamp of the response", "key$": "timestamp", "type": "integer" }, "vehicle": { "description": "Vehicle identifier", "key$": "vehicle", "type": "string" }, "vehicleinfo": { "key$": "vehicleinfo", "properties": { "@id": { "description": "Vehicle URI", "type": "string" }, "name": { "description": "Full vehicle name", "type": "string" }, "shortname": { "description": "Short vehicle name", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/VehicleInfo" }, "stops": { "key$": "stops", "properties": { "number": { "type": "integer" }, "stop": { "items": { "properties": { "canceled": { "type": "integer" }, "delay": { "type": "integer" }, "id": { "type": "integer" }, "left": { "type": "integer" }, "occupancy": { "properties": { "@id": { "description": "Occupancy level URI", "type": "string" }, "name": { "description": "Occupancy level name", "enum": ["low", "medium", "high", "unknown"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Occupancy" }, "platform": { "type": "string" }, "platforminfo": { "properties": { "name": { "description": "Platform number", "type": "string" }, "normal": { "description": "Whether this is the normal platform (1 or 0)", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PlatformInfo" }, "station": { "type": "string" }, "stationinfo": { "properties": { "@id": { "description": "The URI identifier of the station", "type": "string" }, "id": { "description": "The (iRail) id of the station. The NMBS id can be deducted by removing the leading 'BE.NMBS.00'", "type": "string" }, "locationX": { "description": "The longitude of the station", "type": "number" }, "locationY": { "description": "The latitude of the station", "type": "number" }, "name": { "description": "The default name of this station", "type": "string" }, "standardname": { "description": "The consistent name of this station", "type": "string" } }, "required": ["id", "@id", "locationX", "locationY", "standardname", "name"], "type": "object", "x-ref": "#/components/schemas/Station" }, "time": { "type": "integer" } }, "type": "object" }, "type": "array" } }, "type": "object" } }, "required": ["version", "timestamp", "vehicle", "stops"], "x-ref": "#/components/schemas/VehicleResponse", "index$": 0 } }, "application/xml": { "schema": { "type": "string" } } } }, "304": { "description": "Not Modified - Content has not changed" }, "429": { "description": "Too Many Requests - Rate limit exceeded" } }, "parameters": [{ "name": "id", "in": "query", "description": "The vehicle ID (e.g., BE.NMBS.IC532 or IC532)", "required": true, "schema": { "type": "string" }, "example": "IC532", "index$": 0 }, { "name": "date", "in": "query", "description": "The date to query in ddmmyy format", "required": false, "schema": { "type": "string", "pattern": "^[0-3][0-9][0-1][0-9][0-9]{2}$" }, "index$": 1 }, { "name": "format", "in": "query", "description": "The response format", "required": false, "schema": { "type": "string", "enum": ["xml", "json", "jsonp"], "default": "xml" }, "index$": 2 }, { "name": "lang", "in": "query", "description": "The language of any text or names in the response", "required": false, "schema": { "type": "string", "enum": ["nl", "fr", "en", "de"], "default": "en" }, "index$": 3 }, { "name": "alerts", "in": "query", "description": "Whether to include alerts about the train", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 4 }], "securitySource": "unspecified", "securitySchemes": {} } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_ref01_data = Object.values(setup.data.existing.vehicle)[0];
        // LOAD
        const vehicle_ref01_ent = client.Vehicle();
        const vehicle_ref01_match_dt0 = {};
        const vehicle_ref01_data_dt0 = (await vehicle_ref01_ent.load(vehicle_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != vehicle_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle/VehicleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IrailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle01', 'vehicle02', 'vehicle03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IRAIL_TEST_VEHICLE_ENTID': idmap,
        'IRAIL_TEST_LIVE': 'FALSE',
        'IRAIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IRAIL_TEST_VEHICLE_ENTID'];
    const live = 'TRUE' === env.IRAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IRAIL_TEST_VEHICLE_ENTID'];
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
//# sourceMappingURL=VehicleEntity.test.js.map