function Title(props){

    return(
        <section className="titleAndDate">
            <h1 className="articleTitle">{props.title}</h1>
            {props.date?<p>{props.date}</p>:''}
        </section>
    )

}
export default Title