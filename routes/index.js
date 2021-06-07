const express = require("express");
const router = express.Router();
const config = require("../config");
const Product = require("../models/product");
const Type = require("../models/type");
const FurnitureCollection = require("../models/furnitureCollection");
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
router.get("/productList", (req, res) => {
  Product.find({}, (err, productList) => {
    res.json(productList);
  });
});

//POBIERANIE WSZYSTKICH KOLEKCJI
router.get("/collectionList", (req, res) => {
  FurnitureCollection.find({}, (err, collectionList) => {
    res.json(collectionList);
  });
});

//POBIERANIE WSZYSTKICH MATERIALOW
router.get("/materialList", (req, res) => {
  Material.find({}, (err, materialList) => {
    res.json(materialList);
  });
});

//POBIERANIE WSZYSTKICH POMIESZCZEN
router.get("/roomList", (req, res) => {
  Room.find({}, (err, roomList) => {
    res.json(roomList);
  });
});

//POBIERANIE WSZYSTKICH RODZAJOW
router.get("/typeList", (req, res) => {
  Type.find({}, (err, typeList) => {
    res.json(typeList);
  });
});

//FILTROWANIE MEBLI
router.get("/filter", (req, res) => {
  const type = req.query.type;
  const furnitureCollection = req.query.collection;
  const material = req.query.material;
  const room = req.query.room;

  if (
    type === "" &&
    furnitureCollection === "" &&
    material === "" &&
    room === ""
  ) {
    res.redirect("/productList");
  }

  let Out = Product;

  if (type) {
    Out = Out.find({
      type: type,
    });
  }
  if (furnitureCollection) {
    Out = Out.find({
      furnitureCollection: furnitureCollection,
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
  Out.exec((err, productList) => {
    res.json(productList);
  });
});

module.exports = router;
