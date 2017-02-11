const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const bodyParser = require('body-parser');
const client = require('../db/index');



router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  client.query('SELECT * FROM tweets', function (err, result) {
	  if (err) return next(err); // pass errors to Express
	  var tweets = result.rows;
	  res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
});

router.get('/users/:name', (req, res) => {
  const name = req.params.name;
  let list = tweetBank.find( {name: name} );
  console.log('name = ', name)
  res.render( 'index', { tweets: list, name: name, showForm: true, showName: true} );
});

router.get('/tweets/:id', (req, res) => {
	const id = req.params.id * 1;
	let tweet = tweetBank.find({id: id});
	res.render('index', {tweets: tweet});
});

router.post('/tweets', (req, res) => {
	const name = req.body.name;
	const content = req.body.text;
	const id = tweetBank.add(name, content);
	//res.redirect('/tweets/' + id);
	res.redirect('/');
});

module.exports = router;