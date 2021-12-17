const db = require('../database/config')

const grCategoriasGet = async (req,res) => {
    try{
        let records = await db.pool.query(' select * from "CategoriaGrupo"')
        res.json({
            message: 'listado de categorias de grupo',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}

const crearGrupo = async (req,res) => {

    try {
    let { nombre, descripcion, oficial, categoriaGrupo, id_creador} = req.body
    const sqlIns = `INSERT INTO "Grupo" ("ID_CategoriaGrupo", "Nombre", "Descripcion", "Oficial")`+
            `VALUES ( '`+categoriaGrupo+`', '`+ nombre+`','`+descripcion+`',' `+oficial+`') RETURNING "ID";`
    const records = await db.pool.query(sqlIns)
    const insertPermiso = `INSERT INTO "PermisosUsuario" ("ID_usuario", "ID_permiso") VALUES ( `+id_creador+`, 1);`
    const insertUserGroup = `INSERT INTO "UsuariosGrupo" ("ID_usuario", "ID_grupo" , "ID_permiso")` +
        `VALUES ( `+id_creador+`,`+records.rows[0].ID+`, 1);`
    await db.pool.query(insertPermiso)
    await db.pool.query(insertUserGroup)
    await db.pool.query('COMMIT')
    res.json({
        status: 'success',
        message: 'Grupo creado'
    })
  } catch (error) {
    console.log(error)
    res.json({
        status: 'error',
        message: error
    })
  } 
}

const listarMiembros = async (req,res) => {
    try{
        let { id_grupo } = req.body
        let records = await db.pool.query('SELECT ug."ID_usuario", u."Nombres", u."Apellidos" , ug."ID_permiso"'+
        ' from "UsuariosGrupo" ug right JOIN "Usuario" u ON ug."ID_usuario" = u."ID" '+
        ' WHERE ug."ID_grupo" ='+ ``+id_grupo+``)
        res.json(records.rows)
      
    } catch (error) {
        console.log(error)
    }
}

const updatePermiso = async(req,res) => {
    try{
      let {permiso,grupo,usuario} = req.body
      let records = await db.pool.query(`update "UsuariosGrupo" set "ID_permiso" =
         `+permiso+` where "ID_grupo" = `+grupo+`AND "ID_usuario" = `+usuario+``)
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

module.exports={
    crearGrupo,
    grCategoriasGet,
    listarMiembros,
    updatePermiso
}

