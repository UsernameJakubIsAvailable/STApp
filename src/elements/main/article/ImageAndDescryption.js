import ArticeIMG from "./ArticeIMG";

function ImageAndDescryption(props) {
  return (
    <ul className="ImageAndDescryption">
      {props.data.map((element) => {
        return (
          <li className="ImageAndDescryptionElement">
            <ArticeIMG imgSrc={element.image} />
            <p className="itemName">{element.title}</p>
            <p className="itemDescryption">{element.context}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default ImageAndDescryption;
