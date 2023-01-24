const IndividualTrainee = require("../models/IndividualTrainee");
const Instructor = require("../models/Instructor");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const resetPassword = require("./ResetPassword");
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(500).json("Chưa nhập email");
  }
  const oldUser = await IndividualTrainee.findOne({ email: email });
  const oldInstructor = await Instructor.findOne({ email: email });
  if (!oldUser && !oldInstructor) {
    return res.status(406).json("người dùng không tồn tại!!");
  }
  const randomCode = Math.floor(Math.random() * 899999 + 100000) + "";
  const salt = await bcrypt.genSalt(10);
  const hashedCode = await bcrypt.hash(randomCode, salt);
  await OTP.deleteMany({ email: email });
  const otp = new OTP({
    email: email,
    otp: hashedCode,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60000,
  });
  const data = await OTP.create(otp);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "ONLINE_COURSE_FOR_INTERNS@gmail.com",
    to: email,
    subject: "Quên mật khẩu",
    html: `${resetPassword(randomCode)}`,
  };
  await transporter.sendMail(mailOptions);
};
const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const data = await OTP.findOne({ email: email });
  if (!data) return res.status(498).json("Mã không tồn tại");
  const expiresAt = data.expiresAt;
  if (expiresAt < Date.now()) {
    await OTP.deleteMany({ email: email });
    return res.status(498).json("Mã đã hết hạn");
  }
  const isValid = await bcrypt.compare(code, data.otp);
  if (!isValid) return res.status(406).json("Sai mã");
  else {
    await OTP.deleteMany({ email: email });
    return res.status(200).json("Thành công");
  }
};
module.exports = {
  forgetPassword,
  verifyCode,
};
