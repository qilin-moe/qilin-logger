<h1 align="center">︶꒷꒦︶ ๋࣭ ⭑</h1>

###

<h3 align="center">qilin-logger</h3>

###

<p align="center">logger for all things qilin!</p>

###

<div align="center">
  <img height="100" src="https://avatars.githubusercontent.com/u/147800226?s=200&v=4"  />
</div>

###
<h3 align="center"><b>Add to project</b></h3>

```shell
cargo add --git https://github.com/qilin-moe/qilin-logger.git --branch rs
```
```toml
[dependencies]
qilin-logger = { git = "https://github.com/qilin-moe/qilin-logger", branch = "rs" }
```

<br clear="both">
<hr>

###
<h3 align="center"><b>Usage</b></h3>

<h4>1. Import the module</h4>

```rust
use crate::{Logger, LogLevel};
use crate::config::{Config, default_cfg, LogLevelCfg, ThemeCfg};
```

<h4>2. Define custom config</h4>

```rust
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
```

<h4>3. Create  a new instance of Logger</h4>

```rust
let logger = Logger::new("name", customcfg);
```

<h4>Done!</h4>

```rust
use crate::{Logger, LogLevel};
use crate::config::{Config, default_cfg, LogLevelCfg, ThemeCfg};

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

let logger = Logger::new("name", customcfg);

// note: function will not automatically add spaces between array strings, 
// only strings spaced as " " are spaced (ex: thiscanhave multiple messages)
logger.log(LogLevel::INFO, &["this", "can", "have multiple messages"]);

```

<br clear="both">
<hr>

###
<h3 align="center"><b>Info</b></h3>

<h4>Available levels</h4>

```rust
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
```

###
<h2 align="center">‧₊˚ ⋅* ‧₊</h2>

###
<h4 align="center">i love ascii ♡︎</h4>

<br clear="both">

###
