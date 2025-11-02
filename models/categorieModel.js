const mongoose = require('mongoose');

const categorieModel = new mongoose.Schema({
    nom: String,
    produit:[{type: mongoose.Schema.Types.ObjectId, ref: 'Produit'}]
}, { timestamps: true });

const Categorie = mongoose.model("Categorie", categorieModel);
module.exports = Categorie;
