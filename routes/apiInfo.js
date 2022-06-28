const express = require("express");
const router = express.Router();
const os = require("os");
const compression = require("compression");

router.get("",(_req,res)=>{
   
    res.status(200).json(creaObjetoInfo());
});

router.get("/comprimida", compression(), (_req,res)=>{

    res.status(200).json(creaObjetoInfo());
});

function creaObjetoInfo(){
    return {
        carpeta_proyecto:process.cwd(),
        path_ejecucion:process.execPath,
        plataforma:process.platform,
        argumentos:process.argv.slice(2),
        version_node:process.version,
        process_id:process.pid,
        memoria_total:process.memoryUsage().rss,
        procesadores_presentes:os.cpus().length,
    };
}

module.exports = router;