// const fileLogic = require("../BL/fileLogic");
// const express = require("express")
// const router = express.Router();
// const multer = require("multer"),
//     upload = multer()

// router.post("/file", upload.single('MyFile'), async (req, res) => {
//     try {
//         fileLogic.saveFile(req.file)
//         console.log(req.file);
//         res.send("ok");
//     } catch (error) {
//         res.status(error.code || 400).send({ message: error.message });
//     }
// });

// module.exports = router;


const fileLogic = require("../BL/fileLogic");

const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();


router.post('/upload', upload.single('fileName'), async (req, res) => {
    try {
        fileLogic.saveFile(req.file)
        // console.log(req.file.buffer);
        res.send("ok");
    } catch {
        res.status(400).json("error");
    }
})

router.post("/creat/:filename", (req, res) => {
    try {
        res.send(fileLogic.create(req.params.filename))
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message })

    }
});

router.get("/read/:filename", (req, res) => {
    try {
        res.send(fileLogic.read(req.params.filename))
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message })

    }
});

router.put("/uptade/:filename", (req, res) => {
    try {
        res.send(fileLogic.uptade(req.params.filename, req.body.text))
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message })

    }
});

router.delete("/delete/:filename", (req, res) => {
    try {
        res.send(fileLogic.deleteFile(req.params.filename))
    } catch (error) {
        res.status(error.code || 500).send({ message: error.message })

    }
});

module.exports = router;