var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var sha512 = require("js-sha512");
// var cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");

// const passport = require("passport");
// czeba googlac? bcrypt hasdzowanie hasla

//Get user model
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ title: "uzytkownik" });
});

//=============================Register=====================================================
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
        //Save user
        newUser.password = sha512(newUser.password);
        newUser
          .save()
          .then((user) => {
            res.json({ message: "Udalo Ci sie zarejestrowac" });
          })
          .catch((err) => console.log(err));
        console.log(newUser);
      }
    });
  }
});

//====================================login===========================================================

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashpassword = sha512(password);
  // tabela bledow
  let errors = [];

  //check required fields
  if (!email) {
    errors.push({ message: "Prosze wpisac email" });
  }
  if (!password) {
    errors.push({ message: "Prosze wpisac haslo" });
  }

  if (errors.length > 0) {
    //obsluga bledu
    res.json({
      errors,
      email,
      password: "",
    });
  } else {
    const user = User.findOne({ email: email, password: hashpassword }).then(
      (user) => {
        if (!user) {
          //User nie exist nie
          errors.push({ message: "bledny login lub haslo" });
          res.json({
            islogged: false,
            accessLevel: 0,
            authenticated: false,
            errors,
            email,
            password: "",
            message: "Nieudalo sie zalgowac",
          });
        } else {
          req.session.user = user;
          // console.log("sesja uzytkownika", req.session.user);
          //tu bedzie res json z danymi uzytkownika
          ///
          //tworzenie tokena
          const accessToken = createTokens(user);
          console.log("Acces token utwozoony przy zalogowaniu :", accessToken);
          // res.cookie("access-token", accessToken, {
          //   maxAge: 60 * 60 * 24 * 30 * 1000,
          // });
          //
          // req.session.user = user;
          // console.log("sesja uzytkownika", req.session.user);
          accessLevel = user.accessLevel;
          res.json({
            islogged: true,
            message: "Udalo CI sie zalogować!",
            accessLevel,
            authenticated: true,
            accessToken: accessToken,
            user: user,
          });
        }
      }
    );
  }
});

//===================================logout===================================================
router.get("/logout", (req, res) => {
  // req.logout();

  console.log("zostales wylogowany poprawnie");
  res.json({
    message: "Zostales wylogowany",
    islogged: false,
    accessLevel: 0,
  });
});

module.exports = router;
