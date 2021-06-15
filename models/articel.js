const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

articleSchema.virtual("comment", {
  // nazwa virtualnego pola
  ref: "Comment", // model, którego chcemy użyć
  localField: "_id", // znajdź talk gdzie 'localField'
  foreignField: "article", // jest równe 'foreignField'
  justOne: false, // wartości comment dla eventu może być więcej nize 1
});

module.exports = mongoose.model("Article", articleSchema);
