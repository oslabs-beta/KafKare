const {  Pool, Client } = require('pg'); 

const PG_URI = 'postgres://zoszwsct:oEVljts38HRlyeNlJQ-u-5o3jdfQsvZN@suleiman.db.elephantsql.com:5432/zoszwsct'; 

// create a new pool object, pointing to the the elephant sql database 
const pool = new Pool({
        user: 'zoszwsct',
        host: 'suleiman.db.elephantsql.com',
        database: 'zoszwsct',
        password: '3VvqfB9_GFyMZULPbXOAW3pjXt8aqVFF',
        port: 5432
  });

//error handler for the pool, will be fired is there are any errors from the pool
  pool.on('error', (err,client) =>{
    console.log('Error:', err)
  })

//test query to check that the db is connected to the kafkare project // run node metricsData.js 
  const query = `
  SELECT *
  FROM users
  `;

  pool.connect((err, client, done) => {
      if(err) throw err; 
      client.query(query, (err,res) => {
        done(); 
        if(err) {
          console.log(err.stack);
        } else {
          for(let row of res.rows){
            console.log(row); 
          }
        }
      }); 
}); 

  
  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
//
