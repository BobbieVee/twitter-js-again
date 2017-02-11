const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const bodyParser = require('body-parser');
const client = require('../db/index');



router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  client.query('SELECT * FROM tweets INNER JOIN users ON users.id = tweets.user_id',  (err, result)=> {
	  if (err) return next(err); // pass errors to Express
	  var tweets = result.rows;
	  res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
});

router.get('/users/:id', (req, res, next) => {
  const id = req.params.id;
  client.query('SELECT * FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE users.id = $1', [id], (err, result)=> {
  	if (err) return next(err);
  	const tweets = result.rows;
    res.render( 'index', { tweets: tweets, name: tweets[0].name, userId: tweets[0].user_id, showForm: true, showName: true} );
  });
});

router.get('/tweets/:id', (req, res, next) => {
	client.query('SELECT content, name, tweets.id, tweets.user_id FROM tweets INNER JOIN users ON users.id = tweets.user_id WHERE tweets.id = $1', [req.params.id * 1], (err, result) => {
		if (err) return next(err);
		res.render('index', {tweets: result.rows });
	});
});

router.post('/users/:id', (req, res, next) => {
	client.query('INSERT INTO tweets (user_id, content) VALUES ($1,$2)', [req.params.id, req.body.text], (err,result) => {
		if (err) return next(err);
		res.redirect('/');
	});	
});

module.exports = router;