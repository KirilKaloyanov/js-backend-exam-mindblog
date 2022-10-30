const Item = require("../models/Item");

async function getAll() {
  try {
    return await Item.find({}).lean();
  } catch (err) {
    // console.log(err);
    return;
  }
}

async function getThreeItems() {
  try {
    const items = await Item.find({}).lean();
    items.reverse();
    const result = items.slice(0, 3);
    return result;
  } catch (err) {
    // console.log(err);
    return;
  }
}

// // PROFILE FILTERING

async function getAllFollowed(userId) {
  const items = await Item.find({}).lean();
  return items.filter((b) =>
    b.subscribeList.map((b) => b.toString()).includes(userId)
  );
}

async function getAllCreated(userId) {
  const items = await Item.find({}).lean();
  return items.filter((b) => b.owner.toString().includes(userId));
}

async function getItem(itemId) {
  try {
    return await Item.findById(itemId).lean();
  } catch (err) {
    // console.log(err);
    return;
  }
}

async function createItem(item) {
  // try {
  await Item.create(item);
  // } catch (err) {
  //   console.log(err);
  //   return err;
  // }
}

async function subscribeItem(itemId, userId) {
  try {
    const item = await Item.findById(itemId);
    item.subscribeList.push(userId);

    await item.save();
  } catch (err) {
    console.log(err);
    return;
  }
}

async function updateItem(itemId, updatedItem) {
  try {
    const item = await Item.findById(itemId);

    Object.assign(item, updatedItem);

    await item.save();
  } catch (err) {
    console.log(err);
    return;
  }
}

async function deleteItem(itemId) {
  try {
    await Item.findByIdAndRemove(itemId);
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = {
  createItem,
  getAll,
  getThreeItems,
  getAllFollowed,
  getAllCreated,
  getItem,
  subscribeItem,
  updateItem,
  deleteItem,
};
