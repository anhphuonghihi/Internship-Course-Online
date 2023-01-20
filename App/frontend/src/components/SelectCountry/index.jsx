import CountryDropdown from "country-dropdown-with-flags-for-react";
import style from "./SelectCountry.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

function SelectCountry() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = async (e) => {
    window.sessionStorage.setItem("originCountry", e.target.value);
    const arr = window.sessionStorage.getItem("originCountry").split(" (");
    window.sessionStorage.setItem("country", arr[0]);
    fetch(
      `https://restcountries.com/v2/name/${window.sessionStorage.getItem(
        "country"
      )}`
    ).then(async (response) => {
      const data = await response.json();
      if (window.sessionStorage.getItem("country") === "United States") {
        window.sessionStorage.setItem("currency", "usd");
      } else {
        window.sessionStorage.setItem("currency", data[0].currencies[0].code);
      }
      const curr = window.sessionStorage.getItem("currency").toLowerCase();
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${curr}.json`
      ).then(async (response) => {
        const data = await response.json();
        let y = Object.values(data);
        window.sessionStorage.setItem("factor", y[1]);
        if (window.location.href === "http://localhost:3000/course" ){
        const courseId = location.state.id;
        navigate(location, { state: { id: courseId }});
        }
        else{
          navigate(location);
        }
      });
    });
  };
  return (
    <div className="chooseCountry">
      <CountryDropdown
        id="UNIQUE_ID"
        className={style["YOUR_CSS_CLASS"]}
        value={[window.sessionStorage.getItem("country")]}
        handleChange={handleChange}
      ></CountryDropdown>
    </div>
  );
}

export default SelectCountry;
