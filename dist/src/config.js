"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCfg = void 0;
exports.DefaultCfg = {
    color: true,
    show_path: true,
    write_logs: false,
    theme: {
        timestamp: "ffffff",
        text: "",
        debugtext: "",
        date_format: "",
        log_level: {
            fatal: "ff0000",
            error: "ff3300",
            warn: "f5c211",
            info: "6ef482",
            debug: "cc66ff",
            packet: "0033cc"
        },
        path: ["#FFFFFF"]
    },
    log_files: {
        save_path: "./logs",
        save_interval: 60000
    }
};
