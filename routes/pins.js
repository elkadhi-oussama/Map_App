const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).send( savedPin );
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//get all Pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).send(pins);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
