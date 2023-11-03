export type rgb = {
    r: number,
    g: number,
    b: number,
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    if (!result) {return {r: 255, g: 255, b: 255}}

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1<<24) + (r<<16) + (g<<8)+ b).toString(16).slice(1);
}

export function avgHex(h1,h2) {
  let a = hexToRgb(h1);
  let b = hexToRgb(h2);
  return rgbToHex(
    ~~((a.r+b.r)/2),
    ~~((a.g+b.g)/2),
    ~~((a.b+b.b)/2));
}

export function colorize(text: string, color: rgb|string, bold: boolean) {
  if(typeof color === "string" ) {
    color = hexToRgb(color);
  }
  if (bold) {
      return `\x1b[1m\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`
  } else {
      return `\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`
  }
}

export function colorizeArgs(color: rgb|string, bold: boolean, ...text: any[]) {
    if(typeof color === "string" ) {
        color = hexToRgb(color);
    }
    if (bold) {
        return `\x1b[1m\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`
    } else {
        return `\x1b[38;2;${color.r};${color.g};${color.b}m${text}\x1b[0m`
    }
}