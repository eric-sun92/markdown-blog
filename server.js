const express = require("express");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

const articleRouter = require("./routes/articles");
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.render("articles/index", {
    articles: articles,
  });
});

app.listen(5000);
