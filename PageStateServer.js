"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageState = exports.getPageLocation = exports.currentPageState = void 0;
const headers_1 = require("next/headers");
function currentPageState(initialPageState, path, clearAuto) {
    var _a, _b;
    const headersList = (0, headers_1.headers)();
    if (clearAuto !== false) {
        if (!((_a = headersList.get('referer')) === null || _a === void 0 ? void 0 : _a.includes(path))) {
            return initialPageState;
        }
    }
    const cookieStore = (0, headers_1.cookies)();
    const value = (_b = cookieStore.get(path)) === null || _b === void 0 ? void 0 : _b.value;
    if (!value) {
        return initialPageState;
    }
    const jsonString = decodeURIComponent(value !== null && value !== void 0 ? value : '');
    const json = JSON.parse(jsonString);
    return json;
}
exports.currentPageState = currentPageState;
function getPageLocation(path) {
    var _a;
    const cookieStore = (0, headers_1.cookies)();
    const value = (_a = cookieStore.get(path)) === null || _a === void 0 ? void 0 : _a.value;
    const jsonString = decodeURIComponent(value !== null && value !== void 0 ? value : '');
    const json = JSON.parse(jsonString);
    const params = new URLSearchParams(json);
    return params.toString();
}
exports.getPageLocation = getPageLocation;
function getPageState(initialPageState, path, clearAuto) {
    return currentPageState(initialPageState, path, clearAuto);
}
exports.getPageState = getPageState;
