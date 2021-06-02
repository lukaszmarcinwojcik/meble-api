const express = require("express");
const router = express.Router();
const config = require("../config");
const Product = require("../models/product");
const Type = require("../models/type");
const Collection = require("../models/collection");
const Material = require("../models/material");
const Room = require("../models/room");
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
      accessLevel: 3,
    });
  } else {
    res.json({
      loginMessage: "Nieprawidlowy login lub haslo",
      islogged: false,
      accessLevel: 0,
    });
  }
});
//WYLOGOWANIE
router.get("/logout", (req, res) => {
  req.session.admin = null;
  res.json({
    loginMessage: "Zostales wylogowany",
    islogged: false,
    accessLevel: 0,
  });
});

//POBIERANIE WSZYSTKICH PRODUKTOW
router.get("/listaProduktow", (req, res) => {
  Product.find({}, (err, data) => {
    res.json({ title: "Lista produktow", data });
  });
});

//POBIERANIE WSZYSTKICH KOLEKCJI
router.get("/listaKolekcji", (req, res) => {
  Collection.find({}, (err, data) => {
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
  Room.find({}, (err, data) => {
    res.json({ title: "Lista pomieszczen", data });
  });
});

//POBIERANIE WSZYSTKICH RODZAJOW
router.get("/listaRodzajow", (req, res) => {
  Type.find({}, (err, data) => {
    res.json({ title: "Lista rodzajow", data });
  });
});

//FILTROWANIE MEBLI
router.get("/filtruj", (req, res) => {
  const type = req.query.type;
  const collection = req.query.collection;
  const material = req.query.material;
  const room = req.query.room;

  if (type === "" && collection === "" && material === "" && room === "") {
    res.redirect("/listaProduktow");
  }

  let Out = Product;

  if (type) {
    Out = Out.find({
      type: type,
    });
  }
  if (collection) {
    Out = Out.find({
      collection: collection,
    });
  }
  if (material) {
    Out = Out.find({
      material: material,
    });
  }
  if (room) {
    Out = Out.find({
      room: room,
    });
  }
  Out.sort({ date: -1 });
  Out.exec((err, data) => {
    res.json({ title: "filtrowane dane: ", data });
  });
});

module.exports = router;
