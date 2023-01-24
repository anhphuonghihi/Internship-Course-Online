import React from "react";
import styles from "./Navbar.module.scss";
import { useState } from "react";
import logo from "../../static/logo.png";
import { BsSearch } from "react-icons/bs";
import Cookies from "universal-cookie";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SelectCountry from "../SelectCountry";
import Divider from "@mui/material/Divider";
import axios from "axios";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
const LOGOUT_URL = "/admin/logout";
const cookies = new Cookies();
const Navbar = () => {
  const role = cookies.get("status");
  console.log(role);
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : ["o"];
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const handleSearch = async (event) => {
    event.preventDefault();
    navigate({
      pathname: "/search",
      search: `?search=${searchString}`,
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isTrainee = () => {
    return role === 0 || role === 2;
  };
  const isInstructor = () => {
    return role === 1;
  };
  const handleLogOut = async () => {
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      await axios.get(LOGOUT_URL, { username }, config);
      localStorage.removeItem("username");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const navigateTerms = () => {
    if (isTrainee()) {
      navigate("/user/terms");
    } else {
      navigate("/instructor/terms");
    }
  };
  const hanldleMycourses = () => navigate("/mycourses");
  const handleCreateCourse = () => navigate("createcourse");
  const navigateMyLearning = () => navigate("/mylearning");
  const handlePrevReports = () => navigate("/PrevReports");
  const handlereviews = () => navigate("/reviews");
  const navigateprevReportsTrainee = () => navigate("/PrevReportsTrainee");
  const navigateAccountSettings = () => navigate("/accountsettings");
  const navigatePaymentMethods = () => navigate("/paymentmethods");
  const handleBalance = () => navigate("/wallet");
  const navigatetoProfile = () => navigate("/profile");
  const open = Boolean(anchorEl);

  return (
    <div className={styles["navbar"]}>
      <h1 className={styles["headerTitle"]}>
        <Link to="/">
          <img
            src={logo}
            width="auto"
            height="50"
            alt="mainImage"
            className={styles["headerTitle"]}
          ></img>
        </Link>
      </h1>
      <form onSubmit={handleSearch} className={styles["search-bar"]}>
        <div className={styles["search-icon"]} onClick={handleSearch}>
          <BsSearch />
        </div>
        <input
          className={styles["input"]}
          placeholder="Tìm kiếm"
          value={searchString}
          required
          onChange={(event) => setSearchString(event.target.value)}
        ></input>
      </form>
      <div className={styles["linkContainer"]}>
        <SelectCountry
          style={{ marginTop: "1rem", width: "10%" }}
        ></SelectCountry>
        <Link to="/" className={styles["links"]}>
          Trang chủ
        </Link>
        <Link to="/courses" className={styles["links"]}>
          Khóa học
        </Link>
        {!role && (
          <>
            <Link to="/login" className={styles["links"]}>
              Đăng nhập
            </Link>
            <Link to="/register" className={styles["links"]}>
              Đăng ký
            </Link>
          </>
        )}
        {role && (
          <div className={styles["dropUser"]}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {username[0].toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={navigatetoProfile}>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={navigateAccountSettings}>Cài đặt</MenuItem>
              {isTrainee() && (
                <>
                  <MenuItem onClick={navigatePaymentMethods}>
                    Thanh toán
                  </MenuItem>
                  <MenuItem onClick={navigatetoProfile}>Số dư</MenuItem>
                </>
              )}
              {isTrainee() && (
                <MenuItem onClick={navigateMyLearning}>
                  Khóa đang học của tôi
                </MenuItem>
              )}
              {isTrainee() && (
                <MenuItem onClick={navigateprevReportsTrainee}>
                  Báo cáo
                </MenuItem>
              )}
              {isInstructor() && (
                <>
                  <MenuItem onClick={hanldleMycourses}>
                    Các khóa học của tôi
                  </MenuItem>
                  <MenuItem onClick={handleCreateCourse}>Tạo khóa học</MenuItem>
                  <MenuItem onClick={handleBalance}>Số dư</MenuItem>
                  <MenuItem onClick={handlePrevReports}>Báo cáo</MenuItem>
                  <MenuItem onClick={handlereviews}>
                    Đánh giá của tôi
                  </MenuItem>
                </>
              )}
              <Divider />
              <MenuItem onClick={navigateTerms}>
                Điều khoản và điều kiện
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
