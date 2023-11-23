import { getTimestamp } from "./time";
import {colorize, avgHex, colorizeArgs} from "./color"
import {Config, DefaultCfg, ThemeCfg} from "./config";
import * as fs from "fs";
import path from "path";
import dateFormat from "./dateformat";

export enum LogLevel {
    NONE = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    PACKET = 6,
}

export class Logger {
    name: string;
    path!: string;
    raw_path!: string;
    color: string[];
    theme: ThemeCfg;
    logLevel!: number;
    show_path: boolean;
    pending: string;
    config: Config;

    constructor(namestr: string, config: Config = DefaultCfg) {
        let name = namestr.split(".");
        let pathsize = name.length

        this.name = name[name.length]
        this.color = config.theme.path;
        this.show_path = config.show_path;
        this.path = "";
        this.raw_path = "";
        this.pending = "";
        this.config = config;

        for(let i = 0; i < name.length; i++) {
            if (i < name.length - 1)  {
                this.path += `${colorize(name[i], this.color[i], false)}${colorize(".", avgHex(this.color[i], this.color[(i+1)??this.color.length]), false)}`;
                this.raw_path += `${name[i]}.`
            }
        }
        this.path += `${colorize(name[pathsize - 1], this.color[pathsize - 1], false)}`
        this.raw_path += `${name[pathsize - 1]}`

        this.theme = config.theme;

        if (config.write_logs) {
            if (!fs.existsSync(config.log_files.save_path)) {
                fs.mkdirSync(config.log_files.save_path, {recursive: true})
            }
        }
    }

    log(level: LogLevel, ...args: any[]) {
        if (level > this.logLevel) return;

        let prefix = getTimestamp(this.theme);
        let message = "" // ⌞timestamp⌝  # @ utils.logger: message

        switch (level){
            case LogLevel.FATAL:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("FATAL", this.theme.log_level.fatal, true)}`
                this.pending += `⌞${prefix.string}⌝ FATAL`
                break;
            case LogLevel.ERROR:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("ERROR", this.theme.log_level.error, true)}`
                this.pending += `⌞${prefix.string}⌝ ERROR`
                break;
            case LogLevel.WARN:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("WARN", this.theme.log_level.warn, false)}`
                this.pending += `⌞${prefix.string}⌝ WARN`
                break;
            case LogLevel.INFO:
                message = `⌞${colorize(prefix.string, this.theme.timestamp,false)}⌝ ${colorize("INFO", this.theme.log_level.info, false)}`
                this.pending += `⌞${prefix.string}⌝ INFO`
                break;
            case LogLevel.DEBUG:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("DEBUG", this.theme.log_level.debug, false)}`
                message += ` @ ${this.path}:`
                this.pending += `⌞${prefix.string}⌝ DEBUG @ ${this.raw_path}: ${args} \n`

                // force save any lines that will not be caught by save interval
                this.saveLogs(this.config);
                this.pending = "";

                if (this.theme.debugtext !== "") {
                    console.log(message, colorizeArgs(this.theme.debugtext, false, ...args));
                } else {
                    console.log(message, ...args);
                }
                return;
            case LogLevel.PACKET:  // For packet logging: args = [(rcv/snt), id, content]
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("PACKET", this.theme.log_level.packet, false)}⌞${args[0]}, ${args[1]}⌝ \n`
                this.pending += `⌞${prefix.string}⌝ PACKET ⌞${args[0]}, ${args[1]}⌝ \n ${args[2]} \n`
                console.log(message, args[2]); // ⌞timestamp⌝  PACKET [rcv/snt, 1]: \n content
                return;
        }

        if (this.show_path) {
            message += ` @ ${this.path}:`
            this.pending += ` @ ${this.raw_path}:`
        } else {
            message += ` |`
            this.pending += ` |`
        }

        if (this.theme.text !== "") {
            console.log(message, colorizeArgs(this.theme.text, false, ...args))
        } else {
            console.log(message, ...args)
        }

        this.pending += ` ${args} \n`

        // force save any lines that will not be caught by save interval
        this.saveLogs(this.config);
        this.pending = "";
        return;
    }

    public initLogSave(config: Config) {
        if (config.write_logs) {
            if (!fs.existsSync(config.log_files.save_path)) {
                fs.mkdirSync(config.log_files.save_path, {recursive: true})
            } else {
                const saveDaemon = () => this.saveLogs(config).then(() => setTimeout(saveDaemon, config.log_files.save_interval)).catch(err => {console.error(err);setTimeout(saveDaemon, 5000);});
                saveDaemon();
            }
        } else {
            return;
        }
    }

    saveLogs(config: Config) {
        return new Promise<void>((resolve, reject) => {
            const date = dateFormat(Date.now(), "yyyy-mm-dd_HH-MM-ss", false, false);
            if (this.pending)
                fs.appendFile(path.join(config.log_files.save_path, date + '.log'), this.pending, (err) => {
                    if (err) return reject(err);
                    this.pending = '';
                    resolve();
                })
            else resolve()
        })
    }
}