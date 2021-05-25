const express = require("express");

const User = require("./user-model");
const { validateUserInput } = require("./user-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  User.findPosts(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next(err));
});

router.post("/", validateUserInput, (req, res, next) => {
  const { username } = req.body;

  User.add({ username })
    .then((id) => {
      res.status(201).json({ created: id });
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  User.update(id, changes)
    .then((count) => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  User.remove(id)
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
