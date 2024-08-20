import { useState } from "react";
import dot from "../multimedia/kropka.png";

function TestElement(props) {
  const [visableSection, setVisableSection] = useState("false");
  const handleVisableSection = () => {
    setVisableSection(!visableSection);
  };

  const farherName = props.farherName + props.slug;
  return (
    <li key={props.id} className="navElement navElementRedBorder">
      <button
        className="visableSectionButton"
        onClick={() => handleVisableSection()}
      >
        <img className="dot" alt="ozdobik" src={dot} />
        {props.name}
      </button>
      <ul style={visableSection ? { display: "none" } : null}>
        {props.data.map((element) => props.creteElements(element, farherName))}
      </ul>
    </li>
  );
}
export default TestElement;
