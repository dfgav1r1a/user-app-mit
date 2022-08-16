import express from 'express';
import { Low, JSONFile } from 'lowdb';
import bodyParser from 'body-parser';
const cors = require('cors');
const app = express();
app.use(express.json());
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();

//serving static files
app.use(express.static('public'));

//allowing cross-origin
app.use(cors());

//modification for Heroku
let port = process.env.PORT || 3000;

//init data store
db.data ||= {users:[]};
const {users} = db.data;

//body-parser to post data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//path to get users
app.get('/data', (req, res) => {
    res.send(users);
});

//path to post to the server
app.post('/test', (req, res) => {
    console.log(req.body.username, req.body.password);
    res.send(`${req.body.username} ${req.body.password}`);
})

//path to post rich user data
app.post('/add-user', async (req, res) => {
    const user = {
        'name' : req.body.name,
        'dob' : req.body.dob,
        'email' : req.body.email,
        'username' : req.body.username,
        'password' : req.body.password,
        'phone' : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip' : req.body.citystatezip,
        'avatar' : req.body.avatar
    };
    users.push(user);
    await db.write();
    console.log(users);
    res.send(user);
});

//init server
app.listen(port, () => {
    console.log(`Server running in ${port}`);
});

