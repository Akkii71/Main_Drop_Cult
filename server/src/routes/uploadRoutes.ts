import path from 'path';
import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req: any, file: any) => {
        return {
            folder: 'gen-z-store',
            format: 'jpeg', // supports promises as well
            public_id: `${file.fieldname}-${Date.now()}`,
        };
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded',
        image: req.file?.path
    });
});

export default router;
