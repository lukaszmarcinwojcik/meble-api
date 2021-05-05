const express = require("express");
const Produkt = require("../models/produkt");
const Rodzaj = require("../models/rodzaj");
const Kolekcja = require("../models/kolekcja");
const Material = require("../models/material");
const Pomieszczenie = require("../models/pomieszczenie");

const router = express.Router();
//sprawdzenie cookie session
router.all("*", (req, res, next) => {
  // przed akzda funkcja w adminie sprawadza czy sesja jest
  //zeby random nie mogl cos pozmienaic
  if (!req.session.admin) {
    res.json({ title: "nie masz dostepu" });
  }
  next();
});

//dodawanie nowych mebli - skonczone
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
