const Course = require("../models/Course");
const Link = require("../models/Link");
const IndividualTrainee = require("../models/IndividualTrainee");
const Rating = require("../models/Rating");
const popularCourses = async (req, res) => {
  const courses = await Course.find().sort({ studentCount: -1 }).limit(10);
  if (!courses) {
    res.status(400).json({ error: "Trống rỗng" });
  } else {
    res.status(200).json(courses);
  }
};
const courseSearch = async (req, res) => {
  const search = req.query["search"];
  const courses = await Course.find({
    $or: [
      { subject: { $regex: new RegExp(search, "i") } },
      { title: { $regex: new RegExp(search, "i") } },
      { instructorname: { $regex: new RegExp(search, "i") } },
    ],
  });
  if (!courses) {
    res.status(400).json({ error: "Trống rỗng" });
  } else {
    res.status(200).json(courses);
  }
};

const getCourses = async (req, res) => {
  let currentDate = new Date().toISOString();

  await Course.updateMany(
    {
      discount_enddate: { $lte: currentDate },
    },
    { discount: 0 }
  );
  try {
    const courses = await Course.find({}).populate("instructor");
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).json({ mssg: "không thể tìm thấy các khóa học" });
  }
};

const getCourseById = async (req, res) => {
  const id = req.params["id"];
  const userId = req.cookies?.currentUser;
  try {
    const course = await Course.findById(id)
      .populate("instructor")
      .populate("subtitles.link")
      .exec();
    const reviews = await Rating.find({ state: true, courseId: id }).populate(
      "userId"
    );
    let exists = false;
    if (userId) {
      exists = await IndividualTrainee.exists({
        _id: userId,
        "registered_courses.courseId": id,
      });
    }
    const result = {
      firstField: course,
      secondField: reviews,
      thirdField: exists,
    };
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ mssg: "Không tìm thấy khóa học" });
  }
};

const addCoursePromotion = async (req, res) => {
  const id = req.body.id;
  const disc = req.body.promo;
  const enddate = req.body.enddate;
  try {
    await Course.findByIdAndUpdate(
      id,
      {
        discount: disc,
        discount_enddate: enddate,
      },
      { new: true }
    );
    res.status(200).json("Cập nhật");
  } catch (err) {
    res.status(500).json({ mssg: "Không tìm thấy" });
  }
};

const addCoursePromotionMulti = async (req, res) => {
  const idArr = req.body.idArr;
  const disc = req.body.promo;
  const enddate = req.body.enddate;
  try {
    await idArr.map(async (el) => {
      let course = await Course.findByIdAndUpdate(
        el,
        {
          discount: disc,
          discount_enddate: enddate,
        },
        { new: true }
      );
    });

    res.status(200).json("Cập nhật");
  } catch (err) {
    res.status(500).json({ mssg: "không tìm thấy" });
  }
};

const getLink = async (req, res) => {
  const id = req.query.linkId;
  try {
    const data = await Link.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ mssg: "không tìm thấy" });
  }
};
const rateCourse = async (req, res) => {
  const { courseId, userId, userRating, userReview } = req.body;
  if (!courseId || !userId) {
    return res.status(400).json({ error: "Empty" });
  }
  try {
    const data = await Course.findById(courseId).exec();
    let oldRating = parseInt(data.rating);
    let oldCount = parseInt(data.ratingCount);
    let x = parseInt(userRating);
    const exists = await Rating.findOne({
      userId: userId,
      courseId: courseId,
      state: true,
    }).exec();
    if (exists) {
      let currentRating = parseInt(exists.userRating);
      let newRating = oldRating - currentRating + x;
      const updateRating = await Rating.findOneAndUpdate(
        { userId: userId, courseId: courseId, state: true },
        { userRating: userRating, userReview: userReview },
        { new: true }
      ).exec();
      const updateCourse = await Course.updateOne(
        { _id: courseId },
        { $set: { rating: newRating } }
      ).exec();
      return res.status(200).json({ msg: "Rating updated" });
    } else {
      let newRating = oldRating + x;
      let newCount = oldCount + 1;
      const newRatingObj = await Rating.create({
        userId: userId,
        userRating: userRating,
        userReview: userReview,
        state: true,
        courseId: courseId,
      });
      const updateCourse = await Course.findByIdAndUpdate(courseId, {
        $set: { rating: newRating, ratingCount: newCount },
      });
      const updateIndvidual = await IndividualTrainee.updateOne(
        { _id: userId, "registered_courses.courseId": courseId },
        { $set: { "registered_courses.$.courseRating": newRatingObj._id } }
      ).exec();
      res.status(200).json({ msg: "Đánh giá thành công" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  addCoursePromotion,
  getCourses,
  courseSearch,
  getCourseById,
  getLink,
  rateCourse,
  popularCourses,
  addCoursePromotionMulti,
};
