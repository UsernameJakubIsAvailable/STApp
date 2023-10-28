import { Link } from "react-router-dom"

function TitleNews(props){

    return(
        <section className="titleAndDate">
        <Link to={'/'+props.title}>
            <h1 className="articleTitle">{props.title}</h1>
        </Link>
            <p>{props.date}</p>
        </section>

    )

}
export default TitleNews