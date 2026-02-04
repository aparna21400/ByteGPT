// Import mongoose
import mongoose from "mongoose";
// Import bcrypt
import bcrypt from "bcrypt";
// Create a User schema
const UserSchema = new mongoose.Schema({
    // Add fields: name, email, password, role (optional)

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    // Add timestamps 
}, { timestamps: true });

// bcrypt pre-save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Users = mongoose.model("Users", UserSchema);
export default Users;
