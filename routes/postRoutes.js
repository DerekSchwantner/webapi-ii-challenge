const express = require("express");
const router = express.Router();

const Db = require("../data/db");

router.get("/", (req, res) => {
  Db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//GET comments by post id

router.get("/:id/comments", (req, res) => {
  console.log("hit /:id/comments");
  const { id } = req.params;

  Db.findPostComments(id)
    .then(comments => {
      if (comments && comments.length) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//Adding a post

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    const postInfo = await Db.insert(req.body);
    const posts = await Db.find();
    res.status(201).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

// router.post("/", (req, res) => {
//     const { title, contents } = req.body;
//     if (!title || !contents) {
//         res.status(400).json({
//             errorMessage: "Please provide title and contents for the post."
//           })
//     } else {

//     }

// });

module.exports = router;
