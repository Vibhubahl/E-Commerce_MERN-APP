const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        index:true
    },
    role:{
        type: String,
        default: "user"
    },
    cart:{
        type: Array,
        default: []
    },
    address:String,
    wishlist:[{type: mongoose.ObjectId, ref:"productSchema"}],
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);