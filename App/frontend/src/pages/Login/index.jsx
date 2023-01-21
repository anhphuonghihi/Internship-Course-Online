import styles from "./Auth.module.scss";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from "sweetalert2";
const LOGIN_URL = "/admin/login";
const cookies = new Cookies();
const Login = () => {
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  useEffect(() => {
    // clearAuth();
  }, []);
  const handleSumbit = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(LOGIN_URL, user, config);
      localStorage.setItem("username", res.data.username);
      if (cookies.get("status") === 3) {
        navigate("/admin/dashboard");
      } else if (cookies.get("status") === 1) {
        if (res.data.firstLogIn) {
          setShow(true);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Không có phản hồi");
      } else if (err.response?.status === 400) {
        setErrMsg("Tên người dùng không tồn tại");
      } else {
        setErrMsg("Thông tin không hợp lệ");
      }
    }
  };
  const ResetPassword = async (event) => {
    console.log(newPassword);
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Mật khẩu phải trùng khớp",
      });
    } else {
      try {
        await axios.post("/instructor/firstLoginReset", {
          password: newPassword,
        });
        setShow(false);
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Đặt lại mật khẩu thành công",
        });
      } catch (e) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Lỗi",
        });
      }
    }
  };
  return (
    <div className={styles["Auth-form-container"]}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ResetPassword}>
            <div className={styles["Auth-form-content"]}>
              <div className={styles["form-group"]}>
                <label className={styles["Auth-label"]}>Mật khẩu</label>
                <input
                  type="password"
                  className={styles["form-control"]}
                  required
                  style={{ flex: 3 }}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles["form-group"]}>
                <label className={styles["Auth-label"]}>
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  style={{ flex: 3 }}
                  className={styles["form-control"]}
                  placeholder="Nhập lại mật khẩu"
                  required
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <div className={styles["btn-login"]}>
                <button
                  disabled={!newPassword || !confirmPassword ? true : false}
                  className={styles["btn"]}
                  style={{ border: "none" }}
                >
                  Tiếp tục
                </button>
              </div>
              <div className={styles["footForm"]}>
                <input type="checkbox" required />
                <p>
                  Tôi đồng ý
                  <Link
                    to="/user/terms"
                    style={{ color: "#a00407", marginLeft: 2 }}
                  >
                    điều khoản và điều kiện
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
        </Modal.Footer>
      </Modal>
      <form className={styles["Auth-form"]} onSubmit={handleSumbit}>
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>Đăng nhập</h3>
          <p
            ref={errRef}
            className={errMsg ? styles["errmsg"] : styles["offscreen"]}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>Tài khoản</label>
            <input
              type="username"
              className={styles["form-control"]}
              required
              placeholder="Nhập tài khoản"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>Mật khẩu</label>
            <input
              type="password"
              className={styles["form-control"]}
              placeholder="Nhập mật khẩu"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles["btn-login"]}>
            <button
              disabled={!username || !password ? true : false}
              className={styles["btn"]}
              style={{ backgroundColor: "#a00407", border: "none" }}
            >
              Đăng nhập
            </button>
          </div>
          <p className={styles["footforget"]}>
            <Link to="/forgotpassword" style={{ color: "#a00407" }}>
              Quên mật khẩu?
            </Link>
          </p>
          <p className={styles["NoAccount"]}>
            Không có tài khoản?
            <Link to="/register" style={{ color: "#a00407 " }}>
              Đăng kí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
