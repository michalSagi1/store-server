// require('../db').connect();

const { orderModel } = require('../models/order')

async function create(data) {
    const res = await orderModel.create(data);
    return (res);

}

async function read(filter) {
    const res = await orderModel.find(filter)
    return (res);
}

async function readOne(filter) {
    const res = await orderModel.findOne(filter)
    return (res);
}

async function update(filter, newData) {
    const res = await orderModel.updateOne(filter, newData)
    return (res);
}
async function del(filter) {
    return await update(filter, { isStock: false })

}

module.exports = { create, read, readOne, update, del }


