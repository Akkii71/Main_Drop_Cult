import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    googleId?: string;
    wishlist: mongoose.Types.ObjectId[];
    cart: { product: mongoose.Types.ObjectId; quantity: number; size: string; color: string }[];
    styleDNA?: string; // e.g. "Cyberpunk", "Street", "Y2K"
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google OAuth users
    isAdmin: { type: Boolean, required: true, default: false },
    googleId: { type: String },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        size: { type: String },
        color: { type: String }
    }],
    styleDNA: { type: String }
}, {
    timestamps: true,
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
