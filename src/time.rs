use std::str::FromStr;
use crate::config::ThemeCfg;
use chrono::{Datelike, DateTime, Timelike, Utc};

pub struct QilinTimestamp {
    pub string: String,
    pub year: i32,
    pub month: i32,
    pub day: i32,
    pub hour: i32,
    pub minute: i32,
    pub second: i32
}

pub fn get_timestamp(theme: &ThemeCfg) -> QilinTimestamp {
    let now: DateTime<Utc> = Utc::now();
    let year = now.year();
    let mn = i32::from_str(now.month().to_string().as_str()).unwrap();
    let dd = i32::from_str(now.day().to_string().as_str()).unwrap();
    let hr = i32::from_str(now.hour().to_string().as_str()).unwrap();
    let mm = i32::from_str(now.minute().to_string().as_str()).unwrap();
    let ss = i32::from_str(now.second().to_string().as_str()).unwrap();

    return if hr > 18 {
        QilinTimestamp {
            string: String::from_str(pretty_date(theme.date_format.as_str(), "☾", now).as_str()).unwrap(),
            year,
            month: mn,
            day: dd,
            hour: hr,
            minute: mm,
            second: ss,
        }

    } else {
        QilinTimestamp {
            string: String::from_str(pretty_date(theme.date_format.as_str(), "☼", now).as_str()).unwrap(),
            year,
            month: mn,
            day: dd,
            hour: hr,
            minute: mm,
            second: ss,
        }
    }
}

fn pretty_date(format: &str, symbol: &str, date: DateTime<Utc>) -> String {
    return if format == "" {
        date.format("%d/%m/%Y {} %H:%M:%S".replace("{}", symbol).as_str()).to_string()
    } else {
        date.format(format).to_string()
    }
}
