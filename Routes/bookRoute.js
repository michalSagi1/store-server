const bookLogic = require('../BL/bookLogic')
const express = require('express');
const router = express.Router();

router.post('/newbook', async (req, res) => {

    try {
        const newBook = await bookLogic.addBook(req.body);
        console.log(req.body);
        res.send(newBook);



    } catch (error) {
        console.log(error.message);
        res.status(500).send("sorry, something went wrong");
    }

})


router.get('/book', async (req, res) => {

    try {
        const newBook = await bookLogic.getbook()
        res.send(newBook);



    } catch (error) {
        console.log(error.message);
        res.status(500).send([]);
    }

})
module.exports = router;