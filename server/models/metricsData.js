// const { Pool, Client} = require('pg');  



// const PG_URI = 'postgres://zoszwsct:oEVljts38HRlyeNlJQ-u-5o3jdfQsvZN@suleiman.db.elephantsql.com:5432/zoszwsct'; 

// const pool = new Pool({
//         PG_URI,
//   });

// pool.query('SELECT NOW()', (err, res) => {
//       console.log(err, res)
//       pool.end()
//   }); 
  
// const client = new Client({
//             PG_URI,
//   })
//   client.connect()

//   client.query('SELECT NOW()', (err, res) => {
//       console.log(err, res)
//       client.end()
//   })
  




const { Pool, Client} = require('pg');  
const pgUrl =  'postgres://zoszwsct:3VvqfB9_GFyMZULPbXOAW3pjXt8aqVFF@suleiman.db.elephantsql.com:5432/zoszwsct'
const client = new Client(pgUrl) ; 

async function connect(client) {
    try {
        await client.connect()
        console.log('Client Connected ')

        const {rows} = await client.query('SELECT * FROM topics_data')
        console.table(rows)
        await client.end()

    }
    catch(ex){
        console.log('Some error' + ex)
    }
    finally {
        await client.end()
    }
}

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };

connect(client)