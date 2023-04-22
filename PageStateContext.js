"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageStateContext = exports.PageStateContext = void 0;
const react_1 = require("react");
exports.PageStateContext = (0, react_1.createContext)(undefined);
function usePageStateContext() {
    return (0, react_1.useContext)(exports.PageStateContext);
}
exports.usePageStateContext = usePageStateContext;
