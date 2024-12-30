import listki from "../multimedia/liscie-banner-prawy.png";
import logo from "../multimedia/banner-listopad.png";
import raiderHorse from "../multimedia/polnoc-jezdziec.png";
import raiderTomasz from "../multimedia/poludnie-jezdziec.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="extraSizeMain">
      <Link
        onClick={() => {
          document.getElementById("root").scrollTo(0, 0);
        }}
        className="headerLink"
        to={"/"}
      >
        <div className="horseAndlLeaves Camel">
          <img className="leaves l1" alt="leaves" src={listki} />
          <img className="raiderS" alt="tomasz na koniu" src={raiderHorse} />
        </div>
        <img className="logo" alt="logo" src={logo} />
        <div className="horseAndlLeaves Horse">
          <img className="leaves l2" alt="leaves" src={listki} />
          <img
            className="raiderN"
            alt="look at my horse my horse is amazing"
            src={raiderTomasz}
          />
        </div>
        {/* <img className="leaves l1" alt="leaves" src={listki} /> */}
        {/* <img className="leaves l2" alt="leaves" src={listki} /> */}
        {/* <img
          className="raiderN"
          alt="look at my horse my horse is amazing"
          src={raiderHorse}
        /> */}
        {/* <img className="raiderS" alt="tomasz na koniu" src={raiderTomasz} /> */}
      </Link>
    </header>
  );
}
export default Header;
