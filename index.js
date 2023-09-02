const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const methodOverride = require('method-override');
//mongo db connecting
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("YES ...MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO DB CONNECTION ERROR");
        console.log(err);
    })


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

//add products  page to the database
app.get('/products/new',(req,res) => {
    res.render('products/new',{categories});
})

//post the added product in database
app.post('/products',async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`);
})
///////////////////////////////////////////////////////////////

//view products in product list through seeds.js file
app.get('/products',async (req,res) => {
    const products = await Product.find({})
    res.render('products/index',{ products });
})

//////////////////////////////////////////////////

//get product by id through show file

app.get('/products/:id',async(req,res) => {
   const { id } = req.params;
   const foundProduct = await Product.findById(id);
   res.render('products/show',{ foundProduct });
})

////////////////////////////////////////////////////////

//edit and update the added product
app.get('/products/:id/edit',async (req,res) => {
    const { id } = req.params;
    const editProduct = await Product.findById(id);
    res.render('products/edit',{ editProduct, categories })
})
//update the details with the put method
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
   const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    console.log(req.body);
    res.redirect(`/products/${product._id}`);
})
////////////////////////////////////////////////////////////

//data use to delet
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await  Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})
