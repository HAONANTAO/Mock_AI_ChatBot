import mongoose from "mongoose";
import { randomUUID } from "crypto";
// chatSchema
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
// userSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // 一个array包含chatSchema
    chats: [chatSchema],
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
//# sourceMappingURL=User.js.map