// Import mongoose
import mongoose from "mongoose";
// Import bcrypt
import bcrypt from "bcrypt";
// Create a User schema
const UserSchema = new mongoose.Schema({
    // Add fields: name, email, password, role (optional)

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    // Add timestamps 
}, { timestamps: true });

// bcrypt pre-save
UserSchema.pre("save", async (next) => {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// compare password
UserSchema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Users = mongoose.model("Users, UserSchema");
export default Users;
