function ArticeIMG(props) {
  return (
    <img loading="lazy" className="articleIMG" src={props.imgSrc} alt="news" />
  );
}
export default ArticeIMG;
