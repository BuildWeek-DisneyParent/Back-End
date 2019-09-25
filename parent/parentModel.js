const data = require("../data/data-Config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll,
  getParent,
  addNewParentInfoItem,
  addParentID,
  editParentInfo,
  deleteItem
  
};

function getAll() {
  return data("parentInfo");
}

function getParent(id) {
  return data("parentInfo as p")
  .join('register as r', 'p.parent_id', 'r.id')
  .where('p.parent_id', id)
  .select('p.name', 'r.fullname', 'r.email', "p.parent_email")
}

function addParentID(req, res, next) {
  req.body.id = req.userInfo.subject;
  next();
}

// user_id handled by middleware, addUserID
function addNewParentInfoItem(newparentInfo) {
  return data("parentInfo").insert(newparentInfo);
}

function editParentInfo(item) {
  return data("parentInfo")
    .where({ id: item.id })
    .update(item);
}

function deleteItem(deleteId) {
  return data("parentInfo")
    .where({ id: deleteId })
    .del();
}

