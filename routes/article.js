var express = require("express");
var router = express.Router();

const Article = require("../models/articel");
const Comment = require("../models/comment");

// pobieranie wszystkich artykulow
//get all article
// router.get("/", (req, res) => {
//   Article.find({}, (err, articleList) => {
//     res.json(articleList);
//   });
// });
router.get("/", (req, res) => {
  Article.find()
    .populate("comment")
    .then((articleList) => {
      res.json(articleList);
    });
});

router.post("/add", (req, res) => {
  //przechwycone dane z formularza w req body
  const body = req.body;

  const articleData = new Article(body);
  const errors = articleData.validateSync();
  articleData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy artykul", body }, body, errors);
});

// pobieranie wszystkich komentarzy
//get all comment
router.get("/comment", (req, res) => {
  Comment.find({}, (err, commentList) => {
    res.json(commentList);
  });
});

//add comment
router.post("/comment/add", (req, res) => {
  //przechwycone dane z formularza w req body
  const body = req.body;
  console.log(req.body);

  const commentData = new Comment(body);
  const errors = commentData.validateSync();
  commentData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy komentarz", body }, body, errors);
});

//////////////////////////////////////////////////
// @desc Get all events
// @route GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// @desc Create event
// @route POST /api/events
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(200).json({ data: event });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
