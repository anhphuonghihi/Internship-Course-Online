import "./Home.scss";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Thumbnail from "../../components/Thumbnail";
import ThunbailLog from "../../components/ThunbailLog";
const cookies = new Cookies();
const Home = () => {
  const status = 1
  if (status) {
    if (status === 0 || status === 2) {
      return (
        <div className="home">
          <nav className="smallNav">
            <div>
              <Link to="/">
                <button className={"Inprogress"}>Khám phá</button>
              </Link>
              <Link to="/mylearning">
                <button className={"notPressed"}>Việc học của tôi</button>
              </Link>
            </div>
          </nav>
          <ThunbailLog />
          <Footer />
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="home">
          <nav className="smallNav">
            <div>
              <Link to="/">
                <button className={"Inprogress"}>Khám phá</button>
              </Link>
              <Link to="/mycourses">
                <button className={"notPressed"}>Các khóa học của tôi </button>
              </Link>
              <Link to="/createcourse">
                <button className={"notPressed"}>Tạo khóa học mới </button>
              </Link>
            </div>
          </nav>
          <ThunbailLog />
          <Footer />
        </div>
      );
    }
  } else {
    return (
      <div className="home">
        <Thumbnail />
        <Footer />
      </div>
    );
  }
};

export default Home;
