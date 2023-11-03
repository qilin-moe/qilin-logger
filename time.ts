export type timestamp = {
    string: string
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

export function getTimestamp(){
    const d = new Date(Date.now());
    const yr = d.getFullYear();
    const mn = (d.getMonth() + 1)
    const da = d.getDate()
    const hr = d.getHours()
    const mi = d.getMinutes()
    const sc = d.getSeconds()
    
    
    if (hr > 18) {
        const date: timestamp = {
            "string": `${da}/${mn}/${da} ☾ ${hr}:${mi}:${sc}`,
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
        "string": `${da}/${mn}/${da} ☼ ${hr}:${mi}:${sc}`,
        "year": yr,
        "month": mn,
        "day": da,
        "hour": hr,
        "minute": mi,
        "second": sc,
    }
    return date
}