"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryStringByPageState = void 0;
function getQueryStringByPageState(key, pageState) {
    const queryString = `${key}=${encodeURIComponent(JSON.stringify(pageState))}`;
    return queryString;
}
exports.getQueryStringByPageState = getQueryStringByPageState;
