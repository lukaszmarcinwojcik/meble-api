const express = require("express");
const router = express.Router();
const config = require("../config");
const Material = require("../models/material");
const Produkt = require("../models/produkt");
const Rodzaj = require("../models/rodzaj");
const Kolekcja = require("../models/kolekcja");
const Pomieszczenie = require("../models/pomieszczenie");
/* GET home page. */
router.get("/", (req, res) => {
  res.json({ title: "strona glowna" });
});
// LOGOWANIE ADMINISTRATORA
router.post("/login", (req, res) => {
  const body = req.body;
  console.log("param wyslany to", req.body);
  if (body.login === config.login && body.password === config.password) {
    req.session.admin = 1;
    res.json({
      loginMessage: "Udalo Ci się zalogować",
      islogged: true,
      poziomDostepu: 3,
    });
  } else {
    res.json({
      loginMessage: "Nieprawidlowy login lub haslo",
      islogged: false,
      poziomDostepu: 0,
    });
  }
});
//WYLOGOWANIE
router.get("/logout", (req, res) => {
  req.session.admin = null;
  res.json({
    loginMessage: "Zostales wylogowany",
    islogged: false,
    poziomDostepu: 0,
  });
});

//POBIERANIE WSZYSTKICH PRODUKTOW
router.get("/listaProduktow", (req, res) => {
  Produkt.find({}, (err, data) => {
    res.json({ title: "Lista produktow", data });
  });
});

//POBIERANIE WSZYSTKICH KOLEKCJI
router.get("/listaKolekcji", (req, res) => {
  Kolekcja.find({}, (err, data) => {
    res.json({ title: "Lista kolekcji", data });
  });
});

//POBIERANIE WSZYSTKICH MATERIALOW
router.get("/listaMaterialow", (req, res) => {
  Material.find({}, (err, data) => {
    res.json({ title: "Lista materialow", data });
  });
});

//POBIERANIE WSZYSTKICH POMIESZCZEN
router.get("/listaPomieszczen", (req, res) => {
  Pomieszczenie.find({}, (err, data) => {
    res.json({ title: "Lista pomieszczen", data });
  });
});

//POBIERANIE WSZYSTKICH RODZAJOW
router.get("/listaRodzajow", (req, res) => {
  Rodzaj.find({}, (err, data) => {
    res.json({ title: "Lista rodzajow", data });
  });
});

//FILTROWANIE MEBLI
router.get("/filtruj", (req, res) => {
  const rodzaj = req.query.rodzaj;
  const kolekcja = req.query.kolekcja;
  const material = req.query.material;
  const pomieszczenie = req.query.pomieszczenie;
  console.log(rodzaj);
  console.log(typeof rodzaj);

  if (
    rodzaj === "" &&
    kolekcja === "" &&
    material === "" &&
    pomieszczenie === ""
  ) {
    res.redirect("/listaProduktow");
  }

  let Out = Produkt;

  if (rodzaj) {
    Out = Out.find({
      rodzaj: rodzaj,
    });
  }
  if (kolekcja) {
    Out = Out.find({
      kolekcja: kolekcja,
    });
  }
  if (material) {
    Out = Out.find({
      material: material,
    });
  }
  if (pomieszczenie) {
    Out = Out.find({
      pomieszczenie: pomieszczenie,
    });
  }
  Out.sort({ date: -1 });
  Out.exec((err, data) => {
    res.json({ title: "filtrowane dane: ", data });
  });
});

module.exports = router;
