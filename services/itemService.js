const Item = require("../models/Item");

async function getAll() {
  try {
    return await Item.find({}).lean();
  } catch (err) {
    console.log(err);
    return;
  }
}

// // PROFILE FILTERING

// async function getAllByUser(userId) {
//   const items = await Item.find({}).lean();
//   return items.filter((b) =>
//     b.subscribeList.map((b) => b.toString()).includes(userId._id)
//   );
// }

// // SEARCH ENGINE FILTERING
// async function getAllByStr(nameStr, methodStr) {
//   let items = await Item.find({ method: methodStr }).lean();
//   const nameStrI = nameStr.toLowerCase();
//   items = items.filter((i) => i.name.toLowerCase().includes(nameStrI));
//   return items;
// }

// async function getItem(itemId) {
//   try {
//     return await Item.findById(itemId).lean();
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

// async function createItem(item) {
//   try {
//     await Item.create(item);
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

// async function subscribeItem(itemId, userId) {
//   try {
//     const item = await Item.findById(itemId);
//     item.subscribeList.push(userId);

//     await item.save();
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

// async function updateItem(itemId, updatedItem) {
//   try {
//     const item = await Item.findById(itemId);

//     Object.assign(item, updatedItem);

//     await item.save();
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

// async function deleteItem(itemId) {
//   try {
//     await Item.findByIdAndRemove(itemId);
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// }

module.exports = {
  // createItem,
  getAll,
  // getAllByStr,
  // getAllByUser,
  // getItem,
  // subscribeItem,
  // updateItem,
  // deleteItem,
};
