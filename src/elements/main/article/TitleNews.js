import { Link } from "react-router-dom";

function TitleNews(props) {
  return (
    <section className="titleAndDate">
      <Link className="articleTitle" to={"/" + props.title}>
        {props.title}
      </Link>
      <p>{props.date}</p>
    </section>
  );
}
export default TitleNews;
