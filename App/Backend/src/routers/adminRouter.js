const router = require("express").Router();
const { login,register,createAdmin,createInstructor,logout,createCorporate } = require("..//controllers/AdminController");
const { isAuthAdmin } = require("../controllers/authContext");

const { verifyAdminJWT } = require("../middleware/authMiddleware");
///Authentication/autherization routes

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.post("/create/admin",verifyAdminJWT, createAdmin);
router.post("/create/instructor",verifyAdminJWT, createInstructor);
router.post("/create/corporate",verifyAdminJWT, createCorporate);
router.get("/isAuth", isAuthAdmin);


module.exports = router;
