const fs = require('fs');

function saveFile(file) {
    fs.writeFileSync('./upload/' + file.originalname, file.buffer);
}

const create = (fileName) => {
    if (fs.existsSync(`files/${fileName}.txt`)) {
        throw ({ message: "error - exist" });
    }
    return fs.writeFileSync(`files/${fileName}.txt`, "")
}

const read = (fileName) => {
    if (!fs.existsSync(`files/${fileName}.txt`)) {
        throw ({ message: "error - file not found" });
    }
    return fs.readFileSync(`files/${fileName}.txt`, { encoding: "utf-8" })
}

const uptade = (fileName, text) => {
    if (!fs.existsSync(`files/${fileName}.txt`)) {
        throw ({ message: "error - file not found" });
    }
    return fs.appendFileSync(`files/${fileName}.txt`, `\n ${text}`)

}
const deleteFile = (fileName) => {
    if (!fs.existsSync(`files/${fileName}.txt`)) {
        throw ({ message: "error - file not found" });
    }
    return fs.unlinkSync(`files/${fileName}.txt`)
}

// function valid(req, res, next, fileName) {
//     const { fileName } = req.param.fileName
//     if (isValid(fileName) && isValidExt(fileName)) next()
// }

// function isValid(fileName) {
//     ["/", "*", "|", "'", ":", "?", "<", ">"].find(char => fileName.includes(char) ? false : true)
// }

// function isValidExt(fileName) {
//     let ext = fileName.slice(fileName.lastIndexOf("."))
//     return ["txt", "pdf", "png", "jpg"].find(char => fileName.includes(char) ? false : true)
// }
module.exports = { create, read, uptade, deleteFile, saveFile }