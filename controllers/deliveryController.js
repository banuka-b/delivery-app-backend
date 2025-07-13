const Delivery = require('../model/delivery')

//Registor new delivery item

const registerDelivery = async (req , res) => {
    try{
        const newDelivery = new Delivery({
            username: req.body.username,
            customer: req.body.customer,
            address : req.body.address,
            details : req.body.details,
            date   : req.body.date,
            status :"pending"
        });
        console.log("Payload received:", req.body);
        await newDelivery.save();
         res.status(201).json({ message: "delivery registered successfully!" });

    } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message
      });
    }

}


const getUserDeliveries = async (req, res) => {
  try {
    const { username } = req.params;

    const userDeliveries = await Delivery.find({ username });

    // Generate short ID per delivery
    const enrichedDeliveries = userDeliveries.map((delivery) => ({
      ...delivery._doc,
      shortId: delivery._id.toString().slice(-4) // last 4 chars of ObjectId
    }));

    res.status(200).json(enrichedDeliveries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deliveries", error: err.message });
  }
};



module.exports = {registerDelivery,getUserDeliveries}