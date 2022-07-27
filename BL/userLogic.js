const userController = require('../DL/controllers/userConsroller');
const { admin } = require('../middleware/auth');
const { createToken } = require("./jwt")


let user1 = [{
    firstName: 'Ori',
    lastName: 'David',
    email: "adi@gmail.com",
    password: "12345",
    // phone: 52512343,
    address: {
        street: "Gad",
        homeNumber: 12,
        city: "Jerusalem",
    },
    gender: 'female'
}]

exports.getAllUsers = async () => {
    return await userController.read({})
}

// exports.createUser = async (newUser) => {
//     if (!newUser.firstName || !newUser.email || !newUser.password) {
//         throw ({ code: 400, message: "Error - name/email/password" })
//     }
//     const email = await userController.readOne({ email: newUser.email });
//     if (email) {
//         throw ({ code: 400, message: "Error - email exist in system" })
//     }
//     return await userController.create(newUser)
// }

exports.register = async (newUser) => {
    if (!newUser.firstName || !newUser.email || !newUser.password) {
        throw ({ code: 400, message: "Error - name/email/password" })
    }
    const email = await userController.readOne({ email: newUser.email });
    if (email) {
        throw ({ code: 400, message: "Error - email exist in system" })
    }
    const user = await userController.create(newUser);
    return { ...newUser, token: createToken(newUser._id), admin: (user.admin) };
}

exports.login = async (email, password) => {
    if (!email || !password) throw ({ code: 400, message: "missing data" })
    const user = await userController.readOne({ email }, "+password");
    if (!user) {
        throw ({ code: 400, message: "Error - email" })
    }
    if (password !== user.password) {
        throw ({ code: 503, message: "Error - password" })
    }
    console.log(user)
    return { token: createToken(user._id), admin: (user.admin) }

}

exports.updateUser = async (id, newField) => {
    return await userController.update({ _id: id }, newField)

}



//הקריאות לפונקציות:

// userController.create(user1)

// read({
//     // "address.homeNumber": { $lt: 10 }
//     email: "michal@gmail.com"
// });


// update({ email: 'michal@gmail.com' }, { password: '00000' });


// del({ email: 'michal@gmail.com' });