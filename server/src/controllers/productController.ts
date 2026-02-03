import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

// @desc    Fetch all products with filters
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword as string,
                $options: 'i',
            },
        }
        : {};

    const vibe = req.query.vibe
        ? {
            vibe: {
                $in: [req.query.vibe as string],
            },
        }
        : {};

    const count = await Product.countDocuments({ ...keyword, ...vibe });
    const products = await Product.find({ ...keyword, ...vibe })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user?._id,
        images: ['/images/sample.jpg'],
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        sizes: ['M'],
        colors: ['Black'],
        vibe: ['Basic']
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const {
        name, price, description, images, category, countInStock, sizes, colors, vibe, isDrop, dropDate, expiryDate
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.images = images;
        product.category = category;
        product.countInStock = countInStock;
        product.sizes = sizes;
        product.colors = colors;
        product.vibe = vibe;
        product.isDrop = isDrop;
        product.dropDate = dropDate;
        product.expiryDate = expiryDate;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
