const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    _id: false,
    title: String,
    price: Number,
    quantity: Number,
    image: String
});

const ShippingSchema = new mongoose.Schema({
    _id: false,
    title: String,
    price: Number
});

const OrderSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    date: Date,
    coupon: String,
    status: String,
    items: [ OrderItemSchema ],
    shipping: ShippingSchema
});

module.exports = mongoose.model('Order', OrderSchema);

