const db = require('../database/config')

const edificiosOficiales = async (req,res) => {
    try{
        let records = await db.pool.query('select distinct on ("Edificio") "Edificio" from "Lugar"')
        res.json({
            message: 'listado de edificios oficiales',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}
const lugarPorEdificio = async (req,res) => {
    try{
        let { edificio } = req.body
        let records = await db.pool.query(`select "ID" , "Nombre" , "Coordenadas" from "Lugar" where "Edificio" = '`+edificio+`' `)
        res.json({
            message: 'listado de lugares por edificio',
            data: records.rows
        })
    }catch (error){
        console.log(error)
    }
}

module.exports={
    edificiosOficiales,
    lugarPorEdificio
}