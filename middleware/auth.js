const { validateToken } = require("../BL/jwt")
const userController = require('../DL/controllers/userConsroller');


async function auth(req, res, next) {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token);
        const decode = validateToken(token)
        console.log(decode);
        const user = await userController.readOne({ _id: decode.id })
        if (!user) throw ({ code: 503, message: "not auth" })
        next()

    } catch (error) {
        res.status(503).send({ message: "not auth" })
    }
}
async function admin(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = validateToken(token)
        const user = await userController.readOne({ _id: decode.id })
        if (!user.admin) throw ({ code: 503, message: "not admin" })
        next()

    } catch (error) {
        res.status(503).send({ message: "not admin" })
    }
}
module.exports = { auth, admin } 