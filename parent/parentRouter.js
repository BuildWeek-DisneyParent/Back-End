const express = require("express");
const router = express.Router();
const parent = require("./parentModel");
const data = require("../data/dataConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Base URL - /kitchen



router.get("/parentInfo", (req, res) => {
  let id = req.id.subject;
  parent
    .getParent(id)
    .then(userparentInfo => {
      res.status(200).json(userparentInfo);
    })
    .catch(error => {
      res.status(500).json({ Error: "Something's gone horribly wrong" });
    });
});

// addUserID takes user_id from decoded token, adds to user req body
// reqBodyCheck ensures all required fields are present
router.post(
  "/parentInfo",
  parent.addUserID,
  parent.reqBodyCheckPost,
  (req, res) => {
    const newInven = req.body;
    let id = req.userInfo.subject;
    // adds new item to database
    parent
      .addNewparentInfoItem(newInven)
      .then(newItemId => {
        // Per front-end request, fetches user's new parentInfo
        parent.getUserparentInfo(id).then(userparentInfo => {
          // Sends frontend new item number + user's parentInfo
          res.status(200).json({ newItemId, userparentInfo });
        });
      })
      .catch(error => {
        res.status(500).json({ Error: "Something's gone horribly wrong" });
      });
  }
);

// addUserID adds proper user ID
// reqBodyCheck ensures all required fields are present
router.put(
  "/parentInfo",
  parent.addUserID,
  parent.reqBodyCheckPut,
  (req, res) => {
    const editItem = req.body;
    // data call to parentInfo checks if user has authorization to delete the item
    data("parentInfo")
      .where({ id: editItem.id })
      .first()
      .then(item => {
        // checks if the user_id added by parent.addUserID is the same as the userID
        // in the database on the item to be deleted
        if (editItem.user_id != item.user_id) {
          // Forbids users from editing parentInfo items they don't own
          res.status(401).json({
            Error: "You are not authorized to edit another user's parentInfo"
          });
        } else {
          parent.editparentInfo(editItem).then(editedItem => {
            res.status(200).json(editedItem);
          });
        }
      })
      .catch(error => {
        res.status(500).json({ Error: "Something's gone horribly wrong" });
      });
  }
);

router.delete(
  "/parentInfo/:id",
  parent.addUserID,
  parent.reqBodyCheckDelete,
  (req, res) => {
    const deleted = req.body;
    const deleteId = req.params.id;
    data("parentInfo")
      .where({ id: deleteId })
      .first()
      .then(item => {
        if (deleted.user_id != item.user_id) {
          res.status(401).json({
            Error: "You are not authorized to delete another user's parentInfo"
          });
        } else {
          parent.deleteItem(deleteId).then(delItem => {
            res.status(200).json(delItem);
          });
        }
      })
      .catch(error => {
        res.status(500).json({ Error: "Something's gone horribly wrong" });
      });
  }
);

module.exports = router;