const express = require("express");
const router = express.Router();
const parent = require("./parentModel");
//const data = require("../data/dbConfig");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const restricted = require('../auth/Restricted-middleware');
// Base URL - /kitchen



//GET LIST OF ALL PARENTS
router.get('/parents', (req,res) => {
parent.find()
   .then(parents =>{
          res.status(200).json(parents)
        })

   .catch(error => {
      res.status(500).json({error: 'Could not retrieve list of parents.'});
  })

})

//parent by id
router.get('/parents/:id',(req, res) => {
  parent.findById()
      .then(users => {
      res.json(users);
      })
      .catch(err => res.send(err));
    });
// addParentID takes user_id from decoded token, adds to user req body
// reqBodyCheck ensures all required fields are present
router.post('/parents', (req, res) => {
  let {parent_email, name, about, phone } = req.body;


    parent.add(req.body)
      .then(newUser => {
        res.status(201).json({
          name: newUser.name,
          about: newUser.about,
          parent_email: newUser.parent_email,
          phone: newUser.phone
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
//UPDATE THE ID
//UPDATE SPECEIFIED POST
router.put("/parents/:id", restricted, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body);
    if (updatedPost)
      res
        .status(200)
        .json({ message: `parent: ${updatedPost}`, updatedPostInfo: req.body });
  } catch (error) {
    res.status(500).json({ message: "There was Error updating the post" });
  }
});
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

//DELETE 
router.delete('/parents/:id', async() => {
  try {
      const parents = await parent.remove();
      if(parents) {
          const post = await postMessage.get
      }
  } catch (error) {
      
  }
  })

module.exports = router;