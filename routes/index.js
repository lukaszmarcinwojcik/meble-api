const express = require("express");
const router = express.Router();
const config = require("../config");
const material = require("../models/material");
const Produkt = require("../models/produkt");
const rodzaj = require("../models/rodzaj");
/* GET home page. */
router.get("/", (req, res) => {
  res.json({ title: "strona glowna" });
});
// logowanie admina
router.post("login", (req, res) => {
  const body = req.body;

  if (body.login === config.login && body.password === config.password) {
    req.session.admin = 1;
    res.json({ title: "Udalo Ci się zalogować" });
  } else {
    res.json({ title: "Nieprawidlowy login lub haslo" });
  }
});

//---------Flitrowanie mebli ma byc
//przykadowy link
router.get("/meblefind", (req, res) => {
  const rodzaj = req.query.rodzaj;
  const kolekcja = req.query.kolekcja;
  const material = req.query.material;
  const pomieszczenie = req.query.pomieszczenie;
  console.log(rodzaj);
  const findProdukt = Produkt.find({
    rodzaj: rodzaj,
  }).sort({
    date: -1,
  });
  findProdukt.exec((err, data) => {
    console.log(data, "to mi znalazlo");
    res.json({ title: "filtrowane dane: ", data });
  });
});
module.exports = router;

// ma pobierac po odpaleniu katalogu:
// wszystkie meble
// oraz opcje do filtrowania
// pomieszczenie, kolekcje, material, produkt
