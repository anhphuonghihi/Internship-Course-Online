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
        title: "????ng k?? th??nh c??ng",
      });
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Kh??ng c?? ph???n h???i");
      } else if (err.response?.status === 409) {
        setErrMsg("T??n n??y ???? ???????c s??? d???ng");
      } else {
        setErrMsg("????ng k?? kh??ng th??nh c??ng");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className={styles["Auth-form-container"]}>
      <form className={styles["Auth-form"]} onSubmit={handleSumbit}>
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>????ng k??</h3>
          <div>
            ???? ????ng k???
            <Link to="/login" style={{ color: "#a00407" }}>
              ????ng nh???p
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
              H???
              <FontAwesomeIcon
                icon={faCheck}
                className={firstname ? styles["valid"] : styles["hide"]}
              />
            </label>
            <input
              className={styles["form-control"]}
              placeholder="Vd:L?? Minh"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              T??n
              <FontAwesomeIcon
                icon={faCheck}
                className={lastname ? styles["valid"] : styles["hide"]}
              />
            </label>
            <input
              className={styles["form-control"]}
              placeholder="Vd:Ph????ng"
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
              placeholder="Nh???p ?????a ch??? email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              T??n ????ng nh???p
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
              placeholder="T??n ????ng nh???p"
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
            4 ?????n 24 k?? t???.
            <br />
            Ph???i b???t ?????u b???ng m???t ch??? c??i.
            <br />
            Cho ph??p ch??? c??i, s???, d???u g???ch d?????i, d???u g???ch n???i.
          </p>

          <div className={styles["form-group"]}>
            <label className={styles["Auth-label"]}>
              M???t kh???u
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
              placeholder="M???t kh???u"
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
            8 ?????n 24 k?? t???.
            <br />
            Ph???i bao g???m ch??? hoa v?? ch??? th?????ng, s??? v?? k?? t??? ?????c bi???t.
            <br />
            C??c k?? t??? ?????c bi???t ???????c ph??p:
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
              ????ng k??
            </button>
          </div>
          <div className={styles["footForm"]}>
            <input type="checkbox" required />
            <p>
              T??i ?????ng ??
              <Link
                to="/user/terms"
                style={{ marginLeft: 2, color: "#a00407" }}
              >
                ??i???u kho???n v?? ??i???u ki???n
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
