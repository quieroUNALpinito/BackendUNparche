//Aqui van los middlewares personalizados

const { validationResult } = require("express-validator")


//Aqui se van acumulando todos los errores del express-validator
//Como la funcion validarCampos  es un middleware este tiene un argumento llamado next, el cual sirve en dado caso el middleware no de error, es decir next indica lo que se va a llamar si el middleware pasa
const validarCampos = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors) //Ya no sigua con los siguientes middlewares  y pare aqui
    }
    //siga con el siguiente middleware y si no hay otro middleware siga con el controlador
    next();
}


module.exports = {
    validarCampos
}