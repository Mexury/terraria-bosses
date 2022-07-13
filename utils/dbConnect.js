import mongoose from "mongoose"

const conn = {}

const dbConnect = async () => {
    if (conn.isConnected) return

    const db = await mongoose.connect("mongodb+srv://admin:RFUrKA2U6ALhHGuW@bosses.socosl6.mongodb.net/?retryWrites=true&w=majority", {
        dbName: "TerrariaBosses",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    conn.isConnected = db.connections[0].readyState
    if (conn.isConnected) {
        console.log("Database connected!");
    }
}

export default dbConnect