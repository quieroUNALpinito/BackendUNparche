const {response, json} = require('express')//como separamos los callbacks de las rutas para tener todo mas ordenado node no sabe que es ese callback por lo tanto llamamos a response
const { googleVerify } = require('../helpers/google-verify')
const {validarCampos} = require('../middlewares/validar-campos')
//const bd = require('../database/config')
const {Pool} = require('pg')

const pool = new Pool({
    //En donde esta mi server de postgres
    host: 'localhost',
    user: 'postgres',
    password: process.env.PASS_BD,
    database: process.env.NAME_BD,
    port: process.env_PORT_BD
})

const getPerfilInfo = async(req,res) => {
  try{
    //console.log(bd)
    let {id} = req.body
    let records = await pool.query(`select * from "Usuario" where "ID"='`+id+`'`)
    res.json({
      data: records.rows,
      msg: 'get de descripcion'
    })
  }catch (error){
    console.log(error)
    res.json({
      status: 'error',
      msg: error
    })
  }
}

const updatePerfilInfo = async(req,res) => {
  try{
    //console.log(bd)
    let {id, descripcion} = req.body
    let records = await pool.query(`update "Usuario" set "Descripcion"='`+descripcion+`' where "ID"='`+id+`'`)
    res.json({
      status: 'success',
      msg: 'actualización exitosa'
    })
  }catch (error){
    console.log(error)
    res.json({
      status: 'error',
      msg: error
    })
  }
}

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
    googleSignIn,
    getPerfilInfo,
    updatePerfilInfo
}
