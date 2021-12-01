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
        let { nombre, descripcion, oficial, categoriaGrupo} = req.body
        let sqlIns = `INSERT INTO "Grupo" ("ID_CategoriaGrupo", "Nombre", "Descripcion", "Oficial")`+
            `VALUES ( `+categoriaGrupo+`, '`+ nombre+`', '`+descripcion+`', '`+oficial+`');`
        let records = await db.pool.query(sqlIns)
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
module.exports={
    crearGrupo,
    grCategoriasGet
}

