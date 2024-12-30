import { Link } from "react-router-dom";

function ResidualParagraf(props) {
  return (
    <p
      className={`${props.style ? props.style : ""} ${
        props.fontSize ? props.fontSize : ""
      }`}
    >
      {props.paragraf.split("#").map((element) => {
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
        if (props.highlight) {
          const regex = new RegExp(`(${props.highlight})`, "g");
          const nArray = element.split(regex);

          return nArray.map((el) => {
            if (el === props.highlight) {
              return <span className="highlight">{props.highlight}</span>;
            }
            return el;
          });
        }
        return element;
      })}
      {props.newsArticleLastItemButton}
    </p>
  );
}
export default ResidualParagraf;
