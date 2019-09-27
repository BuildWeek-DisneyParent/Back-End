const express = require("express");
const router = express.Router();
const parent = require("./requestModel");
//const data = require("../data/dbConfig");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const restricted = require('../auth/Restricted-middleware');
const Posts = require('./requestModel')



//GETS LIST OF POSTS
router.get("/requests", (req, res) => {
   Posts.find()
   .then(posts=>{
    res.status(200).json(posts);
   })
   .catch(error=> {
    res.status(500).json({ error: "Could not retrieve Posts" });
   })

});


//GET SPECEFIC ID OF POST
router.get("/requests/:id",(req, res) => {
   Posts.findByID(req.params.id)
  .then(posts => {
  res.status(200).json(posts);
  })
  .catch (error => {
    res.status(500).json({ error: "Error cant get post" });
  })
});

//ADDS POST
router.post('/requests', (req, res) => {
  let {name, meeting_place, time, phone, kids, question } = req.body;


    Posts.add(req.body)
      .then(newPost => {
        res.status(201).json({
          name: newPost.name,
          meeting_place: newPost.meeting_place,
          time: newPost.time,
          phone: newPost.phone,
          kids: newPodt.kids,
          question: newPost.question
        });
      })
      .catch(error => {
        res.status(500).json({
          error: 'An error occurred during the creation of a new user.',
        });
      });
  
});
//UPDATE SPECEIFIED POST
router.put("/requests/:id", async (req, res) => {
  try {
    const updatedPost = await Posts.update(req.params.id, req.body);
    if (updatedPost)
      res
        .status(200)
        .json({ message: `parent: ${updatedPost}`, updatedPostInfo: req.body });
  } catch (error) {
    res.status(500).json({ message: "There was Error updating the post" });
  }
});

// DELETE SPECEFIED POST
router.delete("/requests/:id", async (req, res) => {
  try {
    const deletedPost = await Posts.removePost(req.params.id);
    if (deletedPost) {
      res.status(200).json({ message: "You have successfully deleted the post" });
    } else {
      res.status(404).json({ message: "The post could no be removed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing the post" });
  }
});
module.exports = router;