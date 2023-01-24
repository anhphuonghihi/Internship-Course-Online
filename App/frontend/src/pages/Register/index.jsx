import styles from "../Login/Auth.module.scss";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//validation
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/admin/register";
const Register = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleSumbit = async (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    const user = {
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      await axios.post(REGISTER_URL, user, config);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Đăng ký thành công",
      });
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Không có phản hồi");
      } else if (err.response?.status === 409) {
        setErrMsg("Tên này đã được sử dụng");
      } else {
        setErrMsg("Đăng ký không thành công");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className={styles["Auth-form-container"]}>
      <form className={styles["Auth-form"]} onSubmit={handleSumbit}>
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>Đăng kí</h3>
          <div>
            Đã đăng ký?
            <Link to="/login" style={{ color: "#a00407" }}>
              Đăng nhập
            </Link>
          </div>
          <p
            ref={errRef}
            className={errMsg ? styles["errmsg"] : styles["offscreen"]}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              Họ
              <FontAwesomeIcon
                icon={faCheck}
                className={firstname ? styles["valid"] : styles["hide"]}
              />
            </label>
            <input
              className={styles["form-control"]}
              placeholder="Vd:Lê Minh"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              Tên
              <FontAwesomeIcon
                icon={faCheck}
                className={lastname ? styles["valid"] : styles["hide"]}
              />
            </label>
            <input
              className={styles["form-control"]}
              placeholder="Vd:Phương"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              Email
              <FontAwesomeIcon
                icon={faCheck}
                className={email ? styles["valid"] : styles["hide"]}
              />
            </label>
            <input
              type="email"
              className={styles["form-control"]}
              placeholder="Nhập địa chỉ email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              Tên đăng nhập
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? styles["valid"] : styles["hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validName || !username ? styles["hide"] : styles["invalid"]
                }
              />
            </label>
            <input
              className={styles["form-control"]}
              placeholder="Tên đăng nhập"
              required
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          <p
            id="uidnote"
            className={
              userFocus && username && !validName
                ? styles["instructions"]
                : styles["offscreen"]
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 đến 24 ký tự.
            <br />
            Phải bắt đầu bằng một chữ cái.
            <br />
            Cho phép chữ cái, số, dấu gạch dưới, dấu gạch nối.
          </p>

          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              Mật khẩu
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? styles["valid"] : styles["hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPwd || !password ? styles["hide"] : styles["invalid"]
                }
              />
            </label>
            <input
              type="password"
              className={styles["form-control"]}
              placeholder="Mật khẩu"
              required
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd
                ? styles["instructions"]
                : styles["offscreen"]
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 đến 24 ký tự.
            <br />
            Phải bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt.
            <br />
            Các ký tự đặc biệt được phép:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>

          <div className={styles["btn-login"]}>
            <button
              disabled={
                !validName || !validPwd || !firstname || !lastname || !email
                  ? true
                  : false
              }
              className={styles["btn"]}
              style={{ backgroundColor: "##0d6efd", border: "none" }}
            >
              Đăng kí
            </button>
          </div>
          <div className={styles["footForm"]}>
            <input type="checkbox" required />
            <p>
              Tôi đồng ý
              <Link
                to="/user/terms"
                style={{ marginLeft: 2, color: "#a00407" }}
              >
                điều khoản và điều kiện
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
