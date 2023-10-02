const {Schema, model} = require("mongoose");

const flashSaleSchema = new Schema({
    image:{
        type: String,
    }
}, {timestamps: true});

const FlashSale = model('FlashSale',flashSaleSchema);

module.exports = FlashSale;