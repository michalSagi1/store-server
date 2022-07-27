// require('../db').connect();

const { userModel } = require('../models/user')

async function create(data) {
    const res = await userModel.create(data);
    return (res);

}

async function read(filter) {
    const res = await userModel.find(filter)
    return (res);
}

async function readOne(filter) {
    const res = await userModel.findOne(filter)
    return (res);
}

async function update(filter, newData) {
    const res = await userModel.updateOne(filter, newData)
    return (res);
}
async function del(filter) {
    return await update(filter, { isActiv: false })

}

module.exports = { create, read, readOne, update, del }


