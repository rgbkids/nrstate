"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experimental_setPageState = exports.parseQueryStringByPageState = exports.getPageState = exports.getPageLocation = exports.currentPageState = void 0;
const cache_1 = require("next/cache");
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
    try {
        const cookieStore = (0, headers_1.cookies)();
        const value = (_a = cookieStore.get(path)) === null || _a === void 0 ? void 0 : _a.value;
        const jsonString = decodeURIComponent(value !== null && value !== void 0 ? value : '');
        const json = JSON.parse(jsonString);
        const params = new URLSearchParams(json);
        return params.toString();
    }
    catch (error) {
        return '';
    }
}
exports.getPageLocation = getPageLocation;
function getPageState(initialPageState, path, clearAuto) {
    return currentPageState(initialPageState, path, clearAuto);
}
exports.getPageState = getPageState;
function parseQueryStringByPageState(pageState) {
    const queryString = `${encodeURIComponent(JSON.stringify(pageState))}`;
    return queryString;
}
exports.parseQueryStringByPageState = parseQueryStringByPageState;
function setCookieForPageState(key, value) {
    /* @ts-ignore */
    (0, headers_1.cookies)().set({
        name: key,
        value: value,
        httpOnly: true,
        path: '/',
    });
}
function experimental_setPageState(nextPageState, path, revalidate) {
    const newPageState = Object.assign({}, nextPageState);
    const pageStateString = parseQueryStringByPageState(newPageState);
    setCookieForPageState(path, `${pageStateString}`);
    if (revalidate) {
        revalidate();
    }
    else {
        (0, cache_1.revalidateTag)(pageStateString);
    }
}
exports.experimental_setPageState = experimental_setPageState;
