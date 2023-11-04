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
npm install https://github.com/qilin-moe/qilin-logger.git#ts
```
```json
"qilin-logger": "github:qilin-moe/qilin-logger#ts",
```

<br clear="both">
<hr>

###
<h3 align="center"><b>Usage</b></h3>

<h4>1. Import the module</h4>

```javascript
import {Logger} from 'qilin-logger';

// OR

const {Logger} = require('qilin-logger');
```

<h4>2. Define custom config</h4>

```javascript
const customcfg = {
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

<h4>3. Create  a new instance of Logger</h4>

```javascript
const logger = new Logger("name", customcfg);
```

<h4>Done!</h4>

```javascript
import {Logger} from 'qilin-logger';

// OR

const {Logger} = require('qilin-logger');

const customcfg = {
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

const logger = new Logger("name", customcfg);
logger.log(4, "message");
```

<br clear="both">
<hr>

###
<h3 align="center"><b>Info</b></h3>

<h4>Available levels</h4>

```javascript
export enum LogLevel {
    NONE = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    PACKET = 6,
} // You can just use the numbers if you want
```

###
<h2 align="center">‧₊˚ ⋅* ‧₊</h2>

###
<h4 align="center">i love ascii ♡︎</h4>

<br clear="both">

###