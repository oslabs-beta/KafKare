const db = require('../metricsData'); 

const text =   `INSTERT INTO  users(name, email, topic) VALUES($1, $2, $3)`
const values = [name, email, topic]; 

try {
    const res = await client.query(text, values)
    console.log(res.rows[0])
} catch (err) {
    console.log(err.stack)
}; 

const dashBoardMetrics = `INSERT INTO Metrics (Date, cpu, iowait, idle) VALUES($1, $2 ,$3 ,$4 )`
const dashBoardValues  = ['Date', 'cpu', 'iowait', 'idle'];

try {
    const res = client.query(dashBoardMetrics, dashBoardValues)
    console.log(res.rows)
} catch (err) {
    console.log(err.stack)
}