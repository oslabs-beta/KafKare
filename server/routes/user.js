const db = require('../db/db');
const express = require('express');
const router = express.Router();
router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;
  const insertUsers = `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`;
  const signupValue = [name, email, password];
  db.query(insertUsers, signupValue)
    .then((data) => {
      console.log('user data is', data.rows);
    })
    .then(res.json('successfully sign up'))
    .catch((error) => {
      next({
        log: `ERROR: Error creating new user:${error}.`,
        message: {
          err: 'Error occurred in /signup. Check server logs for more details.',
        },
      });
    });
});
module.exports = router;
