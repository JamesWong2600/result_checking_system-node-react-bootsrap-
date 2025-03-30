const express = require('express');
const app = express()
const mysql = require('mysql2/promise');

const config = {
    user: 'james',
    host: '192.168.0.88',
    database: 'test',
    port: 3306,
   // options: {
    //    encrypt: true,
    //    trustServerCertificate: true
   // }
};


app.get("/api", async (req, res) => {
    let connection;
    try{
        connection = await mysql.createConnection(config);
        let [rows] = await connection.execute('SELECT player, point FROM datafile ORDER BY point DESC LIMIT 10');
        //rows = JSON.stringify(rows);
        //rows = rows.replace('[','').replace(']','');
        //rows = rows.replace('','');
        console.log(rows);
        res.json({'results': rows});
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    } finally {
        await connection.end();
    }
});

app.listen(5000, () => {console.log("Server is running on port 5000")})