const express = require('express');
const app = express();
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: process.env.NOCACHE});

app.use(volleyball);
app.use('/', routes);






app.listen(3000, () => console.log(chalk.green(`\n*** Server is listening on port ${process.env.PORT} *** \n`)));