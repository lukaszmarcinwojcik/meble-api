var express = require("express");
var router = express.Router();
const login = "admin";
const password = "123";

/* GET home page. */
router.get("/", (req, res) => {
  res.json({ title: "strona glowna" });
});

router.post("login", (req, res) => {
  const body = req.body;

  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.json({ title: "Udalo Ci się zalogować" });
  } else {
    res.json({ title: "Nieprawidlowy login lub haslo" });
  }
});

module.exports = router;

// ma pobierac po odpaleniu katalogu:
// wszystkie meble
// oraz opcje do filtrowania
// pomieszczenie, kolekcje, material, produkt
