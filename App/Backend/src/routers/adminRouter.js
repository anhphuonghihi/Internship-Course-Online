const router = require("express").Router();
const { login,register } = require("..//controllers/AdminController");

///Authentication/autherization routes
router.post("/login", login);
router.post("/register", register);
module.exports = router;
