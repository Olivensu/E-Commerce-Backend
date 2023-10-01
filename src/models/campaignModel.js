const {Schema, model} = require("mongoose");

const campaignSchema = new Schema({
    date:{
        type: String,
    },
    image:{
        type: String,
    }
}, {timestamps: true});

const Campaign = model('Campaign',campaignSchema);

module.exports = Campaign;