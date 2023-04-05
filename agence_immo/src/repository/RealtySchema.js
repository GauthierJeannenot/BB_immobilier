const mongoose = require('mongoose');
const UserSchema = require('./UserSchema.js');
module.exports =  mongoose.Schema({
    agent_immobilier : { type: UserSchema },
    type:  {type: String, match: /^[1-6]{1}$/},
    price: { type: Number },
    amount_commission: { type: Number },
    percentage_commission: { type: Number },
    area: { type: Number },
    room: { type: Number },
    type_product: {type: String, match: /^[1-3]{1}$/},
    info_realty: { type: String },
    address: {
      seller: { type: String },
      address1: { type: String },
      address2: { type: String },
      zipcode: { type: String },
      city: { type: String },
      info_address: { type: String },
    },
    contact: {
      civility:  {type: String, match: /^[1-2]{1}$/},
      lastname: { type: String },
      firstname: { type: String },
      email: { type: String },
      mobile: { type: String },
      phone: { type: String },
      info: { type: String },
    }
}, { versionKey: false });