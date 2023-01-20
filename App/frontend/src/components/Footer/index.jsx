import React from "react";
import logo from "../../static/logo.png";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-content-right"]}>
          <h3>Le Minh Phuong</h3>
          <p>
            Tôi là Lê Minh Phương sinh viên năm 4 trường đại học Mỏ -Địa chất Hà
            Nội. Hiện nay có rất nhiều sinh viên có nhu cầu học hỏi từ quá trình
            thực tế do đó web được ra đời với mục đính giúp các sinh viên tiếp
            cận với các khóa học thực tế của công ty và cũng giúp những thực tập
            mới vào công ty có thể tiếp cận với công việc nhanh hơn
          </p>
        </div>
        <div>
          <img src={logo} width="auto" height="150px" alt="mainImage"></img>
        </div>
      </div>

      <hr></hr>
      <div class={styles["footer-bottom"]}>
        <p>Bản quyền &copy;2022 PhuongHoLe </p>
      </div>
    </div>
  );
}

export default Footer;
