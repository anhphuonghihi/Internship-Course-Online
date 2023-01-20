const IndividualTrainee = require("..//models/IndividualTrainee");
const bcrypt = require("bcrypt");
const Instructor = require("..//models/Instructor");
const Admin = require("..//models/Admin");
const jwt = require("jsonwebtoken");
const {
  generateTraineeAccessToken,
  generateInstructorAccessToken,
  generateAdminAccessToken,
} = require("./authContext");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "Thông tin nhập chưa đủ !!" });
  if (await IndividualTrainee.exists({ username: username })) {
    await IndividualTrainee.findOne({ username: username }).then((user) => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "Thông tin vừa nhập không tồn tại" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateTraineeAccessToken({
            id: user._id,
            username: user.username,
          });
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          let status = 0;
          if (user.state) {
            status = 2;
          }
          res.cookie("currentUser", user._id, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res
            .status(401)
            .json({ msg: "Thông tin xác thực không hợp lệ" });
        }
      });
    });
  } else if (await Instructor.exists({ username: username })) {
    await Instructor.findOne({ username: username }).then((user) => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "Thông tin vừa nhập không tồn tại" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateInstructorAccessToken({
            id: user._id,
            username: user.username,
          });
          const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          const status = 1;
          res.cookie("currentUser", user._id, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res
            .status(401)
            .json({ msg: "Thông tin xác thực không hợp lệ" });
        }
      });
    });
  } else {
    await Admin.findOne({ username: username }).then((user) => {
      if (!user)
        return res
          .status(400)
          .json({ msg: "Thông tin vừa nhập không tồn tại" });
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;
        if (data) {
          const accessToken = generateAdminAccessToken({
            id: user._id,
            username: user.username,
          });
          const status = 3;
          res.cookie("status", status, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json(user);
        } else {
          return res
            .status(401)
            .json({ msg: "Thông tin xác thực không hợp lệ" });
        }
      });
    });
  }
};
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await Admin.findOne({ username: username });
  if (exists) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  if (!username || !password) {
    return res.status(400).json({ msg: "Thông tin nhập chưa đủ !!" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username: username,
      password: hashedPassword,
    });
    try {
      const admin = await Admin.create(newAdmin);
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
//create Instructor
const createInstructor = async (req, res) => {
  const { firstname, lastname, username, password, email, gender } = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newInstructor = new Instructor({
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: hashedPassword,
    email: email,
    gender: gender,
  });
  try {
    const instructor = await Instructor.create(newInstructor);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//create Corporate
const createCorporate = async (req, res) => {
  const { firstname, lastname, username, password, email, gender } = req.body;
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newCorporate = new IndividualTrainee({
    firstname: firstname,
    lastname: lastname,
    username: username,
    state: true,
    password: hashedPassword,
    email: email,
    gender: gender,
  });
  try {
    const corporate = await IndividualTrainee.create(newCorporate);
    res.status(200).json(corporate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  if (!username || !password || !email || !password || !firstname || !lastname)
    return res.status(400).json({ msg: "Thông tin nhập chưa đủ !!" });
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  const userInstructor = await Instructor.findOne({ username: username });
  if (userTrainee || userInstructor) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  if (userTrainee) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new IndividualTrainee({
    username: username,
    password: hashedPassword,
    state: false,
    email: email,
    firstname: firstname,
    lastname: lastname,
  });
  try {
    const user = await IndividualTrainee.create(newUser);
    res
      .status(200)
      .json({ msg: "Chúc mừng bạn đã tạo tài khoản thành công !!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  res.clearCookie("currentUser");
  res.clearCookie("jwt");
  res.clearCookie("status");
  res.status(200).json({ msg: "đăng xuất thành công" });
};
module.exports = {
  login,
  register,
  createAdmin,
  createInstructor,
  createCorporate,
  logout
};
