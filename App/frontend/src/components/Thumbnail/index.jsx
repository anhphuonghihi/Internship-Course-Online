import styles from "./Thumbnail.module.scss"
const Thumbnail = () => {
    return ( <section className={styles["main"]}>
      <section className={styles["container"]}>
      <label>Hãy</label>
          <h1>
          học trực truyến
          </h1>
          <label>ở nhà của bạn</label>
          <div  className={styles["container-signUp"]}>
            <button className={styles["container-signUp-1"]} onClick={()=>window.location.href="/register"}>Đăng kí</button>
            <button className={styles["container-signUp-2"]} onClick={()=>window.location.href="/login"}>Đăng nhập</button>
          </div>
      </section>
          

    </section>)
}
 
export default Thumbnail;