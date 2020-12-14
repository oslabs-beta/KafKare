const { pool } = require('pg');

const URI = process.env.PG_URI || myURI; 

const pool = new pool({
    connectionString: PG_URI
})