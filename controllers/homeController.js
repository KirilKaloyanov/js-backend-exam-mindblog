const homeController = require("express").Router();
const { getThreeItems } = require("../services/itemService");

//TODO replace with real controller by assignment

homeController.get("/", async (req, res) => {
  const items = await getThreeItems();
  res.render("home", {
    title: "Mind Blog",
    user: req.user,
    items,
  });
});

homeController.get("/error", (req, res) => {
  res.render("error", {
    title: "404 Page",
  });
});

module.exports = homeController;
