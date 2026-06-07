const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

/* SEND MESSAGE */
router.post("/send", async (req,res)=>{
  const {from,to,message} = req.body;

  await Message.create({from,to,message});

  res.json({msg:"sent"});
});

/* INBOX */
router.get("/inbox/:user", async (req,res)=>{
  const user = req.params.user;

  const msgs = await Message.find({
    $or: [{from:user},{to:user}]
  });

  res.json(msgs);
});

module.exports = router;