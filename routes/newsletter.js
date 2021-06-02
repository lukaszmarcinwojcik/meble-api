var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
// czeba googlac? bcrypt hasdzowanie hasla

//Get user model
const Newsletter = require("../models/newsletter");

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.json({ title: "uzytkownik" });
// });

//Add newslettetr
router.post("/add", (req, res) => {
  const { username, email, rodo1, rodo2 } = req.body;
  // tabela bledow
  let errors = [];

  //check required fields
  if (!username || !email) {
    errors.push({ message: "Prosze wypelnic wszystkie pola" });
  }
  //check checkbox cionfrimed
  if (!rodo1 || !rodo2) {
    errors.push({ message: "Prosze zaakceptowac wszystkie zgody" });
  }

  if (errors.length > 0) {
    //obsluga bledu
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
        //newsletter exist
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
        //Save user
        newNewsletter
          .save()
          .then((newsletter) => {
            res.json({ message: "Zapisałeś/aś sie do naszego Newslettera!" });
          })
          .catch((err) => console.log(err));
        console.log("nowy newsletter to: ", newNewsletter);
      }
    });
  }
});

module.exports = router;
