const del =require('../model/delivery')

const getAllUser = async (req,res) =>{
    try{
         const allDeliveries = await del.find();
         res.status(200).json(allDeliveries); 
    }catch(err){
        res.status(500).json({
            message:"failed to fetch deliveries",
            err: err.message,
        });

    }
}


const Delivery = require("../model/delivery");

const updateDel = async (req, res) => {
  try {
    const { username, status } = req.body;

    if (!username || !status) {
      return res.status(400).json({ message: "Missing username or status" });
    }

    const response = await Delivery.updateOne(
      { username },
      { $set: { status } }
    );

    res.status(200).json({ message: "Status updated", result: response });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports ={getAllUser,updateDel};