const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Mohamed" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About App", name: "Mohamed" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help message",
    title: "Help App",
    name: "Mohamed",
  });
});

app.get("/weather", (req, res) => {
  res.send({ forecast: "Cloudy", location: "Damietta" });
});

app.get("/help/*", (req, res) => {
  res.render("404", { errorMessage: "Help article not found." });
});

app.get("*", (req, res) => {
  res.render("404", { errorMessage: "Page not found." });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
