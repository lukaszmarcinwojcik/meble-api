var express = require("express");
var router = express.Router();
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// czeba googlac? bcrypt hasdzowanie hasla

//Get user model
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ title: "uzytkownik" });
});

//Register
router.post("/register", (req, res) => {
  const { name, surname, email, password, password2 } = req.body;
  // tabela bledow
  let errors = [];

  //check required fields
  if (!name || !surname || !email || !password || !password2) {
    errors.push({ message: "Prosze wypelnic wszystkie pola" });
  }

  //check password match
  if (password !== password2) {
    errors.push({ message: "Hasla roznia sie od siebie" });
  }
  //check pass length
  //check password match
  if (password.length < 6) {
    errors.push({ message: "Haslo musi zawierac conajmniej 6 znaków" });
  }
  if (errors.length > 0) {
    //obsluga bledu
    res.json({
      errors,
      name,
      surname,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exist
        errors.push({ message: "Uzytkownik o podanym meilu istnieje" });
        res.json({
          errors,
          name,
          surname,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          surname,
          email,
          password,
        });
        // Hashowanie pwd
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set pwd to hashed
            newUser.password = hash;
            //Save user
            newUser
              .save()
              .then((user) => {
                res.json({ message: "Udalo Ci sie zarejestrowac" });
              })
              .catch((err) => console.log(err));
          })
        );
        console.log(newUser);
        res.json({ message: "Udalo sie zarejestrowac" });
      }
    });
  }
});

//login
//popracoweac nad tym??????????????????????????? 1:20min
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
  req.logout();

  res.json({
    loginMessage: "Zostales wylogowany",
    islogged: false,
    poziomDostepu: 0,
  });
});

module.exports = router;
