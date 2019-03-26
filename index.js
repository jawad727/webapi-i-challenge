// implement your API here
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json())



server.post('/api/users', (req, res) => {

            const userInfo = req.body;

            if (userInfo.name && userInfo.bio) {

                db
                    .insert(userInfo)
                    .then(user => {

                        res.status(201).json(user);

                    })
                    .catch(error => {
                        res.status(500).json({
                            error: "There was an error while saving the user to the database"
                        })

                    })
            } else {
                res.status(400).json({
                        errorMessage: "Please provide name and bio for the user."
                    })
                }
            })



        server.get('/api/users', (req, res) => {
            db
                .find()
                .then(users => {

                    res.status(200).json(users)
                })
                .catch(error => {
                    res.status(500).json({
                        error: "The users information could not be retrieved."
                    });
                });
        });


        //--------------------------------------------------------------------------


        server.get('/api/users/:id', (req, res) => {

            const id = req.params.id

            db
                .findById(id)

                .then(users => {
                    res.status(200).json(users)
                })
                .catch(error => {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    });
                });
        });



        server.delete('/api/users/:id', (req, res) => {

            const id = req.params.id

            db
                .remove(id)

                .then(users => {

                    if (users) {
                        res.status(204).end();
                    } else {
                        res.status(404).json({
                            message: "The user with the specified ID does not exist."
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        error: "The user could not be removed"
                    });
                });
        })



        server.put('/api/users/:id', (req, res) => {

            const id = req.params.id
            const changes = req.body


            if (changes.name && changes.bio) {


            db
                .update(id, changes)

                .then(updated => {
                    if (updated) {
                        res.status(200).json(updated);
                    } else {
                        res.status(404).json({
                            message: "The user with the specified ID does not exist."
                        })
                    }

                })

                .catch(error => {
                    res.status(500).json({
                        error: "The user information could not be modified."
                    });
                })
            }
                else {
                    res.status(400).json({
                        errorMessage: "Please provide name and bio for the user."
                    })
                }
        })




        server.listen(4000, () => {
            console.log('\n *** server running on http://localhost4000 &&&\n')
        });