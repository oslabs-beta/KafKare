/* eslint-disable no-else-return */
const db = require('../db/db');
const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const router = express.Router();
const saltRounds = 10;

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const insertUsers = `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING _id, email, name`;
    const signupValue = [name, email, hash];
    db.query(insertUsers, signupValue)
      .then((data) => {
        const output = data.rows[0];
        console.log('user data is', data.rows);
        return res.json({
          id: output._id,
          name: output.name,
          email: output.email,
          success: true,
        });
      })

      .catch((error) => {
        next({
          log: `ERROR: Error creating new user:${error}.`,
          message: {
            err:
              'Error occurred in /signup. Check server logs for more details.',
          },
        });
      });
  });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = `SELECT * FROM users WHERE email=$1`;
  const userValue = [email];
  const insertJWT = `UPDATE users SET token=$1, tokenexp=$2 WHERE email=$3`;
  const findJWT = `SELECT token, tokenexp from users WHERE email=$1`;
  try {
    const { rows } = await db.query(findUser, userValue);
    console.log(rows);
    if (!rows) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    }
    const isMatch = await bcrypt.compare(password, rows[0].password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: 'Wrong password' });
    } else {
      const token = jwt.sign(rows[0]._id.toString(16), 'secret');
      const oneHour = moment().add(1, 'hour').valueOf();
      const insertToken = [token, oneHour, email];
      await db.query(insertJWT, insertToken);
      res.cookie('w_authExp', rows[0].tokenexp, { httpOnly: true });
      res.cookie('w_auth', rows[0].token, { httpOnly: false });

      return res.status(200).json({
        loginSuccess: true,
        userId: rows[0]._id,
      });
    }
  } catch (err) {
    return res.json({
      loginSuccess: false,
      message: 'Auth failed, email not found',
    });
  }
});

router.get('/auth', (req, res) => {
  console.log('whatscookie', req.cookies.w_auth);
  const token = req.cookies.w_auth;
  const findToken = `SELECT * FROM users WHERE token=$1`;
  const tokenValue = [token];
  db.query(findToken, tokenValue)
    .then((data) => {
      if (!data) {
        return res.json({
          isAuth: false,
          error: true,
        });
      }
      console.log(data.rows[0]);
      return res.status(200).json({
        _id: data.rows[0]._id,
        isAuth: true,
        email: data.rows[0].email,
        name: data.rows[0].name,
      });
    })
    .catch((err) => res.send(err));
});

// deletes a user, returns 1 on success
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE _id = $1`;
  const inputs = [id];

  db.query(query, inputs)
    .then((data) => {
      if (data) {
        return res.json(data.rowCount);
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
