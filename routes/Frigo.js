const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const Frigo = require('../models/FrigoModel');

router.use(bodyParser.json());


// get all frigo
router.get('/', (req, res) => {

})

// get a single frigo
router.get('/:id', (req, res) => {
    Frigo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    link: `http://34.168.108.149:3002/menu.html?id=${req.params.frigoId}`,
                });
            } else {
                res.status(500).send({
                    link: `http://34.168.108.149:3002/menu.html?id=${req.params.frigoId}`,
                });
            }
        } else {
            res.send(data);
        }
    });
})

// create a frigo
router.post('/:id', (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Frigo
    const frigo = new Frigo({
        id: req.params.id,
        name: req.body.name
    });

    // Save Frigo in the database
    Frigo.create(frigo, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Frigo.',
            });
        } else {
            res.json({ link: `http://34.168.108.149:3002/product.html?id=${data.id}` });
        }
    });

})

// update a frigo
router.put('/:id', (req, res) => {
    res.send(`Update frigo with id: ${req.params.id}`);
})

// delete a frigo
router.delete('/:id', (req, res) => {
    Frigo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    link: 'http://34.168.108.149:3002/menu.html?statut=fail',
                });
            } else {
                res.status(500).send({
                    link: 'http://34.168.108.149:3002/menu.html?statut=fail',
                });
            }
        } else {
            res.send({ link: 'http://34.168.108.149:3002/menu.html?statut=success' });
        }
    });
})


module.exports = router;