require("dotenv").config;
const jwt = require("jsonwebtoken");
const generateTraineeAccessToken = (trainee) => {
  return jwt.sign(trainee, process.env.ACCESS_TOKEN_SECRET_ITRAINEE, {
    expiresIn: "1d",
  });
};
const generateInstructorAccessToken = (instructor) => {
  return jwt.sign(instructor, process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR, {
    expiresIn: "1d",
  });
};

const generateAdminAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET_ADMIN, {
    expiresIn: "1d",
  });
};

const generateTraineeRefreshToken = (trainee) => {
  return jwt.sign(trainee, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const isAuthAdmin = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Không thể truy cập" });
    else {
      res.status(200).json({ msg: "Được phép" });
    }
  });
};
const isAuthTrainee = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
    (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Không thể truy cập" });
      else {
        res.status(200).json({ msg: "Được phép" });
      }
    }
  );
};
const isAuthInstructor = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
    (err, decoded) => {
      if (err)
        return res.status(401).json({ msg: "Không thể truy cập" }); 
      else {
        res.status(200).json({ msg: "Được phép" });
      }
    }
  );
};
module.exports = {
  generateTraineeAccessToken,
  generateInstructorAccessToken,
  generateAdminAccessToken,
  isAuthAdmin,
  isAuthInstructor,
  isAuthTrainee,
};
