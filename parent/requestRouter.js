//GETS LIST OF POSTS
router.get("/", restricted, async (req, res) => {
    try {
      const posts = await Post.getPost(req.params.id);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve Posts" });
    }
  });
  //GET SPECEFIC ID OF POST
  router.get("/:id", restricted, async (req, res) => {
    const posts = await Post.getById(req.params.id);
    try {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Post by that user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error cant get post" });
    }
  });
  
  //ADDS POST
  router.post("/", restricted, async (req, res) => {
    const { parent_id, title, attraction, children, time } = req.body;
    if (!parent_id || !title || !attraction || !children || !time) {
      res.status(400).json({ message: "Please provide missing information" });
    }
    try {
      const posts = await Post.add(req.body);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ err: "The post could not be added at this time." });
    }
  });
  
  //UPDATE SPECEIFIED POST
  router.put("/:id", restricted, async (req, res) => {
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
  
  // DELETE SPECEFIED POST
  router.delete("/:id", restricted, async (req, res) => {
    try {
      const deletedPost = await Post.removePost(req.params.id);
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