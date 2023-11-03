
export const DefaultCfg = {
    color: true,
    show_path: true,
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
    }
}

export type Config = {
    color: boolean,
    show_path: boolean,
    theme: ThemeCfg,
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