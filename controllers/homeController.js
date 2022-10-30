const homeController = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  getThreeItems,
  getAllFollowed,
  getAllCreated,
} = require("../services/itemService");

//TODO replace with real controller by assignment

homeController.get("/", async (req, res) => {
  const items = await getThreeItems();
  res.render("home", {
    title: "Mind Blog",
    user: req.user,
    items,
  });
});

homeController.get("/profile", hasUser, async (req, res) => {
  const user = req.user;
  const itemsFollowed = await getAllFollowed(user._id);
  const itemsFollowedCount = itemsFollowed.length;
  const itemsCreated = await getAllCreated(user._id);
  const itemsCreatedCount = itemsCreated.length;
  res.render("profile", {
    title: "Profile Page",
    user,
    itemsFollowed,
    itemsFollowedCount,
    itemsCreated,
    itemsCreatedCount,
  });
});

homeController.get("/error", (req, res) => {
  res.render("error", {
    title: "404 Page",
  });
});

module.exports = homeController;
