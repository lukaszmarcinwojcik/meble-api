var express = require("express");
var router = express.Router();

router.all("*", (req, res, next) => {
  // przed akzda funkcja w adminie sprawadza czy sesja jest
  //zeby random nie mogl cos pozmienaic
  if (!req.session.admin) {
    return;
  }
  next();
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ title: "admin" });
});

module.exports = router;

// dodawanie usuwanie i edytowanie mebla
