# qilin-logger
Logger for qilin stuff

## Add to project
```shell
npm install https://github.com/qilin-moe/qilin-logger.git#ts
```

```json
"qilin-logger": "github:qilin-moe/qilin-logger#ts",
```

## Usage

```javascript
import {Logger} from 'qilin-logger';
//     OR
const {Logger} = require('qilin-logger');

// OPTIONAL
const customcfg = {} // define custom config based on Default config from below...

const logger = new Logger("DATABASE", customcfg);
logger.log(LogLevel.INFO, "message");

// available levels
export enum LogLevel {
    NONE = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    PACKET = 6,
}

// default config 
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
```
