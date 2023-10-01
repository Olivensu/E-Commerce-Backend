const {Schema, model} = require("mongoose");

const sliderSchema = new Schema({
    image:{
        type: String,
    }
}, {timestamps: true});

const Slider = model('Slider',sliderSchema);

module.exports = Slider;