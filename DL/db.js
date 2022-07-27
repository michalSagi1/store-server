const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL

exports.connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true },
            (err) => {
                if (err) { console.log("error:", err); return false; }
                console.log("Connection Success, State:", mongoose.connection.readyState);
            })
    }
    catch (error) {
        console.log("error mongoos:", error);
    }
}
// connect()

// module.exports = connect;