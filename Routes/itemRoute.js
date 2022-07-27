const express = require("express");
const router = express.Router();
const itemLogic = require("../BL/itemLogic");
const { auth, admin } = require("../middleware/auth")


router.get("/", async (req, res) => {
    try {
        const items = await itemLogic.getAllItems();
        res.send(items);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "something wrong :( ..." })

    }
})
router.post("/addItem", admin, async (req, res) => {
    try {
        console.log(req.body);
        console.log("123");
        res.send(await itemLogic.newItem(req.body));
    } catch (error) {
        res.status(error.code || 400).send({ message: error.message });
    }
});
router.put("/delItem", admin, async (req, res) => {
    try {
        res.send(await itemLogic.delItem(req.body))
    }
    catch (error) {
        res.status(error.code || 400).send({ message: error.message });
    }
})

// router.get("/:category", async (req, res) => {
//     const { category } = req.params
//     res.send(await itemLogic.getItemByCategory(category))
// });

router.get("/category", async (req, res) => {
    try {
        console.log(req.query);
        res.send(await itemLogic.getItemByCategory(req.query.category))
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "something wrong :( ..." })
    }
});
router.get("/id/:id", async (req, res) => {
    const { id } = req.params
    res.send(await itemLogic.getItemById(id))
});

router.get("/id", async (req, res) => {
    try {
        console.log(req.query);
        res.send(await itemLogic.getItemById(req.query.id))
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "something wrong :( ..." })
    }
});


module.exports = router;
