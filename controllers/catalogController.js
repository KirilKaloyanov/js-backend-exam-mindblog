const catalogController = require("express").Router();
const { hasUser, midUser } = require("../middlewares/guards");
const { parseError } = require("../util/parser");
const {
  getAll,
  getAllByStr,
  getItem,
  createItem,
  subscribeItem,
  updateItem,
  deleteItem,
} = require("../services/itemService");
const { getUser } = require("../services/userService");

// GET ITEMS

catalogController.get("/", async (req, res) => {
  const items = await getAll();
  res.render("catalog", {
    title: "Catalog Page",
    items,
  });
});

//CREATE ITEM
catalogController.get("/create", hasUser, (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

catalogController.post("/create", async (req, res) => {
  const item = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    category: req.body.category,
    owner: req.user._id,
  };

  try {
    if (Object.values(item).filter((v) => !v).length > 0)
      throw new Error("All fields are required");

    await createItem(item);
    res.redirect("/catalog");
  } catch (err) {
    const errors = parseError(err);
    res.render("create", {
      title: "Create Page",
      body: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
      },
      errors,
    });
  }
});

//ITEM DETAILS

catalogController.get("/details/:id", midUser, async (req, res) => {
  const itemId = req.params.id;
  const item = await getItem(itemId);
  let subscribersId;
  let owner;
  let followers = [];
  try {
    owner = await getUser(item.owner);
    subscribersId = item.subscribeList;
    for (let subscriberId of subscribersId) {
      const follower = await getUser(subscriberId);
      followers.push(follower.username);
    }
  } catch (err) {
    return;
  }
  let str;
  if (followers) str = followers.join(", ");

  const user = req.user;

  res.render("details", {
    title: "Details Page",
    item,
    user,
    owner,
    str,
  });
});

// SUBSCRIBE

catalogController.get(
  "/subscribe/:id",
  [hasUser, midUser],
  async (req, res) => {
    const itemId = req.params.id;
    const user = req.user;

    if (user.subscribed) return res.redirect("/error");
    if (user.isOwner) return res.redirect("/error");

    await subscribeItem(itemId, user._id);
    res.redirect(`/catalog/details/${itemId}`);
  }
);

//EDIT ITEM

catalogController.get("/edit/:id", [hasUser, midUser], async (req, res) => {
  const itemId = req.params.id;
  const item = await getItem(itemId);
  const user = req.user;

  if (!user.isOwner) return res.redirect("/error");

  res.render("edit", {
    title: "Edit Page",
    item,
  });
});

catalogController.post("/edit/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await updateItem(itemId, req.body);
    res.redirect(`/catalog/details/${itemId}`);
  } catch (err) {
    res.render("edit", {
      title: "Edit Page",
      item: {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
      },
      errors: parseError(err),
    });
  }
});

//DELETE ITEM

catalogController.get("/delete/:id", [hasUser, midUser], async (req, res) => {
  const itemId = req.params.id;
  const user = req.user;

  if (!user.isOwner) return res.redirect("/error");

  await deleteItem(itemId, req.body);
  res.redirect(`/catalog`);
});

module.exports = catalogController;
