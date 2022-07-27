
const userController = require('../DL/controllers/userConsroller')
const itemController = require('../DL/controllers/itemController')
const orderController = require('../DL/controllers/orderController')

async function newOrder(order) {
    const user = await userController.readOne({ email: order.user })
    if (!user) { console.log("user not found"); throw ({ code: 400, message: "user not found" }) }
    if (order.cart.length === 0) {
        console.log("ERROR-Shopping cart is empty");
        throw ({ code: 400, message: "Shopping cart is empty" });
    }
    const cart = []
    let total = 0;
    for (i of order.cart) {
        const item = await itemController.readOne({ _id: i.item })
        if (!item || item.inStock < i.qty) { console.log("not in stock"); return false }
        total += i.price * i.qty;
        cart.push({ itemId: item._id, qty: i.qty });

    }
    const saveOrder = await orderController.create({
        userId: user._id,
        items: cart,
        totalPrice: total
    })
    for (i of order.cart) {
        const item = await itemController.readOne({ _id: i.item });
        await itemController.update(
            { _id: i.item },
            { inStock: item.inStock - i.qty }
        );
    }
    console.log("The order success");
    return "success", order;
}


const getOrderById = async (id) => {
    const order = await orderController.read({ _id: id });
    if (order.length === 0 || !order) { throw ({ code: 400, message: "no order in this id" }) }
    return order
};

const getOrderByUserMail = async (_email) => {
    const user = await userController.readOne({ email: _email })
    if (!user) { throw ({ code: 400, message: "no order in this email" }) }
    return await orderController.read({ userId: user._id })
}

module.exports = { getOrderById, newOrder, getOrderByUserMail };


// newOrder({
//     user: 'michal@gmail.com',
//     cart: [{ item: '62ae450b35c3d110a60630d2', qty: 5 }],
//     totalPrice: 100


// })





// let order1 = [{
//     userId: '629f3878bc4a3fc9a6481ca2',

//     items: [{ itemId: '62a63e5ba221e9721b739e9c', qty: 6 }],
//     totalPrice: 100


// }]


//הקריאות לפונקציות:

// create(order1)


// read({
//     _id: '62a83f24e59c4c985976b583'
// })



// update({ id: 123456 }, { price: 3500 });


// del({ price: 320 });