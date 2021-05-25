// user-middleware


const validateUserInput = (req, res, next) => {
  const userInput = req.body;

  //NOTE Check to make sure there's a body & that it has a username
  if (!userInput || !userInput.username) {
    res.status(400).json({ message: "username required" });
  } else {
    next();
  }
};



module.exports = {
  validateUserInput,
};
