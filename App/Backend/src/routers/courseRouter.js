const router = require("express").Router();

const {
  addCoursePromotion,
  getCourses,
  courseSearch,
  getCourseById,
  getLink,
  rateCourse,
  popularCourses,
  addCoursePromotionMulti,
} = require("../controllers/CourseController");

router.get("/listCourses/details", getCourses);
router.get("/:id", getCourseById);
router.get("/most/popular", popularCourses);
router.get("/listCourses/search", courseSearch);
router.patch("/addPromotion", addCoursePromotion);
router.get("/link/view", getLink);
router.post("/setRating", rateCourse);
router.patch("/addPromotionMulti", addCoursePromotionMulti);

module.exports = router;
