//Un pool es un conjunto de conexiones que yo puedo comenzar a utilizar a medidas que se hacen peticiones al server
const {Pool} = require('pg')
//Aqui  configuro todo lo de la bd
const pool = new Pool({
    //En donde esta mi server de postgres
    host: 'localhost',
    user: 'postgres',
    password: process.env.PASS_BD,
    database: process.env.NAME_BD,
    port: process.env_PORT_BD
})

const getUsers = async (req, res) =>{
    console.log('hola')
    const response = await pool.query('SELECT * FROM "Usuario"');
    console.log(response.rows)

    res.send(response)
}



module.exports = {
    getUsers,
    pool
}
