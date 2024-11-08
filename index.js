const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUsersOnly, checkAuth, restrictTo } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const connectMongoDb = require("./connect");

connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use(express.json()); // this is for parse json data to object
app.use(express.urlencoded({ extended: false })); // this is to parse form data as object.
app.use(cookieParser()); // this is to use the cookies
app.use("/url", restrictToLoggedInUsersOnly, restrictTo(["NORMAL"]), urlRoute); // here we used a inline middleware
app.use("/user", userRoute);
app.use("/", checkAuth, staticRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
