const express = require("express");
const app = express();

// telling the nodejs to set view-engine to ejs

app.set("view engine", "ejs");

// form bata data aairaxa parse gara or handle gar vaneko ho...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all Blogs...
app.get("/", (req, res) => {
  res.render("blogs");
});

// create Blogs...
app.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

// createBlog Post
app.post("/createBlog", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully");
});

app.listen(3000, () => {
  console.log("NodeJs project has started at port 3000");
});