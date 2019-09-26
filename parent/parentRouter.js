const express = require("express");
const router = express.Router();
const parent = require("./parentModel");
//const data = require("../data/dbConfig");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

// Base URL - /kitchen



router.get('/parents', (req, res) => {
  parent.find()
    .then(users => {
      res.status(200).json(users)
    
});

});

// addParentID takes user_id from decoded token, adds to user req body
// reqBodyCheck ensures all required fields are present
router.post('/parents', (req, res) => {
  let {email, name, about, phone, parent_id } = req.body;


    parent.add({email, name, about, phone, parent_id })
      .then(newUser => {
        res.status(201).json({
          name: newUser.name,
          about: newUser.about,
          email: newUser.email,
          phone: newUser.phone,
          parent_id: newUser.parent_id
        });
      })
      .catch(error => {
        res.status(500).json({
          error: 'An error occurred during the creation of a new user.',
        });
      });
  
});

// addParentID adds proper user ID
// reqBodyCheck ensures all required fields are present
router.put('/parents/:id', async (req, res) => {
    console.log( req.user);
    try {
      const {
        body: { email,name, about, phone  },
        user: { id },
      } = req;

      const successFlag = await Users.update(id, {email,
        name, about, phone 
      });
      return successFlag > 0
        ? res.status(200).json({
            message: `The user with the id ${id} has been successfully updated!`,
          })
        : res.status(500).json({
            error: `An error occurred within the database thus the user with the id ${id} could not be updated.`,
          });
    } catch (error) {
      const {
        user: { id },
      } = req;

      res.status(500).json({
        error:
          `An error occurred during updating the user with the id ${id}.` +
          error,
      });
    }
  },
);

/*router.delete(
  "/parents/:id",
  parent.addParentID,
  parent.reqBodyCheckDelete,
  (req, res) => {
    const deleted = req.body;
    const deleteId = req.params.id;
    data("parentInfo")
      .where({ id: deleteId })
      .first()
      .then(item => {
        if (deleted.id != item.id) {
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
);*/

module.exports = router;