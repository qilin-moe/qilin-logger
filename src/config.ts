
export const DefaultCfg = {
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
}

export type Config = {
    color: boolean,
    show_path: boolean,
    write_logs: boolean,
    theme: ThemeCfg,
    log_files: LogFilesCfg,
}

export type ThemeCfg = {
    timestamp: string,
    text: string,
    debugtext: string,
    date_format: string,
    log_level: LogLevelCfg,
    path: string[]
}

type LogLevelCfg = {
    fatal: string,
    error: string,
    warn: string,
    info: string,
    debug: string,
    packet: string
}

type LogFilesCfg = {
    save_path: string,
    save_interval: number
}