const userLogic = require('../BL/userLogic')
const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")

// router.use(auth)

router.all("/test", (req, res) => {
    res.send("test")
})

router.post("/login", async (req, res) => {
    try {
        const login = await userLogic.login(req.body.email, req.body.password)
        res.send(login)
        console.log(login);

    } catch (error) {
        console.log(error.message);
        res.status(error.code || 500).send({ message: error.message || "something wrong :( ..." })
    }
})

router.post("/register", async (req, res) => {
    try {
        const newUser = await userLogic.register(req.body)
        console.log(newUser, "new User");
        res.send(newUser)

    } catch (error) {
        console.log(error.message);
        res.status(error.code || 500).send({ message: "something wrong :( ..." })
    }
})




router.get("/", (req, res) => {
    res.send("users");
});

router.get('/allUsers', async (req, res) => {
    console.log(req.query);
    const users = await userLogic.getAllUsers()
    res.send(users)
})

// router.post('/addUser', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;
//         const newUser = { firstName, lastName, email, password }
//         const user = await userLogic.createUser(newUser)
//         res.send(user)
//     }
//     catch (error) {
//         console.log(error.message);
//         res.status(error.code || 500).send({ message: "something wrong :( ..." })
//     }
// })

router.put('/edit_user/:id', async (req, res) => {
    const user = await userLogic.updateUser(req.params.id, req.body)

    res.send(user)
})


module.exports = router