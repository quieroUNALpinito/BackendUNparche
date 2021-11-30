const db = require('../database/config')

const tiposEvento = async (req,res) => {
    try{
        let records = await db.pool.query(' select * from "TipoEvento"')
        console.log(records.rows)
        res.json({
            message: 'paranga',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}
const crearEvento = async (req,res) => {
    try {
        let { asunto, descripcion, tipoEvento} = req.body
        let records = await db.pool.query(`INSERT INTO "Evento" ( "Nombre", "Descripcion",  "ID_TipoEvento" )`+
        `VALUES( '`+asunto+`', '`+descripcion+`', '`+tipoEvento.ID+`' )`)
        res.json({
            message: 'exito'
        })
    } catch (error) {
        console.log(error)
    }
}
const listarEventos = async (req,res) => {
    try{
        let records = await db.pool.query(' select * from "Evento" order by "Fecha"')
        console.log(records.rows)
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
        let records = await db.pool.query(' select * from "Evento" where "Hora" between \''+inicio+'\' and \''+fin+'\' order by "Fecha"')
        console.log(records.rows)
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
    listarEventosByHour
}