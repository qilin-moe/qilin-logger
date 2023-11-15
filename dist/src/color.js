"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorizeArgs = exports.colorize = exports.avgHex = void 0;
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        return { r: 255, g: 255, b: 255 };
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function avgHex(h1, h2) {
    let a = hexToRgb(h1);
    let b = hexToRgb(h2);
    return rgbToHex(~~((a.r + b.r) / 2), ~~((a.g + b.g) / 2), ~~((a.b + b.b) / 2));
}
exports.avgHex = avgHex;
function colorize(text, color, bold) {
    if (typeof color === "string") {
        color = hexToRgb(color);
    }
    if (bold) {
        return `\x1b[1m\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`;
    }
    else {
        return `\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`;
    }
}
exports.colorize = colorize;
function colorizeArgs(color, bold, ...text) {
    if (typeof color === "string") {
        color = hexToRgb(color);
    }
    if (bold) {
        return `\x1b[1m\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`;
    }
    else {
        return `\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`;
    }
}
exports.colorizeArgs = colorizeArgs;
