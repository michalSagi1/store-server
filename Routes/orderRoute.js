const express = require("express");
const router = express.Router();
const orderLogic = require("../BL/orderLogic");

router.get("/", (req, res) => {
    res.send("orders");
});

router.post("/newOrder", async (req, res) => {
    try {
        const { user, cart } = req.body;
        const order = { user, cart }
        const newOrder = await orderLogic.newOrder(order)
        res.send(newOrder);
    }
    catch (error) {
        console.log(error.message);
        res.status(error.code || 500).send({ message: "something wrong :( ..." })
    }
});
router.get("/id/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const orderById = await orderLogic.getOrderById(req.params.id)
        res.send(orderById)
    }
    catch (error) {
        console.log(error.message);
        res.status(error.code || 500).send({ message: "something wrong :( ..." })
    }

});

router.get("/:email", async (req, res) => {
    try {
        console.log(req.params.email);
        const orderByUser = await orderLogic.getOrderByUserMail(req.params.email)
        res.send(orderByUser);
    }
    catch (error) {
        console.log(error.message);
        res.status(error.code || 500).send({ message: "something wrong :( ..." })
    }
});


module.exports = router;
