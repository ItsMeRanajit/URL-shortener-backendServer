const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const connectMongoDb = require("./connect");

connectMongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
//at first we have to set the view engine as ejs to use ejs
app.set("views", path.resolve("./view"));
//now we have to give where the view engine is present.its in views folder so view where the view files are present
//we specified the path using path module, so imported path and used it like this to specify the path

//now were gonna render the html in view with ejs
app.get("/dev/test2", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  }); //we used the render and provided with the name of the html file in view
  //and in the other param we can send variabels
});

app.get("/dev/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.end(`
    <html>
      <body>
        <ol>
          ${allUrls.map((url) => ` <li> ${url.shortId} - ${url.redirectUrl}</li>`).join("")}
        </ol>
      </body>
    </html>
    `);
}); // this is the code of ssr which returns html file to the client but it is not good bcz if we write html like taht for large websites itll be messy 😂😂😂

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
