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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
const time_1 = require("./time");
const color_1 = require("./color");
const config_1 = require("./config");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const dateformat_1 = __importDefault(require("./dateformat"));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
    LogLevel[LogLevel["FATAL"] = 1] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 5] = "DEBUG";
    LogLevel[LogLevel["PACKET"] = 6] = "PACKET";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    name;
    path;
    raw_path;
    color;
    theme;
    logLevel;
    show_path;
    pending;
    config;
    constructor(namestr, config = config_1.DefaultCfg) {
        let name = namestr.split(".");
        let pathsize = name.length;
        this.name = name[name.length];
        this.color = config.theme.path;
        this.show_path = config.show_path;
        this.path = "";
        this.raw_path = "";
        this.pending = "";
        this.config = config;
        for (let i = 0; i < name.length; i++) {
            if (i < name.length - 1) {
                this.path += `${(0, color_1.colorize)(name[i], this.color[i], false)}${(0, color_1.colorize)(".", (0, color_1.avgHex)(this.color[i], this.color[(i + 1) ?? this.color.length]), false)}`;
                this.raw_path += `${name[i]}.`;
            }
        }
        this.path += `${(0, color_1.colorize)(name[pathsize - 1], this.color[pathsize - 1], false)}`;
        this.raw_path += `${name[pathsize - 1]}`;
        this.theme = config.theme;
        if (config.write_logs) {
            if (!fs.existsSync(config.log_files.save_path)) {
                fs.mkdirSync(config.log_files.save_path, { recursive: true });
            }
        }
    }
    log(level, ...args) {
        if (level > this.logLevel)
            return;
        let prefix = (0, time_1.getTimestamp)(this.theme);
        let message = ""; // ⌞timestamp⌝  # @ utils.logger: message
        switch (level) {
            case LogLevel.FATAL:
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("FATAL", this.theme.log_level.fatal, true)}`;
                this.pending += `⌞${prefix.string}⌝ FATAL`;
                break;
            case LogLevel.ERROR:
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("ERROR", this.theme.log_level.error, true)}`;
                this.pending += `⌞${prefix.string}⌝ ERROR`;
                break;
            case LogLevel.WARN:
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("WARN", this.theme.log_level.warn, false)}`;
                this.pending += `⌞${prefix.string}⌝ WARN`;
                break;
            case LogLevel.INFO:
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("INFO", this.theme.log_level.info, false)}`;
                this.pending += `⌞${prefix.string}⌝ INFO`;
                break;
            case LogLevel.DEBUG:
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("DEBUG", this.theme.log_level.debug, false)}`;
                message += ` @ ${this.path}:`;
                this.pending += `⌞${prefix.string}⌝ DEBUG @ ${this.raw_path}: ${args} \n`;
                if (this.config.write_logs) {
                    // force save any lines that will not be caught by save interval
                    this.saveLogs(this.config);
                }
                this.pending = "";
                if (this.theme.debugtext !== "") {
                    console.log(message, (0, color_1.colorizeArgs)(this.theme.debugtext, false, ...args));
                }
                else {
                    console.log(message, ...args);
                }
                return;
            case LogLevel.PACKET: // For packet logging: args = [(rcv/snt), id, content]
                message = `⌞${(0, color_1.colorize)(prefix.string, this.theme.timestamp, false)}⌝ ${(0, color_1.colorize)("PACKET", this.theme.log_level.packet, false)}⌞${args[0]}, ${args[1]}⌝ \n`;
                this.pending += `⌞${prefix.string}⌝ PACKET ⌞${args[0]}, ${args[1]}⌝ \n ${args[2]} \n`;
                console.log(message, args[2]); // ⌞timestamp⌝  PACKET [rcv/snt, 1]: \n content
                if (this.config.write_logs) {
                    // force save any lines that will not be caught by save interval
                    this.saveLogs(this.config);
                }
                this.pending = "";
                return;
        }
        if (this.show_path) {
            message += ` @ ${this.path}:`;
            this.pending += ` @ ${this.raw_path}:`;
        }
        else {
            message += ` |`;
            this.pending += ` |`;
        }
        if (this.theme.text !== "") {
            console.log(message, (0, color_1.colorizeArgs)(this.theme.text, false, ...args));
        }
        else {
            console.log(message, ...args);
        }
        this.pending += ` ${args} \n`;
        if (this.config.write_logs) {
            // force save any lines that will not be caught by save interval
            this.saveLogs(this.config);
        }
        this.pending = "";
        return;
    }
    initLogSave(config) {
        if (config.write_logs) {
            if (!fs.existsSync(config.log_files.save_path)) {
                fs.mkdirSync(config.log_files.save_path, { recursive: true });
            }
            else {
                const saveDaemon = () => this.saveLogs(config).then(() => setTimeout(saveDaemon, config.log_files.save_interval)).catch(err => { console.error(err); setTimeout(saveDaemon, 5000); });
                saveDaemon();
            }
        }
        else {
            return;
        }
    }
    saveLogs(config) {
        return new Promise((resolve, reject) => {
            const date = (0, dateformat_1.default)(Date.now(), "yyyy-mm-dd_HH-MM-ss", false, false);
            if (this.pending)
                fs.appendFile(path_1.default.join(config.log_files.save_path, date + '.log'), this.pending, (err) => {
                    if (err)
                        return reject(err);
                    this.pending = '';
                    resolve();
                });
            else
                resolve();
        });
    }
}
exports.Logger = Logger;
