var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const Newsletter = require("../models/newsletter");

router.post("/add", (req, res) => {
  const { username, email, rodo1, rodo2 } = req.body;

  let errors = [];

  if (!username || !email) {
    errors.push({ message: "Prosze wypelnic wszystkie pola" });
  }

  if (!rodo1 || !rodo2) {
    errors.push({ message: "Prosze zaakceptowac wszystkie zgody" });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      username,
      email,
      rodo1,
      rodo2,
    });
  } else {
    Newsletter.findOne({ email: email }).then((newsletter) => {
      if (newsletter) {
        errors.push({ message: "Uzytkownik o podanym meilu istnieje" });
        res.json({
          errors,
          username,
          email,
          rodo1,
          rodo2,
        });
      } else {
        const newNewsletter = new Newsletter({
          username,
          email,
        });
        newNewsletter
          .save()
          .then((newsletter) => {
            res.json({ message: "Zapisałeś/aś sie do naszego Newslettera!" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

module.exports = router;
