pub fn default_cfg() -> Config {
    let default_cfg = Config {
        color: true,
        show_path: true,
        theme: ThemeCfg {
            timestamp: String::from("ffffff"),
            text: String::from("ff66cc"),
            debugtext: String::from("339966"),
            date_format: String::from(""),
            log_level: LogLevelCfg {
                fatal: String::from("ff0000"),
                error: String::from("ff3300"),
                warn: String::from("f5c211"),
                info: String::from("6ef482"),
                debug: String::from("cc66ff"),
                packet: String::from("0033cc")
            },
            path: Vec::from([String::from("#FFFFFF")]),
        },
    };

    return default_cfg;
}

pub struct Config {
    pub color: bool,
    pub show_path: bool,
    pub theme: ThemeCfg
}

#[derive(Clone)]
pub struct ThemeCfg {
    pub timestamp: String,
    pub text: String,
    pub debugtext: String,
    pub date_format: String,
    pub log_level: LogLevelCfg,
    pub path: Vec<String>
}

#[derive(Clone)]
pub struct LogLevelCfg {
    pub fatal: String,
    pub error: String,
    pub warn: String,
    pub info: String,
    pub debug: String,
    pub packet: String,
}
