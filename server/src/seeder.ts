import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel';
import User from './models/userModel';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/drop_cult');

const vibes = ['Cyber', 'Street', 'Goth', 'Y2K', 'Retro'];
const categories = ['Hoodies', 'Pants', 'Tees', 'Accessories', 'Outerwear'];
const colors = ['Neon Green', 'Off Black', 'Hyper Blue', 'Acid Yellow', 'Chrome Silver', 'Glitch Purple'];
const sizes = ['S', 'M', 'L', 'XL', '2XL'];

const adjectives = ['Glitch', 'Acid', 'Hyper', 'Void', 'Digital', 'Neo', 'Tactical', 'Cyber', 'Flux', 'Matrix', 'Toxic', 'Inferno', 'Quantum', 'Plasma'];
const nouns = ['Hoodie', 'Cargo', 'Techwear', 'Visor', 'Shell', 'Bomber', 'Vest', 'Runner', 'Skin', 'Layer', 'Unit', 'System'];

const imageUrls = [
    // Cyber / Techwear
    'https://images.unsplash.com/photo-1550614000-4b9519e02eb4?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596727147705-5924e8251e04?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620641788242-7270241613e5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617387652439-d362725fa32e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230946086-1d99d543b599?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop',

    // Street / Grunge
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a302d2052574?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549488497-293672d62c93?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',

    // Goth / Dark
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512413314644-8898f297925c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536243297741-546b7979d086?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',

    // Y2K / Retro
    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',

    // Extra Viber
    'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520024146169-3240400354ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop'
];

const generateProducts = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const vibe = vibes[Math.floor(Math.random() * vibes.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];

        // Pick random from valid list
        const image = imageUrls[i % imageUrls.length];

        return {
            name: `${adj} ${noun} ${i < 9 ? 'v.0' + (i + 1) : 'v.' + (i + 1)}`,
            description: `Future-ready ${category.toLowerCase()} designed for the ${vibe.toLowerCase()} aesthetic. Reinforced stitching, premium tactical fabric.`,
            price: Math.floor(Math.random() * 200) + 40,
            countInStock: Math.floor(Math.random() * 50),
            images: [image],
            category,
            vibe: [vibe, vibes[Math.floor(Math.random() * vibes.length)]], // 2 vibes
            sizes: [sizes[Math.floor(Math.random() * sizes.length)], sizes[Math.floor(Math.random() * sizes.length)]],
            colors: [colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]],
            user: new mongoose.Types.ObjectId(), // Placeholder
        };
    });
};

const importData = async () => {
    try {
        await Product.deleteMany();

        const products = generateProducts(150);
        await Product.insertMany(products);

        console.log('150 Products Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
