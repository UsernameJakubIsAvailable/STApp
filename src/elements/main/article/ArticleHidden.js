import { useState } from "react";
import Article from "./Article";
import arrow from "../../multimedia/strzalka.png";
import ArrowButton from "../../ArrowsButton";
import Title from "./Title";

function ArticleHidden(props) {
  const [articeVisibylity, setArticeVisibylity] = useState(false);

  const handeArticeVisibylity = () => {
    setArticeVisibylity(!articeVisibylity);
  };
  const handlePremaVisibilty = () => {
    if (props.data[0].showAndhide) {
      return (
        <>
          {" "}
          <button
            className="articleHiddenButton"
            onClick={() => handeArticeVisibylity()}
          >
            <Title title={props.data[0].title} />
            <ArrowButton active={articeVisibylity} />
          </button>
          {articeVisibylity && <Article data={props.data} />}
        </>
      );
    } else {
      return (
        <>
          <Title title={props.data[0].title} />
          <Article data={props.data} />
        </>
      );
    }
  };
  return (
    <>
      {handlePremaVisibilty()}
      {/* {props.data[0].showAndhide ? (
        <button
          className="articleHiddenButton"
          onClick={() => handeArticeVisibylity()}
        >
          {props.data[0].title} <ArrowButton active={articeVisibylity} />
        </button>
      ) : (
        <p>{props.data[0].title}</p>
      )}
      {articeVisibylity && <Article data={props.data} />} */}
    </>
  );
}
export default ArticleHidden;
