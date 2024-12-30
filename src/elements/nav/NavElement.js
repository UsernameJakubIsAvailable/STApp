import { useState } from "react";
import dot from "../multimedia/nowakropka.png";

function TestElement(props) {
  const [visableSection, setVisableSection] = useState("true");
  const handleVisableSection = () => {
    setVisableSection(!visableSection);
  };
  const farherName = props.farherName
    ? props.farherName + props.slug
    : props.slug;
  return (
    <li key={props.id} className="navElement navElementRedBorder">
      <button
        className={
          props.farherName !== ""
            ? "visableSectionButton noBold"
            : "visableSectionButton"
        }
        onClick={() => handleVisableSection()}
      >
        <img
          className={props.farherName !== "" ? "dot smallDot" : "dot"}
          alt="ozdobik"
          src={dot}
        />
        {props.name}
      </button>
      {/* {!visableSection && (
        <ul className="dropingElement">
          {props.data.map((element) =>
            props.creteElements(element, farherName)
          )}
        </ul> 
      )} */}
      <div className={!visableSection ? "droping dropingVisible" : "droping"}>
        <ul>
          {props.data.map((element) =>
            props.creteElements(element, farherName)
          )}
        </ul>
      </div>
    </li>
  );
}
export default TestElement;
