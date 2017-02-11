const pg = require("pg");
const db_url = process.env.DATABASE_URL || "postgres://localhost/twitterdb";
const client = new pg.Client(db_url);


client.connect((err) => {
	if (err) {
		console.log('connect failed');
		throw err;
	}
	console.log(`connected to db: ${db_url}`);
	


});

// client.query(())

module.exports = client;