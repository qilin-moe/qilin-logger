"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestamp = void 0;
const dateformat_1 = __importDefault(require("./dateformat"));
function getTimestamp(theme) {
    const d = new Date(Date.now());
    const yr = d.getFullYear();
    const mn = (d.getMonth() + 1);
    const da = d.getDate();
    const hr = d.getHours();
    const mi = d.getMinutes();
    const sc = d.getSeconds();
    const defnight = `${(0, dateformat_1.default)(d, "dd/mm/yyyy ☾ HH:MM:ss", false, false)}`;
    const defday = `${(0, dateformat_1.default)(d, "dd/mm/yyyy ☼ HH:MM:ss", false, false)}`;
    if (hr > 18) {
        const date = {
            "string": `${theme.date_format === "" ? defnight : (0, dateformat_1.default)(d, theme.date_format, false, false)}`,
            "year": yr,
            "month": mn,
            "day": da,
            "hour": hr,
            "minute": mi,
            "second": sc,
        };
        return date;
    }
    const date = {
        "string": `${theme.date_format === "" ? defday : (0, dateformat_1.default)(d, theme.date_format, false, false)}`,
        "year": yr,
        "month": mn,
        "day": da,
        "hour": hr,
        "minute": mi,
        "second": sc,
    };
    return date;
}
exports.getTimestamp = getTimestamp;
