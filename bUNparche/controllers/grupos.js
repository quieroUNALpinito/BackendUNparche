const {db} = require("../database/configdb")

const crearGrupo = async (res,req)=>{
    const {nombre,descripcion,oficial,grCategoria} = req.body;
    if(!nombre || !descripcion || !grCategoria){
        return res.status(400).json('error en la submission del form');
    }

    db.insert({
        Nombre: nombre,
        Descripcion: descripcion,
        Oficial: oficial,
        ID_CategoriaGrupo: grCategoria
    })
    .into('CategoriaGrupo')
	.then(grCat => {
        res.json(grCat[0])
	})
	.catch(err => res.status(400).json('error creando grupo'));
}

const grCategoriasGet = async (res,req)=>{
    db.select('*').from('CategoriaGrupo')
	.then(grCat => {
		if(grCat.length){
			res.json(grCat[0])
		} else {
			res.status(400).json('not found')
		}
	})
	.catch(err => res.status(400).json('error getting grCat'));
}

module.exports = {
    crearGrupo,
    grCategoriasGet
}
