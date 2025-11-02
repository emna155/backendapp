const commandeModel = require("../models/commandeModel");
const produitModel=require("../models/produitModel")
const userModel=require('../models/userSchema')
module.exports.createCommande = async (req, res) => {
  try {
    // logique
    const { user, produits } = req.body;
    let total = 0;
    for (const i of produits) {
      const p = await produitModel.findById(i.produit);
      total += p.prix * i.quantite;
    }
    const newcommande = new commandeModel({
      user,
      produits,
      total,
      etat: "En cours",
    });
    await newcommande.save();

    await userModel.findByIdAndUpdate(user, { $push: { commande: newcommande._id },
    });
    res
      .status(201)
      .json({ newcommande, message: "Commande created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.getAllCommande = async (req, res) => {
  try {
    const Commandes = await commandeModel.find();
    res.status(200).json(Commandes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const Commande = await commandeModel.findByIdAndDelete(id);
    await userModel.findByIdAndUpdate(Commande.user, { $pull: { commande: Commande._id },});

    res.status(200).json({ message: "commande deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.body;
    const Commandes = await commandeModel.findByIdAndUpdate(
      id,
      {},
      { new: true }
    );
    res.status(200).json({ Commandes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
