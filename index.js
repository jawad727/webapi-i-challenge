// implement your API here
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json())



server.post('/api/users', (req, res) => {

    const userInfo = req.body;
    
    db
    .insert(userInfo)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ message: 'error creating users' })
    })
    
})



server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting users'});
    });
});




server.get('/api/users/:id', (req, res) => {

    const id = req.params.id

    db
    .findById(id)

    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting users by id'});
    });
});



server.delete('/api/users/:id', (req, res) => {

    const id = req.params.id

    db 
    .remove(id)

    .then(users => {
        res.status(204).end();
    })
    .catch(error => {
        res.status(500).json({ message: 'Error deleting users by id'});
    });
})



server.put('/api/users/:id', (req, res) => {

    const id = req.params.id
    const changes = req.body

    db 
    .update(id, changes)

    .then(updated => {
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: "user not found" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Error updating users by id'});
    });
})



server.listen(4000, () => {
    console.log('\n *** server running on http://localhost4000 &&&\n')
});
