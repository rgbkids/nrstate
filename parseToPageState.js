"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToPageState = void 0;
const headers_1 = require("next/headers");
function parseToPageState(initialPageState, path) {
    var _a;
    let key = path;
    // TODO: pathがなければ自動で自分自身
    const cookieStore = (0, headers_1.cookies)();
    let value = (_a = cookieStore.get(key)) === null || _a === void 0 ? void 0 : _a.value;
    value = value === null || value === void 0 ? void 0 : value.replace(`${key}=`, ""); // TODO:
    if (!value) {
        return initialPageState;
    }
    let jsonString = decodeURIComponent(value !== null && value !== void 0 ? value : '');
    const json = JSON.parse(jsonString);
    return json;
}
exports.parseToPageState = parseToPageState;
