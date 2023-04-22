"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const PageStateContext_1 = require("./PageStateContext");
const PageStateURI_1 = require("./PageStateURI");
const navigation_1 = require("next/navigation");
const nookies_1 = require("nookies");
function setCookieForState(key, value) {
    (0, nookies_1.setCookie)(null, key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    });
}
function PageStateProvider({ children, current, }) {
    const [pageState, _setPageState] = (0, react_2.useState)(current);
    const router = (0, navigation_1.useRouter)();
    function setPageState(nextPageState, path) {
        let newPageState = Object.assign(Object.assign({}, pageState), nextPageState);
        _setPageState(newPageState);
        const pageStateString = (0, PageStateURI_1.getQueryStringByPageState)(path, newPageState);
        setCookieForState(path, `${pageStateString}`);
        router.push(`${location.origin}${path}`);
    }
    return (react_1.default.createElement(PageStateContext_1.PageStateContext.Provider, { value: [pageState, setPageState] }, children));
}
exports.default = PageStateProvider;
