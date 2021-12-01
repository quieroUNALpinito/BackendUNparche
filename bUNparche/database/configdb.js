const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '2778995',
		database: 'bd_UNparche'
	}
});


module.exports = {
	db
}


