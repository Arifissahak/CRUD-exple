const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("YES ...MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO DB CONNECTION ERROR");
        console.log(err);
    })

    // const p = new Product({
    //     name:'Ruby grapeFruit',
    //     price: 1.99,
    //     category: 'fruit'
    // })

    // p.save().then(p => {
    //         console.log(p)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })

    const seedProducts = [
        {
            name: 'water milon',
            price: 1.00,
            category: 'vegetable'
        },
        {
            name: 'orange',
            price: '4.99',
            category: 'fruit'
        },
        {
            name: 'passion fruit',
            price: '3.99',
            category: 'fruit'
        },
        {
            name:'apple',
            price: 1.50,
            category: 'vegetable'
        },
        {
            name: 'chocolate milk',
            price: '2.69',
            category: 'dairy'
        }
    ]

    Product.insertMany(seedProducts)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })