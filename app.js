const express = require('express');
const app = express();
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const router = require('./routes');
const noCache = process.env.NOCACHE || false;

console.log('noCache  = ', noCache)

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: noCache});

app.use(volleyball);
app.use('/', router);


const port =  process.env.PORT || 3000



app.listen(port, () => console.log(chalk.green(`\n*** Server is listening on port ${port} *** \n`)));