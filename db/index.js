const pg = require("pg");
const db_url = process.env.DATABASE_URL || "postgres://localhost/twitterdb";
const client = new pg.Client(db_url);


client.connect((err) => {
	if (err) {
		console.log('connect failed');
		throw err;
	}
	console.log(`connected to db: ${db_url}`);

	const qry = `
		DROP TABLE IF EXISTS tweets;
		DROP TABLE IF EXISTS users;
		CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT DEFAULT NULL, picture_url TEXT);
		CREATE TABLE tweets (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) NOT NULL, content TEXT DEFAULT NULL);
	`;

	client.query(qry, (err, result)=> {
		if (err) throw err;
		console.log('Tables re-Created successfully');
	});
});


module.exports = client;