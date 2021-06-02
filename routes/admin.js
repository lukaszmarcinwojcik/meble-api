const express = require("express");
const Product = require("../models/product");
const Type = require("../models/type");
const Collection = require("../models/collection");
const Material = require("../models/material");
const Room = require("../models/room");

const router = express.Router();
// sprawdzenie cookie session
router.all("*", (req, res, next) => {
  // przed akzda funkcja w adminie sprawadza czy sesja jest
  //zeby random nie mogl cos pozmienaic
  console.log("sesja ciastkowa w router all", req.session.admin);
  if (!req.session.admin) {
    res.json({ title: "nie masz dostepu" });
  }
  next();
});

// dodawanie nowych mebli - skonczone
// /admin/add
router.post("/add", (req, res) => {
  //przechwycone dane z formularza w req body
  const body = req.body;
  const produktData = new Produkt(body);
  const errors = produktData.validateSync();
  produktData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy produkt" }, body, errors);
});
// usuwanie po ID - skonczone
router.get("/delete/:id", (req, res) => {
  Produkt.findByIdAndDelete(req.params.id, (err) => {
    res.json({ title: `usunieto item o id ${req.params.id}` });
  });
});

// edytowanie
module.exports = router;
