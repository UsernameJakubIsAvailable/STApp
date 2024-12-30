import ArticeIMG from "./ArticeIMG";
import Galery from "./Galery";

function ImageAndDescryption(props) {
  return (
    <ul className="ImageAndDescryption">
      {props.data.map((element) => {
        return (
          <li className="ImageAndDescryptionElement">
            <Galery images={element.image} />
            {/* <ArticeIMG imgSrc={element.image} /> */}
            <article className="itemNameAndDescryption">
              <p className="itemName">{element.title}</p>
              <p className="itemDescryption">{element.context}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default ImageAndDescryption;
