var express = require("express");
var router = express.Router();

const Article = require("../models/articel");
const Comment = require("../models/comment");

router.get("/", (req, res) => {
  Article.find()
    .populate("comment")
    .then((articleList) => {
      res.json(articleList);
    });
});

router.post("/add", (req, res) => {
  const body = req.body;

  const articleData = new Article(body);
  const errors = articleData.validateSync();
  articleData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy artykul", body }, body, errors);
});

router.get("/comment", (req, res) => {
  Comment.find({}, (err, commentList) => {
    res.json(commentList);
  });
});

router.post("/comment/add", (req, res) => {
  const body = req.body;
  console.log(req.body);

  const commentData = new Comment(body);
  const errors = commentData.validateSync();
  commentData.save((err) => {
    console.log(err);
  });
  res.json({ title: "dodano nowy komentarz", body }, body, errors);
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(200).json({ data: event });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
