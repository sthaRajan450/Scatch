const express = require("express");
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey it is working");
});
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgColor, panelColor, textColor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
});


module.exports = router;
