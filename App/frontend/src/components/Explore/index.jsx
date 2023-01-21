import styles from "./Explore.module.scss";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import { useEffect, useState } from "react";
const fetchURL = "course/most/popular";
const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(fetchURL);
    setCourses(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={styles["Explore"]}>
          <h1>Popular Courses</h1>
          <div className={styles["ineer"]}>
            <Carousel className={styles["carousel"]}>
              <Carousel.Item className={styles["item"]}></Carousel.Item>
              <Carousel.Item className={styles["item"]}>
                <div className={styles["course-list"]}></div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
      )}
    </>
  );
};

export default Explore;
