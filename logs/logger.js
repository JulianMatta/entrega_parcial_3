const logger = require("log4js");
const path = require("path");

logger.configure({
    appenders:{
        miLoggerConsola:{type:"console"},
        miLoggerWarn:{type:"file",filename:path.join(__dirname,"Warn.log")},
        miLoggerError:{type:"file",filename:path.join(__dirname,"Error.log")}

    },
    categories:{
      default:{appenders:["miLoggerConsola"], level:"info"},
      warn:{appenders:["miLoggerWarn"], level:"warn"},
      error:{appenders:["miLoggerError"], level:"error"},
    }
})




module.exports = logger;



