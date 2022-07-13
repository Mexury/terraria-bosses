import mongoose from "mongoose"
const { Schema } = mongoose

const BossSchema = new Schema({
    name: String,
    type: String,
    phase: String,
    finished: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.models.Boss || mongoose.model("Boss", BossSchema)