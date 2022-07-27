// require('../db').connect();

const { itemModel } = require('../models/item')

async function create(data) {
    const res = await itemModel.create(data);
    return (res);

}

async function read(filter) {
    const res = await itemModel.find(filter)
    return (res);
}

async function readOne(filter) {
    const res = await itemModel.findOne(filter)
    return (res);
}

async function update(filter, newData) {
    const res = await itemModel.updateOne(filter, newData)
    return (res);
}
async function del(filter) {
    return await update(filter, { isStock: false })

}

module.exports = { create, read, readOne, update, del }


