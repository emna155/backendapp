const mongoose = require("mongoose");

const commandeModel=new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        produits: [
            {
                produit: { type: mongoose.Schema.Types.ObjectId, ref: 'produits', required: true },
                quantite: { type: Number, required: true, default: 1 }
            }
        ],
        dateCommande: { type: Date, default: Date.now },
        etat: { type: String, default: 'En cours' }, // "En cours", "Expédiée", "Livrée".
        total: { type: Number, required: true }
    }, { timestamps: true 
    }
);

commandeModel.post('save', function(doc, next) {
    console.log('New commande created: ', doc);
    next();
});




const Commande = mongoose.model("Commande", commandeModel);
module.exports = Commande;
