import express from "express";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Home Page",
    activePage: "home",
    blog_post: posts,
  });
});

app.get("/create_post", (req, res) => {
  res.render("create_post.ejs", { title: "Create Post", activePage: "posts" });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About Page", activePage: "about" });
});

let posts = [];
app.post("/submit", (req, res) => {
  const time = new Date();
  const data = {
    blog_title: req.body["title"],
    desc: req.body["description"],
    auth: req.body["author_name"],
    time: time,
  };

  posts.push(data);

  res.render("index.ejs", {
    title: "Home Page",
    activePage: "home",
    blog_post: posts,
  });
});

app.get("/submit", (req, res) => {
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postIndex = req.body.postIndex;
  posts.splice(postIndex, 1);

  res.render("index.ejs", {
    title: "Home Page",
    activePage: "home",
    blog_post: posts,
  });
});

app.get("/edit", (req, res) => {
  const postIndex = req.query.postIndex;
  const post = posts[postIndex];

  res.render("edit.ejs", {
    title: "Edit Post",
    activePage: "edit",
    post: post,
    index: postIndex,
  });
});

app.post("/update", (req, res) => {
  const postIndex = req.body.postIndex;

  posts[postIndex] = {
    blog_title: req.body.blog_title,
    desc: req.body.desc,
    auth: req.body.auth,
    time: new Date(),
  };

  res.render("index.ejs", {
    title: "Home Page",
    activePage: "home",
    blog_post: posts,
  });
});

app.get("/update", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Sever started running at ${port} ✅`);
});
