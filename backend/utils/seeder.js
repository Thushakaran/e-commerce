const connectDatabase = require("../config/database");
const dotenv = require('dotenv')
const products = require('../data/products.json')
const Product = require('../models/productsModels')

dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products deleted!')
        await Product.insertMany(products);
        console.log('All products added!');
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

seedProducts();


