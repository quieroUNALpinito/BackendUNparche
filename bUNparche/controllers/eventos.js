const db = require('../database/config')

const tiposEvento = async (req,res) => {
    try{
        let records = await db.pool.query(' select * from "TipoEvento"')
        res.json({
            message: 'listado de tipos de evento',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}
const crearEvento = async (req,res) => {
    try {
        let { asunto, descripcion, tipoEvento, fecha,  duracion, presencial,  bloficial, lugaroficial, recurrente , nombreubicacion } = req.body
        let sqlIns = ``
        if(presencial){
            if(bloficial){
                sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "LugarOficial", "ID_lugarOficial", "ID_creador", "ID_grupo", "Recurrente" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , '`+bloficial+`' , `+lugaroficial.ID+` , null , null , '`+recurrente+`'  )`
            }else{
                sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "LugarOficial", "NombreUbicacion", "CoordenadasUbicacion", "ID_creador", "ID_grupo", "Recurrente" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , '`+bloficial+`' , '`+nombreubicacion+`' , null , null , null , '`+recurrente+`'  )`
            }
        }else{
            sqlIns = `INSERT INTO "Evento" ( "Nombre", "Descripcion", "ID_TipoEvento", "Hora", "Duracion", "Presencial", "ID_creador", "ID_grupo", "Recurrente" )`+
                `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' , '`+fecha+`' , '`+duracion+`:00:00' , '`+presencial+`' , null , null , '`+recurrente+`'  )`
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
        let records = await db.pool.query(' select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" '+
        ' from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" order by "Hora"::date')
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
        let { inicio, fin } = req.body
        let records = await db.pool.query(' select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" '+
        ' from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where "Hora"::time between \''+inicio+'\' and \''+fin+'\' order by "Hora"::date')
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
        let { edificio } = req.body
        let records = await db.pool.query(' select e."ID" , e."Nombre" , e."Imagen" , e."Hora" , e."Presencial" , e."LugarOficial" , e."NombreUbicacion" , l."Nombre" as "NombreLOficial" , l."Edificio" '+
        ' from "Evento" e left join "Lugar" l on e."ID_lugarOficial" = l."ID" where l."Edificio" = \''+edificio+'\'')
        res.json({
            message: 'Sip sirvio',
            data: records.rows
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    tiposEvento,
    crearEvento,
    listarEventos,
    listarEventosByHour,
    listarEventosByLocation
}
