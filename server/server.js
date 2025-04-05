const express = require('express');
const app = express()
const cors = require('cors');
const mysql = require('mysql2/promise');
//const sqlite3 = require('sqlite3').verbose();
const Database = require('better-sqlite3');
const NodeCache = require('node-cache');
//const db = new sqlite3.Database('./database.sqlite');
const db = new Database('database.sqlite');

const cache = new NodeCache({ stdTTL: 600 });

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

let api_token = "qezx1234tgyh"


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

db.pragma('foreign_keys = ON');

// Create tables
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        uuid TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

//createTables();

app.get("/api", async (req, res) => {
    let connection;
    //const { username, email, password, password_confirm, players_uuid, api_code} = req.body;
    try{
        players_uuid = cache.get("uuidKey");
        connection = await mysql.createConnection(config);
        //let [rows] = await connection.execute('SELECT player, point FROM datafile ORDER BY point DESC LIMIT 60');
        let [rows] = await connection.execute(`SELECT player, point FROM datafile WHERE uuid = '${players_uuid}'`);
        //rows = JSON.stringify(rows);
        //rows = rows.replace('[','').replace(']','');
        //rows = rows.replace('','');
        //console.log(rows);
        //console.log("uuid ="+players_uuid);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json({'results': rows});
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    } finally {
        await connection.end();
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if ( !username || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try{
    const row = db.prepare(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`).get();
    console.log(row.uuid);
    cache.set("uuidKey", row.uuid);
    return res.status(200).json({ 
        message: 'Login successful'
    });
    } catch (err) {
        res.json({ message: 'User not found' });
    }
});

app.post('/logout', async (req, res) => {
    cache.del("uuidKey");
    res.json({ message: 'Logout successful' });
});

app.post('/register', (req, res) => {
        const { username, email, password, password_confirm, players_uuid, api_code} = req.body;
        
        // Basic validation
        if (!username || !email || !password || !password_confirm ||!players_uuid || !api_code) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        if (password !== password_confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (api_code !== api_token) {
            return res.status(400).json({ message: 'Invalid API code' });
        }

        try{
            db.prepare(`INSERT INTO users (username, email, uuid, password) VALUES ('${username}', '${email}@gmail.com','${players_uuid}', '${password}')`).run();
            //console.log("id ="+players_uuid);
            cache.set("uuidKey", players_uuid);
            return res.status(200).json({ 
                message: 'Registration successful',
            });
        } catch (err) {
            return res.status(400).json({ 
                error: err.message.includes('UNIQUE') ? 
                    'Username or email already exists' : 
                    'Registration failed' 
            });
        }

       
});


app.listen(5000, () => {console.log("Server is running on port 5000")})