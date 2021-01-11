const Product = require('../models/productSchema.js');
const slugify = require('slugify'); 

exports.create = async (req,res)=>{
    try {
        const Pname = req.body.cat;
        const product = await new Product({
            name:Pname,
            slug: slugify(Pname)
        })
        product.save();
        res.json(product);
    } catch (error) {
        res.status(400).send("Create Product Failed");
    }
}

exports.read = async (req,res)=>{
    let cat = await Product.findOne({slug: req.params.slug}).exec();
    res.json(cat);
}

exports.list = async (req,res)=>{
    const find = await Product.find({}).sort({createAt: -1}).exec();
    res.json(find);
}

exports.update = async (req,res)=>{
    const Pname = req.body.name;
    try {
        const upt = await Product.findByIdAndUpdate({slug:req.params.slug},{name:Pname, slug:slugify(Pname)}, {new:true});
        res.json(upt);
    } catch (error) {
        res.status(400).send("Update Failed");
    }
}

exports.remove = async (req,res)=>{
    try {
        const del = await Product.findByIdAndDelete({slug:req.params.slug});
        res.json(del);
    } catch (error) {
        res.status(400).send("Delete Failed")
    }
}