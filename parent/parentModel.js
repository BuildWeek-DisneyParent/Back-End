const data = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll,
  getParentID,
  addNewParentInfoItem,
  addParentID,
  editParentInfo 
};

function getAll() {
  return data("parentInfo");
}

function getParentID(id) {
  return data("parentInfo as p")
  .join('register as r', 'p.parent_id', 'r.id')
  .where('p.parent_id', id)
}

function addParentID(req, res, next) {
  req.body.id = req.parentInfo.subject;
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



