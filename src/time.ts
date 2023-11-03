import {ThemeCfg} from "./config";
import dateFormat from './dateformat'

export type timestamp = {
    string: string
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

export function getTimestamp(theme: ThemeCfg){
    const d = new Date(Date.now());
    const yr = d.getFullYear();
    const mn = (d.getMonth() + 1)
    const da = d.getDate()
    const hr = d.getHours()
    const mi = d.getMinutes()
    const sc = d.getSeconds()

    const defnight = `${dateFormat(d, "dd/mm/yyyy ☾ HH:MM:ss", false, false)}`;
    const defday = `${dateFormat(d, "dd/mm/yyyy ☼ HH:MM:ss", false, false)}`;
    
    if (hr > 18) {
        const date: timestamp = {
            "string": `${theme.date_format === "" ? defnight : dateFormat(d, theme.date_format, false, false)}`,
            "year": yr,
            "month": mn,
            "day": da,
            "hour": hr,
            "minute": mi,
            "second": sc,
        }
        return date
    }
    const date: timestamp = {
        "string": `${theme.date_format === "" ? defday : dateFormat(d, theme.date_format, false, false)}`,
        "year": yr,
        "month": mn,
        "day": da,
        "hour": hr,
        "minute": mi,
        "second": sc,
    }
    return date
}