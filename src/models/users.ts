import mongoose  from "mongoose";

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Users', usersSchema);