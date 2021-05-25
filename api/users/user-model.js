// user-model
const db = require("../../data/db-config");

const find = () => {
  return db("users");
};

const findById = (id) => {
  return db("users").where({ id }).first();
};

const findPosts = (id) => {
  return db("users")
    .join("posts", "users.id", "posts.user_id")
    .select("posts.id", "users.username", "posts.contents")
    .where({ user_id: id });
};

const add = (newUserInfo) => {
  return db("users")
    .insert(newUserInfo)
    .then((ids) => ids[0]);
};

const update = (id, changes) => {
  return db("users").where({ id }).update(changes);
};

const remove = (id) => {
  return db("users").where({ id }).del();
};

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove,
};
