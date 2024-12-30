import { Link } from "react-router-dom";
import OrnamentLetter from "./OrnamentLetter";

function FirsParagraf(props) {
  return (
    <>
      <p
        className={`${props.style ? props.style : ""} ${
          props.fontSize ? props.fontSize : ""
        }`}
      >
        <OrnamentLetter
          letter={props.firstParagraf.slice(0, 1).toUpperCase()}
        />
        {/* {props.firstParagraf.slice(1, props.firstParagraf.length)}
      {props.firstParagraf.slice(1, props.firstParagraf.length)} */}
        {props.firstParagraf
          .slice(1, props.firstParagraf.length)
          .split("#")
          .map((element) => {
            if (element.includes("LINK")) {
              const link = element.split("^");
              return (
                <Link className="articleLink" to={link[1]}>
                  {link[2]}
                </Link>
              );
            }
            if (element.includes("ALink")) {
              const link = element.split("^");
              return (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="articleLink"
                  href={link[1]}
                >
                  {link[2]}
                </a>
              );
            }
            return element;
          })}
        {props.newsArticleLastItemButton}
      </p>
    </>
  );
}

export default FirsParagraf;
