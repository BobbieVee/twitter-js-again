const express = require('express');
const app = express();
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');

// let locals =  {
// 	title: 'An Example',
// 	people: [
// 		{name: 'Gandolf'},
// 		{name: 'Frodo'}, 
// 		{name: 'Hermione'}
// 	]
// };

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: process.env.NOCACHE});

app.use(volleyball);

app.get('/', (req, res, next) => {
	res.render('index', {title: 'Hall of Fame', people: people});
});

app.get('/news', (req, res, next) => {
	console.log('newsy');
	res.send('hello NEWS!');
	next();
});




app.listen(3000, () => console.log(chalk.green(`\n*** Server is listening on port ${process.env.PORT} *** \n`)));