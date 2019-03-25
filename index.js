// implement your API here
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json())



server.get('/', (req, res) => {
    res.send("it works")
})



server.post('/api/users', (req, res) => {

    const userInfo = req.body;

    db.users
    .add(userInfo)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ message: 'error creating users' })
    })
})



server.listen(4000, () => {
    console.log('\n *** server running on http://localhost4000 &&&\n')
});
