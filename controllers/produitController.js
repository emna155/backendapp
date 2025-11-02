const produitModel = require("../models/produitModel");
const categorieModel=require("../models/categorieModel")
module.exports.addProduit = async (req, res) => {
  try {
    // logique
    const { nom,  description, prix, stock, categorie } = req.body;

    const newProduit = new produitModel({
      nom,
      description,
      prix,
      stock,
      categorie:id_Categorie,
    });
    await newProduit.save();
    await categorieModel.findByIdAndUpdate(categorie, { $push: { Produit: newProduit._id } });
    res
      .status(201)
      .json({ newProduit, message: "Produit created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.getAllProduit = async (req, res) => {
  try {
    const Produits = await produitModel.find();
    res.status(200).json(Produits);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const Produits = await produitModel.findByIdAndDelete(id);
    res.status(200).json({ message: "produit deleted successfully", Produits });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, stock, categories } = req.body;
    const Produits = await produitModel.findByIdAndUpdate(
      id,
      {
        nom,
        description,
        prix,
        stock,
        categories
      },
      { new: true }
    );
    res.status(200).json({ Produits });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
