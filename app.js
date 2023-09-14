const express = require("express");
const { blogs } = require("./model/index");
const app = express();

// database connection
require("./model/index");

// telling the nodejs to set view-engine to ejs

app.set("view engine", "ejs");

// node.js lai file access garna dey vaneko haii yo code le...
app.use(express.static("public/"));

// form bata data aairaxa parse gara or handle gar vaneko ho...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all Blogs...
app.get("/", async (req, res) => {
  // database / table bata data kasari nikalney
  // blogs vanney table bata vayejati sabai data dey
  const allBlogs = await blogs.findAll();
  console.log(allBlogs);

  // blogs vanney key/name ma allBlogs/data pass gareko ejs file lai
  res.render("blogs", { blogs: allBlogs });
});

// create Blogs...
app.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

// createBlog Post
app.post("/createBlog", async (req, res) => {
  // second approach ... (second way...)
  // const {title, description, subtitle} = req.body

  // first approach....(first way...)
  const title = req.body.title;
  const description = req.body.description;
  const subTitle = req.body.subtitle;

  // database ma halnu paryo..., database sanga kehi operation await halnu parney hunxa
  // agadi, await halepaxi mathi async halnu parney hunxa

  await blogs.create({
    title: title,
    subtitle: subTitle,
    description: description,
  });

  // redirect le home page ma nai return gardinxa...
  res.redirect("/");
});

// single blog page
app.get("/single/:id", async (req, res) => {
  const id = req.params.id;

  // second approach
  // const {id} = req.params

  // first finding approach but it (recommanded)
  // id ko data magnu/find garnu paryo hamro table bata
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
  });

  // second finding approach
  // const blogs = await blogs.findByPk(id)
  console.log(blog);

  res.render("singleBlogs.ejs", { blog: blog });
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  // blogs vanney table bata tyo id ko delete gar vaneko yaha
  await blogs.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
});

// Edit Blog...
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  // find blog of that id
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
  });
  res.render("editBlog", { blog: blog });
});

app.post("/editBlog/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const title = req.body.title;
  const subTitle = req.body.subtitle;
  const description = req.body.description;

  // first approach for update data... but this is bad practice, sometime it doesn't works
  // await blogs.update(req.body, {
  //   where : {
  //     id : id
  //   }
  // })

  // second approach:
  await blogs.update(
    {
      title: title,
      subtitle: subTitle,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect("/single/" + id);
});

app.listen(3000, () => {
  console.log("NodeJs project has started at port 3000");
});
