const produitModel = require("../models/produitModel");

module.exports.addProduit = async (req, res) => {
  try {
    // logique
    const { nom, prenom, description, prix, stock, categories } = req.body;

    const newProduit = new produitModel({
      nom,
      description,
      prix,

      stock,
      categories,
    });
    await newProduit.save();
    res
      .status(201)
      .json({ newProduit, message: "Produit created successfully" });
  } catch (error) {
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
