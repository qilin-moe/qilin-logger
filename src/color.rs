pub struct Color;

pub fn colorize(text: &str, color: &str, bold: bool) -> String {
    let rgb = Color::hex(color).to_rgb();

    return if bold {
        "\x1b[1m\x1b[38;2;${r};${g};${b}m${text}\x1b[0m"
            .replace("${r}", rgb.r.to_string().as_str())
            .replace("${g}", rgb.g.to_string().as_str())
            .replace("${b}", rgb.b.to_string().as_str())
            .replace("${text}", text)
    } else {
        "\x1b[38;2;${r};${g};${b}m${text}\x1b[0m"
            .replace("${r}", rgb.r.to_string().as_str())
            .replace("${g}", rgb.g.to_string().as_str())
            .replace("${b}", rgb.b.to_string().as_str())
            .replace("${text}", text)
    }
}


impl Color {
    pub fn hex(color: &str) -> HexColor {
        HexColor::new(color)
    }
    /*pub fn rgb(r: u8, g: u8, b: u8) -> RgbColor {
        RgbColor::new(r, g, b)
    }*/
}

pub struct RgbColor {
    r: u8,
    g: u8,
    b: u8,
}

pub enum Colors {
    Red(u8),
    Green(u8),
    Blue(u8),
    All(u8)
}

impl RgbColor {
    pub fn new(r: u8, g: u8, b: u8) -> Self {
        Self { r, g, b }
    }
    /*fn get_hex_equivalent(&self) -> String {
        format!("{:02X}{:02X}{:02X}", self.r, self.g, self.b).to_lowercase()
    }
    pub fn to_hex(&self) -> HexColor {
        let color: &String = &self.get_hex_equivalent();

        HexColor::new(&color)
    }*/
}

pub struct HexColor {
    color: String,
}

impl HexColor {
    pub fn new(color: &str) -> Self {
        let mut color: String = String::from(color);

        if color.starts_with("#") {
            color.remove(0);
        }
        if color.len() > 6 {
            panic!("Invalid hex!");
        }
        for c in color.chars() {
            if !c.is_digit(16) {
                panic!("Invalid hex!");
            }
        }

        for _ in 0..6 - color.len() {
            color.insert(0, '0');
        }

        color = color.to_lowercase();

        Self { color }
    }
    fn get_rgb_equivalent(&self) -> (u8, u8, u8) {
        let r = u8::from_str_radix(&self.color[0..2], 16)
            .map_err(|_| "Invalid hex color")
            .unwrap();
        let g = u8::from_str_radix(&self.color[2..4], 16)
            .map_err(|_| "Invalid hex color")
            .unwrap();
        let b = u8::from_str_radix(&self.color[4..6], 16)
            .map_err(|_| "Invalid hex color")
            .unwrap();

        (r, g, b)
    }
    pub fn to_rgb(&self) -> RgbColor {
        let (r, g, b) = self.get_rgb_equivalent();

        RgbColor::new(r, g, b)
    }
}
