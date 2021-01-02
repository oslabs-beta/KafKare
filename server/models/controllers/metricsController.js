const db = require('../metricsData'); 
//insert users into the users table
const users =   `INSTERT INTO  users(name, email, topic) VALUES($1, $2, $3)`
const usersValues = [name, email, topic]; 

try {
    const res = await client.query(users, usersValues)
    console.log(res.rows[0])
} catch (err) {
    console.log(err.stack)
}; 

const userMetrics = `INSERT INTO usermetrics (userNAme,
userId, 
userCPU , 
userMem , 
consumerLag,
messages,
numOfBrokers, 
systemHealth ) VALUES (
    $1, $2 ,$3 ,$4, $5, $6 ,$7 ,$8  
)`
const userMetricsValues = ['userId', 
   ' userCPU' , 
   ' userMem' , 
   ' consumerLag',
    'messages',
    'numOfBrokers', 
   ' systemHealth'];

   try {
       const res = await.client.quey(userMetrics, userMetricsValues)
       console.log(res.rows[0])
   } catch(err) {
       console.log(err)
   }


//insert data into the dashboard metrics
const dashBoardMetrics = `INSERT INTO Metrics (Date, cpu, iowait, idle) VALUES($1, $2 ,$3 ,$4 )`
const dashBoardValues  = ['Date', 'cpu', 'iowait', 'idle'];

try {
    const res = client.query(dashBoardMetrics, dashBoardValues)
    console.log(res.rows[0])
} catch (err) {
    console.log(err.stack)
};

//insert data into the the topics_data table
const topic = `INSERT INTO topics_data (id, topic, date) VALUES($1, $2, $3)`
const topicValues = ['id', 'topic', 'date ']; 

try {
    const res = client.query(topic, topicValues)
    console.log(res.rows[0])
} catch (err) {
    console.log(err.stack)
};




