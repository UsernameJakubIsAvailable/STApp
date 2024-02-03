function Title(props) {
  return (
    <section className="titleAndDate">
      <h2 className="articleTitle">{props.title}</h2>
      <p>{props.date}</p>
    </section>
  );
}
export default Title;
