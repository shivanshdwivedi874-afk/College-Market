const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req,res)=>{
  const {username,password} = req.body;

  const hash = await bcrypt.hash(password,10);

  await User.create({username,password:hash});

  res.json({msg:"Registered"});
});

/* LOGIN */
router.post("/login", async (req,res)=>{
  const {username,password} = req.body;

  const user = await User.findOne({username});
  if(!user) return res.json({msg:"User not found"});

  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.json({msg:"Wrong password"});

  res.json({username:user.username});
});

/* GET USERS (ADMIN) */
router.get("/users", async (req,res)=>{
  const users = await User.find();
  res.json(users);
});

/* VERIFY USER */
router.get("/verify/:id", async (req,res)=>{
  await User.findByIdAndUpdate(req.params.id,{status:"VERIFIED"});
  res.json({msg:"verified"});
});

/* BLOCK USER */
router.get("/block/:id", async (req,res)=>{
  await User.findByIdAndUpdate(req.params.id,{status:"BLOCKED"});
  res.json({msg:"blocked"});
});

module.exports = router;