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
    console.log('id_Creador: ',id_creador)
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

const buscarGrupos = async (req, res) =>{
  try {
    console.log('hola')
    let {categoria, id_categoria, id_user} = req.body
    console.log(req.body)


    let respuesta = await db.pool.query(` select "Grupo"."Nombre" as "NombreGrupo" , "Grupo"."Descripcion", "Grupo"."Oficial" ,"CategoriaGrupo"."Nombre" as "Nombre Categoria", "Usuario"."Nombres", "Usuario"."Apellidos"  from "Grupo" inner join "CategoriaGrupo"  ON "Grupo"."ID_CategoriaGrupo"  = "CategoriaGrupo"."ID"   inner join "UsuariosGrupo" on "Grupo"."ID"  = "UsuariosGrupo"."ID_grupo"  inner join "Usuario" on "Usuario"."ID"  = "UsuariosGrupo"."ID_usuario" where "Grupo"."Privado" = false and "UsuariosGrupo"."ID_usuario" != ${id_user} and "UsuariosGrupo"."ID_permiso" = 1 and "CategoriaGrupo"."Nombre" = '${categoria}'`)
    
    console.log(respuesta.rows)
    if(respuesta.rows.length >0){
      for (let i = 0; i < respuesta.rows.length; i++) {
        console.log(respuesta.rows[i])
        if(respuesta.rows[i].Oficial === true){
          respuesta.rows[i].Oficial = 'Si'
        }
        else{
          respuesta.rows[i].Oficial = 'No'
        }
        
      }
      res.json(respuesta.rows)
    }
    else{
      res.json({message: "No se encontraron grupos :("})
    }

    
  } catch (error) {
    console.log(error)
    console.log('no se encontro nada')
  }
}

const buscarGruposPorNombre = async (req, res) =>{
  try {
    console.log('hola')
    let {nombreGrupo, id_user} = req.body

    let respuesta = await db.pool.query(`select "Grupo"."Nombre" as "Nombre Grupo" , "Grupo"."Descripcion", "Grupo"."Oficial" ,"CategoriaGrupo"."Nombre" as "NombreCategoria", "Usuario"."Nombres", "Usuario"."Apellidos"  from "Grupo" inner join "CategoriaGrupo"  ON "Grupo"."ID_CategoriaGrupo"  = "CategoriaGrupo"."ID"   inner join "UsuariosGrupo" on "Grupo"."ID"  = "UsuariosGrupo"."ID_grupo"  inner join "Usuario" on "Usuario"."ID"  = "UsuariosGrupo"."ID_usuario" where "Grupo"."Privado" = false  and "UsuariosGrupo"."ID_usuario" != ${id_user} and "UsuariosGrupo"."ID_permiso" =1 and lower("Grupo"."Nombre")  like lower('%${nombreGrupo}%')`)
    console.log(respuesta)
    if(respuesta.rows.length >0){
      for (let i = 0; i < respuesta.rows.length; i++) {
        console.log(respuesta.rows[i])
        if(respuesta.rows[i].Oficial === true){
          respuesta.rows[i].Oficial = 'Si'
        }
        else{
          respuesta.rows[i].Oficial = 'No'
        }
        
      }
      res.json(respuesta.rows)
    }
    else{
      res.json({message: "No se encontraron grupos :("})
    }
  } catch (error) {
    console.log(error)
  }
}

const buscarMisGrupos = async (req, res) =>{
  try {
    console.log('Fetch groups')
    let {id_user} = req.body

    let respuesta = await db.pool.query(`select "Grupo"."ID", "Grupo"."Nombre" as "NombreGrupo" , "Grupo"."Descripcion", "Grupo"."Oficial","Grupo"."Privado","CategoriaGrupo"."Nombre" as "NombreCategoria", "Usuario"."Nombres", "Usuario"."Apellidos"  from "Grupo" inner join "CategoriaGrupo"  ON "Grupo"."ID_CategoriaGrupo"  = "CategoriaGrupo"."ID"   inner join "UsuariosGrupo" on "Grupo"."ID"  = "UsuariosGrupo"."ID_grupo"  inner join "Usuario" on "Usuario"."ID"  = "UsuariosGrupo"."ID_usuario" where "Grupo"."Privado" = false  and "UsuariosGrupo"."ID_usuario" = ${id_user} and "UsuariosGrupo"."ID_permiso" = 1`)
    console.log(respuesta)
    if(respuesta.rows.length >0){
      for (let i = 0; i < respuesta.rows.length; i++) {
        console.log(respuesta.rows[i])
        if(respuesta.rows[i].Oficial === true){
          respuesta.rows[i].Oficial = 'Si'
        }
        else{
          respuesta.rows[i].Oficial = 'No'
        }
        (respuesta.rows[i].Privado)? respuesta.rows[i].Privado = 'Privado' : respuesta.rows[i].Privado = 'Público'
        
      }
      res.json(respuesta.rows)
    }
    else{
      res.json({message: "No se encontraron grupos :("})
    }
  } catch (error) {
    console.log(error)
  }
}

const updateGrupos = async(req,res) => {
    try{
      let {group, categoria} = req.body
      let {ID, Privado, NombreGrupo, Descripcion} = group
      Privado = Privado === 'Privado'
      let records = await db.pool.query(`update "Grupo" set "Nombre" = '${NombreGrupo}',
          "Privado" = '${Privado}', "Descripcion" = '${Descripcion}', "ID_CategoriaGrupo" = '${categoria}'
          where "ID" = ${ID}`)
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

const buscarMisSolicitudes = async (req, res) =>{
  try {
    console.log('Fetch groups')
    let {id_user} = req.body

    let respuesta = await db.pool.query(`With "MisGrupos" as (select "Grupo"."ID","Grupo"."Nombre"
	from "Grupo" inner join "UsuariosGrupo" on "Grupo"."ID"  = "UsuariosGrupo"."ID_grupo"
				inner join "Usuario" on "Usuario"."ID"  = "UsuariosGrupo"."ID_usuario"
			where "UsuariosGrupo"."ID_usuario" = ${id_user} and "UsuariosGrupo"."ID_permiso" = 1)

select "MisGrupos"."Nombre" as "NombreGrupo" , "Usuario"."Nombres", "Usuario"."Apellidos"
	from "MisGrupos" inner join "UsuariosGrupo" on "MisGrupos"."ID"  = "UsuariosGrupo"."ID_grupo"
	inner join "Usuario" on "Usuario"."ID"  = "UsuariosGrupo"."ID_usuario"
	where "UsuariosGrupo"."ID_permiso" = 3`)
    console.log(respuesta)
    if(respuesta.rows.length >0){
      res.json(respuesta.rows)
    }
    else{
      res.json({message: "No se encontraron solicitudes :("})
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports={
    crearGrupo,
    grCategoriasGet,
    listarMiembros,
    updatePermiso,
    buscarGrupos,
    buscarMisGrupos,
    buscarGruposPorNombre,
    updateGrupos,
    buscarMisSolicitudes
}

