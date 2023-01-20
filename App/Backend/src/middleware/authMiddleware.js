const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyAdminJWT(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Không thể truy cập" });
    } else {
      req.user = decoded;
      next();
    }
  });
}

function verifyInstructorJWT(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_INSTRUCTOR,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Không thể truy cập" });
      } else {
        req.user = decoded;
        next();
      }
    }
  );
}
function verifyItraineeJWT(req, res, next) {
  const token = req.cookies["jwt"];
  if (!token) return res.status(401).json({ msg: "Không thể truy cập" });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_ITRAINEE,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: err });
      } else {
        req.user = decoded;
        next();
      }
    }
  );
}

module.exports = { verifyAdminJWT, verifyInstructorJWT, verifyItraineeJWT };
