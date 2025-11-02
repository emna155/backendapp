const mongoose = require("mongoose");

const produitModel=new mongoose.Schema(
    {
     nom:String,
     description:String,
     prix:Number,
     image:String,
     quantiteStock:Number,
     categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie'}  ]  ,
    
     
    }
);

produitModel.post('save', function(doc, next) {
    console.log('New produit created: ', doc);
    next();
});




const Produit = mongoose.model("Produit", produitModel);
module.exports = Produit;
