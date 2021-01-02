const { Pool, Client} = require('pg');  
const pgUrl =  'postgres://zoszwsct:3VvqfB9_GFyMZULPbXOAW3pjXt8aqVFF@suleiman.db.elephantsql.com:5432/zoszwsct'
const client = new Client(pgUrl) ; 

async function connect(client) {
    try {
        await client.connect()
        console.log('Client Connected ')

        const {rows} = await client.query('SELECT * FROM Metrics')
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