const express = require('express');
const router = express.Router();

// get all list
router.get('/', (req, res) => {
    res.json({text: 'hey'});
})

// get a single list
router.get('/:id', (req, res) =>{
    res.send(`Get frigo with id: ${req.params.id}`);
})

// create a list
router.post('/:id', (req, res) =>{
    res.send('Create a new list');
})

// update a list
router.put('/:id', (req, res) => {
    res.send(`Update frigo with id: ${req.params.id}`);
})

// delete a list
router.delete('/:id', (req, res) =>{
    res.send(`Delete frigo with id: ${req.params.id}`);
})


module.exports = router;