const categorieModel= require("../models/categorieModel")
const produitModel=require("../models/produitModel")
exports.createCategorie = async (req, res) => {
    try {
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: "Le nom est requis" });
        }
        const categorie = new categorieModel({ nom });
        await categorie.save();

        res.status(201).json({ message: "Catégorie créée avec succès", categorie });
    } catch (error) { 
        console.error("Erreur dans createCategorie :", error);
        res.status(500).json({ message: "Server error", error });  
    }
};
module.exports.getAllCategorie = async (req, res) => {
    try {
      const Categories = await categorieModel.find().populate("Produit");
      res.status(200).json(Categories);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  module.exports.deleteByname = async (req, res) => {
    try {
      const { nom } = req.params;
      
      const Categories = await categorieModel.findOneAndDelete({ nom : nom});
      res.status(200).json({ message: "categorie deleted successfully", Categories });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

 module.exports.updateByname = async (req, res) => {
    try {
      const { oldnom,newnom } = req.body;
      
      const Categories = await categorieModel.findOneAndUpdate({ nom : oldnom},{nom:newnom}, { new: true }  );
      res.status(200).json({ message: "categorie UPDATED", Categories });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };