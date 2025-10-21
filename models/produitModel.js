const mongoose = require("mongoose");

const produitModel=new mongoose.Schema(
    {
     nom:String,
     description:String,
     prix:Number,
     image:String,
     stock:Number,
     categories:String   
    }
);

produitModel.post('save', function(doc, next) {
    console.log('New user created: ', doc);
    next();
});




const Produit = mongoose.model("Produit", produitModel);
module.exports = Produit;
