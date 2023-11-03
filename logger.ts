import { getTimestamp } from "./time";
import { colorize, avgHex } from "./color"
import config from "../config"; // TODO: Actually get the json instead of the script :thumbsup:

export enum LogLevel {
    NONE = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    VERBP = 6,
}

export default class Logger {
    name: string;
    path!: string;
    color: string[];
    theme: any;
    logLevel!: number;

    constructor(namestr: string, color: string[] = ["#FFFFFF"]) {
        let name = namestr.split(".");
        let pathsize = name.length

        this.name = name[name.length]
        this.color = color;
        this.path = ""

        for(let i = 0; i < name.length; i++) {
            if (i < name.length - 1)  {
                this.path += `${colorize(name[i], color[i])}${colorize(".", avgHex(color[i], color[(i+1)??color.length]))}`
            }
        }
        this.path += `${colorize(name[pathsize - 1], color[pathsize - 1])}`

        this.theme = config.logger.theme
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

        let prefix = getTimestamp();
        let message = "" // ⌞ timestamp⌝  # @ utils.logger: message

        switch (level){
            case LogLevel.FATAL:
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝ ${colorize("FATAL", this.theme.loglevel.fatal)}`
                break;
            case LogLevel.ERROR:
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝ ${colorize("ERROR", this.theme.loglevel.error)}`
                break;
            case LogLevel.WARN:
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝ ${colorize("WARN", this.theme.loglevel.warn)}`
                break;
            case LogLevel.INFO:
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝ ${colorize("INFO", this.theme.loglevel.info)}`
                break;
            case LogLevel.DEBUG:
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝ ${colorize("DEBUG", this.theme.loglevel.debug)}`
                message += ` @ ${this.path}: `
                console.log(message, ...args);
                return
            case LogLevel.VERBP:  // For packet logging: args = [(rcv/snt), id, content]
                message = `⌞ ${colorize(prefix.string, this.theme.timestamp)}⌝`,
                `${colorize("PACKET", this.theme.loglevel.packet)}`
                message += `「${args[0]}, ${args[1]}」\n`
                console.log(message, args[2]); // ⌞ timestamp⌝  PACKET [rcv/snt, 1]: \n content
                return
        }
        message += ` @ ${this.path}: `
        console.log(message, ...args)
        return
    }
}