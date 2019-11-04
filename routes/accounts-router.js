const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .select('*')
    .from('accounts')
    .then(accounts => {
      console.log('You got me.');
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ err: 'An error prevented your request.' });
    });
});

router.get('/:id', (req, res) => {
  db
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({ err: 'An error prevented your requested account\'s retrieval.' });
    });
});

router.post('/', (req, res) => {
  db
    .insert(req.body, 'id')
    .into('accounts')
    .then(ids => {
      res.status(201).json(`Your account, ${ids}, was successfully added to the database.`);
    })
    .catch(err => {
      res.status(500).json({ err: 'An error prevented your new insert account into database.' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(`${count} account was successfully updated.`);
    })
    .catch(err => {
      res.status(500).json({ err: 'An error prevented the specified account from being updated.' });
    });
});

router.delete('/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .delete()
    .then(count => {
      res.status(200).json(`${count} account was successfully closed.`);
    })
    .catch(err => {
      res.status(500).json({ err: 'An error prevented the specified account from being closed.' })
    })
})

module.exports = router;