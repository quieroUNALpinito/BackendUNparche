const  jwt = require('jsonwebtoken')


//solo trabaja con promesas :c, uid es el indentificador unico del usuario
const generarJWT = (uid = '', nombres='', apellidos='', correos='', img='')=>{
    return new Promise((resolve, reject)=>{ //con este return ya se puede usar el await donde se llama la funcion
        //en el jwt solo guardare el uid
        const payload = {uid, nombres, apellidos, correos, img}
        //firmamos un nuevo token
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '6h'
        },(err, token) =>{
            if(err){
                console.log(err);
                reject('no se pudo generar el token')
            }
            else{
                resolve(token);
            }
        } )
    })
}

module.exports= {
    generarJWT
}