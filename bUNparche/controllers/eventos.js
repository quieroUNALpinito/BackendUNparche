const db = require('../database/config')

const tiposEvento = async (req,res) => {
    try{
        let records = await db.pool.query('select * from "TipoEvento"')
        res.json({
            message: 'listado de tipos de evento',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}

const gruposDeUsuario = async (req,res) => {
    try{
        let { usuario } = req.body
        let records = await db.pool.query(`select "ug"."ID_grupo" as "ID", "g"."Nombre" as "Nombre" from "UsuariosGrupo" as "ug" left join "Grupo" as "g" `+
        `on ("ug"."ID_grupo" = "g"."ID") where "ug"."ID_usuario" = `+usuario )
        res.json({
            message: 'listado de grupos a los que pertenece el usuario autenticado',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}

const crearEvento = async (req,res) => {
    try {
        let { asunto, descripcion, tipoEvento, fecha,  duracion, presencial,  bloficial, lugaroficial, recurrente , nombreubicacion, privado, usuario } = req.body
        let sqlIns = ``
        if(presencial){
            if(bloficial){
                sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "LugarOficial", "ID_lugarOficial", "ID_creador", "ID_grupo", "Recurrente", "Privado" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , '`+bloficial+`' , `+lugaroficial.ID+` , `+usuario+` , null , '`+recurrente+`', `+privado+`  )`
            }else{
                sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "LugarOficial", "NombreUbicacion", "CoordenadasUbicacion", "ID_creador", "ID_grupo", "Recurrente", "Privado" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , '`+bloficial+`' , '`+nombreubicacion+`' , null , `+usuario+` , null , '`+recurrente+`', `+privado+`  )`
            }
        }else{
            sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "ID_creador", "ID_grupo", "Recurrente", "Privado" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , `+usuario+` , null , '`+recurrente+`', `+privado+`  )`
        }
        let records = await db.pool.query(sqlIns)
        res.json({
            status: 'success',
            message: 'Evento creado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: error
        })
    }
}
const listarEventos = async (req,res) => {
    try{
        let {privado, usuario, grupos} = req.body
        let records = ``
        let gruposToString = ``
        if (grupos.length > 0) {
          for (const x of grupos) {
            gruposToString = gruposToString + '\'' + x.ID + '\', '
          }
          ids_grupos = gruposToString.slice(0,gruposToString.length-2)
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) `+
            `order by "Hora"::date`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false order by "Hora"::date`)
          }
        }else{
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and e."ID_creador" = `+usuario+` order by "Hora"::date`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false order by "Hora"::date`)
          }
        }
        res.json({
            message: 'Sip sirvio',
            data: records.rows
        })
    } catch (error) {
        console.log(error)
    }
}
const listarEventosByHour = async (req,res) => {
    try{
        let records = ``
        let { inicio, fin, usuario, privado, grupos } = req.body
        let gruposToString = ``
        if (grupos.length > 0) {
          for (const x of grupos) {
            gruposToString = gruposToString + '\'' + x.ID + '\', '
          }
          ids_grupos = gruposToString.slice(0,gruposToString.length-2)
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            ` from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) and "Hora"::time between '`+inicio+`' and '`+fin+`' order by "Hora"::date`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            ` from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false and "Hora"::time between '`+inicio+`' and '`+fin+`' order by "Hora"::date`)
          }
        }else{
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            ` from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and e."ID_creador" = `+usuario+` and "Hora"::time between '`+inicio+`' and '`+fin+`' order by "Hora"::date`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            ` from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false and "Hora"::time between '`+inicio+`' and '`+fin+`' order by "Hora"::date`)
          }
        }
        res.json({
            message: 'Sip sirvio',
            data: records.rows
        })
    } catch (error) {
        console.log(error)
    }
}
const listarEventosByLocation = async (req,res) => {
    try{
        let { edificio, usuario, privado, grupos } = req.body
        let records = ``
        let gruposToString = ``
        if (grupos.length > 0) {
          for (const x of grupos) {
            gruposToString = gruposToString + '\'' + x.ID + '\', '
          }
          ids_grupos = gruposToString.slice(0,gruposToString.length-2)
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) and l."Edificio" = '`+edificio+`'`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false and l."Edificio" = '`+edificio+`'`)
          }
        }else{
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and e."ID_creador" = `+usuario+` and l."Edificio" = '`+edificio+`'`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false and l."Edificio" = '`+edificio+`'`)
          }
        }
        res.json({
            message: 'Sip sirvio',
            data: records.rows
        })
      } catch (error) {
          console.log(error)
      }
}
const verEvento = async (req,res) => {
    try{
        let { id } = req.body
        let records = await db.pool.query(' select e.*,u."Nombres" nombrecreador,u."Apellidos" apellidocreador, g."Nombre" NombreGrupo from "Evento" e left join "Grupo" g on e."ID_grupo" = g."ID" left join "Usuario" u on e."ID_creador" = u."ID" where e."ID" = '+id+'')
        res.json({
            message: 'Sip sirvio',
            data: records.rows
        })
      } catch (error) {
          console.log(error)
      }
}
const listarEventosByType = async (req,res) => {
    try{
        let { tipos, usuario, privado, grupos } = req.body
        let tiposToString = ''
        let records = ``
        let gruposToString = ``
        if (grupos.length > 0) {
          for (const x of grupos) {
            gruposToString = gruposToString + '\'' + x.ID + '\', '
          }
          ids_grupos = gruposToString.slice(0,gruposToString.length-2)
          if(privado){
            if (tipos.length > 0) {
              for (const x of tipos) {
                tiposToString = tiposToString + '\'' + x.ID + '\', '
              }
              ids = tiposToString.slice(0,tiposToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" `+
              `where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) and ti."ID" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) order by "Hora"::date`)
            }
          }else{
            if (tipos.length > 0) {
              for (const x of tipos) {
                tiposToString = tiposToString + '\'' + x.ID + '\', '
              }
              ids = tiposToString.slice(0,tiposToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" `+
              `where e."Privado" = false and ti."ID" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" where e."Privado" = false order by "Hora"::date`)
            }
          }
        }else{
          if(privado){
            if (tipos.length > 0) {
              for (const x of tipos) {
                tiposToString = tiposToString + '\'' + x.ID + '\', '
              }
              ids = tiposToString.slice(0,tiposToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" `+
              `where e."Privado" = true and e."ID_creador" = `+usuario+` and ti."ID" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" where e."Privado" = true and e."ID_creador" = `+usuario+` order by "Hora"::date`)
            }
          }else{
            if (tipos.length > 0) {
              for (const x of tipos) {
                tiposToString = tiposToString + '\'' + x.ID + '\', '
              }
              ids = tiposToString.slice(0,tiposToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" `+
              `where e."Privado" = false and ti."ID" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from ("Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID") left join "TipoEvento" ti on e."ID_TipoEvento" = ti."ID" where e."Privado" = false order by "Hora"::date`)
            }
          }
        }
        res.json({
            message: 'OK',
            data: records.rows
        })
    } catch (error) {
        console.log(error)
    }
}
const listarEventosByGroup = async (req,res) => {
    try{
        let { grupos, usuario, privado, gruposSeleccionados } = req.body
        let gruposSeleccionadosToString = ''
        let records = ``
        let gruposToString = ``
        if (grupos.length > 0) {
          for (const x of grupos) {
            gruposToString = gruposToString + '\'' + x.ID + '\', '
          }
          ids_grupos = gruposToString.slice(0,gruposToString.length-2)
          if(privado){
            if (gruposSeleccionados.length > 0) {
              for (const x of gruposSeleccionados) {
                gruposSeleccionadosToString = gruposSeleccionadosToString + '\'' + x.ID + '\', '
              }
              ids = gruposSeleccionadosToString.slice(0,gruposSeleccionadosToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" `+
              `where e."Privado" = true and e."ID_grupo" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and (e."ID_creador" = `+usuario+` or e."ID_grupo" in (`+ids_grupos+`)) order by "Hora"::date`)
            }
          }else{
            if (gruposSeleccionados.length > 0) {
              for (const x of gruposSeleccionados) {
                gruposSeleccionadosToString = gruposSeleccionadosToString + '\'' + x.ID + '\', '
              }
              ids = gruposSeleccionadosToString.slice(0,gruposSeleccionadosToString.length-2)
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" `+
              `where e."Privado" = false and e."ID_grupo" in (`+ids+`) order by "Hora"::date`)
            } else {
              records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
              `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false order by "Hora"::date`)
            }
          }
        }else{
          if(privado){
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = true and e."ID_creador" = `+usuario+` order by "Hora"::date`)
          }else{
            records = await db.pool.query(`select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" `+
            `from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where e."Privado" = false order by "Hora"::date`)
          }
        }
        res.json({
            message: 'OK',
            data: records.rows
        })
    } catch (error) {
        console.log(error)
    }
}
const confirmarAsistencia = async (req,res) => {
    try{
        let { event , user } = req.body
        let record = await db.pool.query('insert into "AsistentesEvento" ("ID_evento", "ID_usuario" , "Notificaciones" , "Confirmacion") select '+event+' , '+user+' , true , true where not exists (select "ID_evento", "ID_usuario" from "AsistentesEvento" ae where "ID_evento" = '+event+' and "ID_usuario" = '+user+' limit 1)')
        res.json({
            status: 'success',
            message: 'asistencia confirmada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: error
        })
    }
}
const desconfirmarAsistencia = async (req,res) => {
    try{
        let { event , user } = req.body
        let record = await db.pool.query('DELETE FROM "AsistentesEvento" WHERE "ID_usuario"= '+user+' and "ID_evento"= '+event+' ')
        res.json({
            status: 'success',
            message: 'asistencia desconfirmada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: error
        })
    }
}
const consultarAsistenciaUsuarioEvento = async (req,res) => {
    try{
        let { event , user } = req.body
        let record = await db.pool.query('SELECT "Confirmacion" FROM "AsistentesEvento" WHERE "ID_usuario"= '+user+' and "ID_evento"= '+event+' ')
        res.json({
            status: 'success',
            data: record.rows
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: error
        })
    }
}

module.exports={
    tiposEvento,
    gruposDeUsuario,
    crearEvento,
    listarEventos,
    listarEventosByHour,
    verEvento,
    confirmarAsistencia,
    desconfirmarAsistencia,
    consultarAsistenciaUsuarioEvento,
    listarEventosByType,
    listarEventosByGroup,
    listarEventosByLocation
}
