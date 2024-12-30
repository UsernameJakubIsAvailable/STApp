import { Link } from "react-router-dom";

function TitleNews(props) {
  // const scorllTop = () => {
  //   document.getElementById("articleLi").scrollTo(0, 0);
  // };
  return (
    <section className="titleAndDate">
      <Link className="articleTitle" to={"/Aktualnosci/" + props.title}>
        {props.title}
      </Link>
      <p>{props.date}</p>
    </section>
  );
}
export default TitleNews;
