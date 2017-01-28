const express = require('express');
const app = express();
const chalk = require('chalk');
const volleyball = require('volleyball');

app.use(volleyball);

// app.use(function (req, res, next) {
//   console.log(req.method,req.originalUrl);
//   next();
// })
	

app.get('/', (req, res, next) => {
	res.send('hello world!');
	next();
});

app.get('/news', (req, res, next) => {
	console.log('newsy');
	res.send('hello NEWS!');
	next();
});




app.listen(3000, () => console.log(chalk.green(`\n*** Server is listening on port ${process.env.PORT} *** \n`)));