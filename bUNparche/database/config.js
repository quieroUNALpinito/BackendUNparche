//Un pool es un conjunto de conexiones que yo puedo comenzar a utilizar a medidas que se hacen peticiones al server
const {Pool} = require('pg')
//const {Sequelize} = require('sequelize') //Este es el ORM que vamos a utilizar para que nos quede mas sencillo consultar la BD
//const Usuario  = require('../models/Usuario')

//Creamos la configuracion para la conexion de BD
/*const db = new Sequelize( 
    'bd_UNparche',//nombre de la bd
    'postgres',//nombre del usuario
    process.env.PASS_BD,//password
    //configuraciones
    {
        host: 'localhost',
        //dialecto indica con que base de datos vamos a manejar como hay tantas como mysql maria bd etc
        dialect: 'postgres',
        //logging:false //Para que no llene la consola de mensajes
    }
)*/
//console.log('holi', sequelize)


//Aqui  configuro todo lo de la bd
const pool = new Pool({
    //En donde esta mi server de postgres
    host: 'localhost',
    user: 'postgres',
    password: process.env.PASS_BD,
    database: 'bd_UNparche',
    port: '5432'
})

const getUsers = async (req, res) =>{
    console.log('hola')
    response = await pool.query('select * from "Usuario"') 
    
    //console.log(response.rows)
    

    res.json(response.rows)
}



module.exports = {
    pool,
    getUsers
}
