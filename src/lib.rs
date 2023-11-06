use crate::color::colorize;
use crate::config::{Config, ThemeCfg};
use crate::time::get_timestamp;

mod time;
mod config;
mod color;

#[derive(PartialEq)]
pub enum LogLevel {
    NONE = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    PACKET = 6,
}

struct Logger {
    path: String,
    theme: ThemeCfg,
    show_path: bool
}

impl Logger {
    pub fn new(namestr: &str, config: Config) -> Self {
       let name: Vec<&str> = namestr.split(".").collect();
        let pathsize = name.len();

        let mut path = String::new();

        let mut i = 0;
        while i <= pathsize {
            i += 1;

            if i < pathsize - 1 {
                path += &*(colorize(&name[i], config.theme.path[i].as_str(), false) + &*colorize(".", "#808080", false));
            }
        }

        path += &*colorize(&name[pathsize - 1], config.theme.path[pathsize - 1].as_str(), false);

        Self {path: path.to_string(), theme: config.theme, show_path: config.show_path }
    }

    pub fn log(&self, log_level: LogLevel, args: &[&str]) {
        let prefix = get_timestamp(&self.theme);
        let mut message = String::new();

        match log_level {
            LogLevel::NONE => {}
            LogLevel::FATAL => {
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("FATAL", &self.theme.log_level.fatal, true);
                message = format!("⌞{prefixcolor}⌝ {messagecolor}");
            }
            LogLevel::ERROR => {
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("ERROR", &self.theme.log_level.error, true);
                message = format!("⌞{prefixcolor}⌝ {messagecolor}");
            }
            LogLevel::WARN => {
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("WARN", &self.theme.log_level.warn, false);
                message = format!("⌞{prefixcolor}⌝ {messagecolor}");
            }
            LogLevel::INFO => {
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("INFO", &self.theme.log_level.info, false);
                message = format!("⌞{prefixcolor}⌝ {messagecolor}");
            }
            LogLevel::DEBUG => {
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("DEBUG", &self.theme.log_level.debug, true);
                message = format!("⌞{prefixcolor}⌝ {messagecolor}");
                message += &*format!(" @ {path}:", path = self.path.as_str());

                if self.theme.debugtext != "" {
                    println!("{msg} {args}", msg = message, args = colorize(args.concat().as_str(), &self.theme.debugtext, false));
                } else {
                    println!("{msg} {args}", msg = message, args = args.concat());
                }
                return;
            }
            LogLevel::PACKET => { // For packet logging: args = [(rcv/snt), id, content]
                let prefixcolor = colorize(prefix.string.as_str(), &self.theme.timestamp, false);
                let messagecolor = colorize("PACKET", &self.theme.log_level.packet, true);
                message = format!("⌞{prefixcolor}⌝ {messagecolor} ⌞{arg1}, {arg2}⌝", arg1 = args[0], arg2 = args[1]);
                message += &*format!(" @ {path}: \n {arg3}", path = self.path.as_str(), arg3 = args[2]);
                println!("{}", message);
                return;
            }
        }

        if self.show_path {
            message += &*format!(" @ {path}:", path = self.path.as_str());
        } else {
            message += &*format!(" |");
        }

        if self.theme.text != "" {
            println!("{msg} {args}", msg = message, args = colorize(args.concat().as_str(), &self.theme.text, false));
        } else {
            println!("{msg} {args}", msg = message, args = args.concat());
        }
    }
}


#[cfg(test)]
mod tests {
    use crate::{Logger, LogLevel};
    use crate::config::{Config, default_cfg, LogLevelCfg, ThemeCfg};

    #[test]
    fn it_works() {
        let customcfg = Config {
            color: true,
            show_path: false,
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

        let logger = Logger::new("test", customcfg);

        logger.log(LogLevel::INFO, &["rcv", "rsp", "message yoooo"]);
    }
}
