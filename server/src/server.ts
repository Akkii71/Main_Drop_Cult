import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log("🚀 SERVER VERSION: FIXED_TOKEN_30D_V2 🚀");
});
