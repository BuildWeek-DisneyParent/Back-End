const data = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  find,
  findById,
  //addNewParentInfoItem,
  //addParentID,
  //editParentInfo,
  //reqBodyCheckDelete,
  //reqBodyCheckPost,
  update,
  remove,
  add
};

function find() {
  return data("parentInfo");
}

function findById(id) {
  return data("parentInfo as p")
  .join('register as r', 'p.parent_id', 'r.id')
  .where('p.parent_id', id)
}

/*function addParentID(req, res, next) {
  req.body.id = req.parentInfo.subject;
  next();
}*/

// user_id handled by middleware, addUserID
/*function addNewParentInfoItem(newparentInfo) {
  return data("parentInfo").insert(newparentInfo);
}*/

/*function editParentInfo(item) {
  return data("parentInfo")
    .where({ id: item.id })
    .update(item);
}*/


/*function reqBodyCheckDelete(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ Error: "Your request is missing a required field" });
  }
}*/
function update(id, changes) {
  return db('parentInfo')
    .where({ id })
    .update(changes);
}

function add(user) {
  return db('parentInfo')
    .insert(user, 'id')
    .then(([id]) => this.findById(id));
}

function remove(id) {
  return db('parentInfo')
    .where('id', id)
    .del();
}
/*function reqBodyCheckPost(req, res, next) {
  if (
    req.body.quantity &&
    req.body.weightUnit &&
    req.body.inventoryItem &&
    req.body.user_id
  ) {
    next();
  } else {
    res.status(400).json({ Error: "Your request is missing a required field" });
  }*/

