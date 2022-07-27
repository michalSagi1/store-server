// require('../DL/db').connect()
const itemController = require("../DL/controllers/itemController");



const getItemById = async (itemId) => {
    const item = await itemController.readOne({ id: itemId })
    if (item.length === 0) throw ({ code: 400, message: "no items in this id" })
    return item

};

const getItemByCategory = async (cat) => {
    const items = await itemController.read({ category: cat });
    if (items.length === 0) throw ({ code: 400, message: "no items in this category" })
    return items
};

const getAllItems = async () => {
    const items = await itemController.read({ isStock: true });
    if (items.length === 0) throw ({ code: 400, message: "there is no items" })
    return items
}
const newItem = async (item) => {
    console.log(item);
    console.log("******");
    if (!item.name || !item.id || !item.inStock) {
        throw { code: 409, message: "ERROR-name/barcode/inStock is not defined" };
    }
    const items = await itemController.read({ id: item.id });
    if (items.length > 0) {
        throw { code: 409, message: "id exist in system" };
    }

    const newItem = await itemController.create({
        name: item.name,
        // createDate: item.createDate,
        price: item.price,
        id: item.id,
        img: item.img,
        description: item.description,
        category: item.category,
        inStock: item.inStock,
    });

    return newItem;
};
const delItem = async (itemId) => {
    const item = await itemController.del(itemId)
    if (item.length === 0) throw ({ code: 400, message: "no items in this id" })

    return item
}


module.exports = { getAllItems, getItemById, getItemByCategory, newItem, delItem };