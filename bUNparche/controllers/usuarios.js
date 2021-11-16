const {response, json} = require('express')//como separamos los callbacks de las rutas para tener todo mas ordenado node no sabe que es ese callback por lo tanto llamamos a response
const { googleVerify } = require('../helpers/google-verify')
const {validarCampos} = require('../middlewares/validar-campos')

const usuariosGet = (req, res = response) => {

    const {q,edad,cc} = req.query
    res.json({
        q,
        edad,
        cc,
        msg: 'get API - Controlador'
    })
}

const usuariosPost = (req, res) => {
    //extraemos el body de la peticion  post
    const {nombre, edad} = req.body

    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {
    const {id} = req.params
    res.json({
        id,
        msg: 'put api - Controlador'
    })
}

const googleSignIn = async(req, res= response)=>{//el response es para obtener el tipado ya que no usamos typescript
    const {id_token} = req.body
    //En dado caso que falle
    try {
        const googleUser = await googleVerify(id_token) //esta funcion como es una promesa puedo ejecutar el await
        console.log(googleUser);
        res.json({
            msg:'todo felpi',
            id_token
        })
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg:'El token no se pudo verificar'
        })
    }
    
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    googleSignIn
}