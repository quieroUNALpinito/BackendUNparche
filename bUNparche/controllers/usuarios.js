const {response, json} = require('express')//como separamos los callbacks de las rutas para tener todo mas ordenado node no sabe que es ese callback por lo tanto llamamos a response
const { googleVerify } = require('../helpers/google-verify')
const {validarCampos} = require('../middlewares/validar-campos')
const {pool} = require("../database/config")
const {generarJWT} = require('../helpers/generar-jwt')

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
    console.log(req.body)
    const {id_token} = req.body
    //En dado caso que falle
    try {
        const {nombre, apellido, img, correo, correoVerificado} = await googleVerify(id_token) //esta funcion como es una promesa puedo ejecutar el await
        regex = /[ ]*[A-Za-z0-9._%+-]+@unal\.edu\.co[ ]*$/
        //verificar que el correo sea de la universidad nacional
        if(correoVerificado === true){//Si el correo es de verdad
            //console.log('yes')
            if(regex.test(correo)){//si el correo es de la universidad
                console.log('yes')
                //verificamos si el correo ya esta en la base de datos
                const existeCorreo = await pool.query(`select * from "Usuario" where "Correo" = '${correo}'`)
                //console.log(existeCorreo.rows[0].ID)
                
                //console.log(existeCorreo.rows.length)
                if(existeCorreo.rows.length === 0){
                    await pool.query(`insert into "Usuario" ("Nombres", "Apellidos", "Correo", "Foto") values('${nombre}', '${apellido}', '${correo}', '${img}')`)
                    const nuevoUsuario = await pool.query(`select * from "Usuario" where "Correo" = '${correo}'`)
                    const {ID, Nombres, Apellidos, Correo, Foto} = nuevoUsuario.rows[0]
                    const token = await generarJWT(ID, Nombres, Apellidos, Correo, Foto)
                    return res.json({msg:"usuario registrado satisfactoriamente", token,ID:ID})
                    //return res.send( token)
                    //res.json({
                    //    msg:'todo felpi',
                    //    id_token
                    //})
                }
                else{
                    const {ID, Nombres, Apellidos, Correo, Foto} = existeCorreo.rows[0]
                    console.log(existeCorreo.rows[0])
                    const token = await generarJWT(ID, Nombres, Apellidos, Correo, Foto)
                    return res.json({msg:"el usuario ya se registro", token,ID:ID})
                }

            }
            else{
                return res.json({msg:"el correo no tiene el dominio requerido"})
            }
        }
        else{
            return res.json({msg:"Correo no verificado por google"})
        }
        //const token = await generarJWT(id)
        //console.log(googleUser);
        /*res.json({
            msg:'todo felpi',
            id_token
        })*/
    } catch (error) {
        console.log(error)
        res.status(400).json({
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
