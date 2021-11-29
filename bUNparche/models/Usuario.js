//Este va ser el esquema para la tabla de usuario
const {DataTypes} = require('sequelize')
const db = require("../database/config")//importamos la conexion



console.log('holi ', db)
//Definimos el modelo de datos de la tabla Usuario, el primer parametro es el nombre del modelo, el segundo parametro es un objeto el que indica que campos tiene la tabla usuario
/*const Usuario = db.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombres:{
        type: DataTypes.STRING
    },
    apellidos:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    foto:{
        type: DataTypes.STRING
    }
})*/
//Como por el momento solo voy a usar la tabla de usuario  aqui tengo que crear las relaciones que tiene la tabla usuario para esto pues tengo que crear los demas modelos (tablas de la bd por lo tanto mas tarde lo hago), revisar el minuto 48 del video de fazt

//module.exports = Usuario