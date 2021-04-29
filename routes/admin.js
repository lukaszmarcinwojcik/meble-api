const express = require("express");
const Produkt = require("../models/produkt");
const Rodzaj = require("../models/rodzaj");
const Kolekcja = require("../models/kolekcja");
const Material = require("../models/material");
const Pomieszczenie = require("../models/pomieszczenie");

const router = express.Router();

// router.all("*", (req, res, next) => {
//   // przed akzda funkcja w adminie sprawadza czy sesja jest
//   //zeby random nie mogl cos pozmienaic
//   if (!req.session.admin) {
//     res.json({ title: "nie masz dostepu" });
//   }
//   next();
// });

//adminyy
router.get("/", function (req, res, next) {
  // const newProdukt = new Produkt({
  //   nazwa: "Szafka Ravena",
  //   rodzaj: "szafka",
  //   kolekcja: "Ravena",
  //   material: "dąb",
  //   pomieszczenie: "kuchnia",
  //   nazwapliku: "szafkaravena.jpg",
  // });

  // newProdukt.save((err) => {
  //   console.log(err);
  // });

  res.json({ title: "admin" });
});

module.exports = router;

// dodawanie usuwanie i edytowanie mebla
