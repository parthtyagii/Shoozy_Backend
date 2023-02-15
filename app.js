const express = require('express');
const app = express();
const mongoose = require('mongoose');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


// app.get('/shoes', async (req, res) => {
//     try {
//         let shoes = [];
//         sneaks.getProducts('Adidas', 15, function (err, products) {
//             if (products) {
//                 shoes = products;
//             }
//         })
//         res.send(shoes);
//     }
//     catch (e) {
//         console.log('cannot get shoes!');
//         console.log(e);
//     }
// })

app.get('/shoes', async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {
            sneaks.getProducts('Adidas', 15, function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        });
        res.json(products);
    } catch (e) {
        console.log('cannot get shoes!');
        console.log(e);
    }
});


app.get('/shoesPrices', async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {

            sneaks.getProductPrices('Yeezy', function (err, products) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(products);
                }
            });
        });
        res.json(products);
    }
    catch (e) {
        console.log('cannot get prices!');
        console.log(e);
    }
})

app.get('/shoesPopular', async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {

            sneaks.getMostPopular(10, function (err, products) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(products);
                }
            });
        });
        res.json(products.length);
    }
    catch (e) {
        console.log('cannot get popular!');
        console.log(e);
    }
})


app.listen(5000, () => {
    console.log('Server 5000 running!');
})