import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    vibe: string[]; // e.g. ["Cyber", "Goth", "Y2K"]
    sizes: string[];
    colors: string[];
    countInStock: number;
    isDrop: boolean;
    dropDate?: Date;
    expiryDate?: Date; // For limited drops
    soldOut: boolean;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    vibe: [{ type: String }],
    sizes: [{ type: String }], // S, M, L, XL
    colors: [{ type: String }],
    countInStock: { type: Number, required: true, default: 0 },
    isDrop: { type: Boolean, default: false },
    dropDate: { type: Date },
    expiryDate: { type: Date },
    soldOut: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
