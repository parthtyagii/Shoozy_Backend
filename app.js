const express = require('express');
const app = express();
const mongoose = require('mongoose');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
var cors = require('cors');
const { urlencoded } = require('express');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------------

app.post('/shoes', async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {
            sneaks.getProducts(req.body.data, 10, function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        });
        console.log(req.body);
        console.log(products.length);
        res.json(products);
    } catch (e) {
        console.log('cannot get shoes!');
        console.log(e);
    }
});


app.post('/shoesPrices', async (req, res) => {
    try {
        const products = await new Promise((resolve, reject) => {

            sneaks.getProductPrices(req.body.data, function (err, products) {
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
        res.json(products);
    }
    catch (e) {
        console.log('cannot get popular!');
        console.log(e);
    }
})


app.listen(5000, () => {
    console.log('Server 5000 running!');
})