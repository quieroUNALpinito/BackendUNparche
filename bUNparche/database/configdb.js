const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'w1l1n6p',
		database: 'bd_UNparche'
	}
});


module.exports = {
	db
}


