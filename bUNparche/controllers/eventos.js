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

module.exports={
    tiposEvento
}