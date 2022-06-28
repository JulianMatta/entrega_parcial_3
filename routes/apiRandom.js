const express = require("express");
const router = express.Router();
const path = require("path");
const {fork} = require("child_process");

router.get("",(req,res)=>{

    let cant = req.query.cant ?? 100000000;
    const proceso = fork(path.join(__dirname,"../modules/numeros_random/random.js"));

    proceso.on("message", data=>{
        res.status(200).json(data);
    });
    proceso.send(cant);
        
});


module.exports = router;