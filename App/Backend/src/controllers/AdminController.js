const IndividualTrainee = require("..//models/IndividualTrainee");
const bcrypt = require("bcrypt");


const login = async (req, res) => {};
const register = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  if (!username || !password || !email || !password || !firstname || !lastname)
    return res.status(400).json({ msg: "Thông tin nhập chưa đủ !!" });
  const userTrainee = await IndividualTrainee.findOne({ username: username });
  if (userTrainee) {
    return res.status(409).json({ msg: "Tên đăng nhập đã được sử dụng" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);
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
    res.status(200).json({ msg: "Chúc mừng bạn đã tạo tài khoản thành công !!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { login, register };
