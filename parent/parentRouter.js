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
router.get('/parents/:id', restricted, (req, res) => {
  parent.findById()
      .then(users => {
      res.json(users);
      })
      .catch(err => res.send(err));
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
//UPDATE THE ID
router.put('/parents/:id', restricted, (req, res) => {

  if (req.body.password){
      const hash = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hash;
  }

  parent.update()
      .then(users => {
      res.json(users);
      })
      .catch(err => res.send(err));
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