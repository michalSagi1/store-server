const express = require("express")
const router = express.Router();
const multer = require('multer'),
    upload = multer({ dest: './upload' })


const userRoute = require("./userRoute");
const itemRoute = require("./itemRoute");
const orderRoute = require("./orderRoute");
const fileRoute = require("./fileRoute");



router.use("/users", userRoute);
router.use("/items", itemRoute);
router.use("/orders", orderRoute)
router.use("/files", fileRoute)

module.exports = router;