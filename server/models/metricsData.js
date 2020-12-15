const { Pool, Client} = require('pg'); 

const PG_URI = 'postgres://zoszwsct:oEVljts38HRlyeNlJQ-u-5o3jdfQsvZN@suleiman.db.elephantsql.com:5432/zoszwsct'; 

const pool = new Pool({
        PG_URI,
  });


  pool.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
      pool.end()
  }); 
  
  
  const client = new Client({
            PG_URI,
  })
  client.connect()

  client.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
      client.end()
  })
  
  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
//
