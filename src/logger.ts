import { getTimestamp } from "./time";
import {colorize, avgHex, colorizeArgs} from "./color"
import {Config, DefaultCfg, ThemeCfg} from "./config";

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
    color: string[];
    theme: ThemeCfg;
    logLevel!: number;
    show_path: boolean;

    constructor(namestr: string, config: Config = DefaultCfg) {
        let name = namestr.split(".");
        let pathsize = name.length

        this.name = name[name.length]
        this.color = config.theme.path;
        this.show_path = config.show_path;
        this.path = ""

        for(let i = 0; i < name.length; i++) {
            if (i < name.length - 1)  {
                this.path += `${colorize(name[i], this.color[i], false)}${colorize(".", avgHex(this.color[i], this.color[(i+1)??this.color.length]), false)}`
            }
        }
        this.path += `${colorize(name[pathsize - 1], this.color[pathsize - 1], false)}`

        this.theme = config.theme
    }

    // Level control:
    setLogLevel(level: number) {
        this.logLevel = level;
    }

    getLogLevel() {
        return this.logLevel;
    }

    log(level: LogLevel, ...args: any[]) {
        if (level > this.logLevel) return;

        let prefix = getTimestamp(this.theme);
        let message = "" // ⌞timestamp⌝  # @ utils.logger: message

        switch (level){
            case LogLevel.FATAL:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("FATAL", this.theme.log_level.fatal, true)}`
                break;
            case LogLevel.ERROR:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("ERROR", this.theme.log_level.error, true)}`
                break;
            case LogLevel.WARN:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("WARN", this.theme.log_level.warn, false)}`
                break;
            case LogLevel.INFO:
                message = `⌞${colorize(prefix.string, this.theme.timestamp,false)}⌝ ${colorize("INFO", this.theme.log_level.info, false)}`
                break;
            case LogLevel.DEBUG:
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("DEBUG", this.theme.log_level.debug, false)}`
                message += ` @ ${this.path}:`
                if (this.theme.debugtext !== "") {
                    console.log(message, colorizeArgs(this.theme.debugtext, false, ...args));
                } else {
                    console.log(message, ...args);
                }
                return;
            case LogLevel.PACKET:  // For packet logging: args = [(rcv/snt), id, content]
                message = `⌞${colorize(prefix.string, this.theme.timestamp, false)}⌝ ${colorize("PACKET", this.theme.log_level.packet, false)}⌞${args[0]}, ${args[1]}⌝ \n`
                console.log(message, args[2]); // ⌞timestamp⌝  PACKET [rcv/snt, 1]: \n content
                return;
        }

        if (this.show_path) {
            message += ` @ ${this.path}:`
        } else {
            message += ` |`
        }

        if (this.theme.text !== "") {
            console.log(message, colorizeArgs(this.theme.text, false, ...args))
        } else {
            console.log(message, ...args)
        }
        return;
    }
}