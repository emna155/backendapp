const userModel = require("../models/userSchema");
// Get all users , add user , delete user , update user

// Create a new user
module.exports.createAdmin = async (req, res) => {
  try {
    // logique
    const { nom, prenom, email, password, age, adminCode } = req.body;
    const role = "admin";
    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      age,
      role,
      adminCode,
    });
    await newUser.save();
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.createClient = async (req, res) => {
  try {
    // logique
    const { nom, prenom, email, password, age, NumTel, Adresse } = req.body;
    const role = "client";
    const newUser = new userModel({
      nom,
      prenom,
      email,
      password,
      age,
      role,
      NumTel,
      Adresse,
    });
    await newUser.save();
    res.status(201).json({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getAdmin = async (req, res) => {
  try {
    const users = await userModel.find({ role: "admin" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getClient = async (req, res) => {
  try {
    const users = await userModel.find({ role: "client" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, age } = req.body;
    const users = await userModel.findByIdAndUpdate(
      id,
      { nom, prenom, age },
      { new: true }
    );
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getUserWithCommandes = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("commande");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

const jwt=require("jsonwebtoken");
const maxAge=1*60*60;
const createToken=(id)=>{

  return jwt.sign({id},"emna",{expiresIn: maxAge,
  });
}


module.exports.login=async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email||!password){
    res.status(200).json({message:"email and password are required"});
    }
    const user=await userModel.login(email,password);
    const token=createToken(user._id);
    res.cookie("jwt",token,{httpOnly:true, maxAge: maxAge*1000})
    res.status(200).json({message:"login successful",user});
  }
  catch(error){
    res.status(500).json({ message:  error.message });
  }
}
module.exports.getUseAuth = async (req, res) => {
  try {
    const id  = req.user._id;
    const user = await userModel.findById(id).populate("users");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports.logout = (req, res) => {
  try {
      //res.cookie("jwt", "", { maxAge: 1 });
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
  }