import { useRef, useState } from "react";
import Article from "./Article";
import strzalka from "../../multimedia/strzalka.png";

function ArticleNews(props) {
  const [hidden, setHidden] = useState(true);
  const newDataRef = useRef([]);
  const isToLong = useRef(0);
  const handleArticleVisibility = () => {
    setHidden(!hidden);
  };

  const wrapIsLongerThen = 920;

  const countingLetter = () => {
    let count = 0;
    let maxCharacters = 0;
    const newData = [];

    props.data.forEach((paragraf) => {
      if (count < wrapIsLongerThen) {
        count += paragraf.context.length;
        if (count < wrapIsLongerThen) {
          maxCharacters = count;
          newData.push(paragraf);
        }
      }
    });
    isToLong.current = maxCharacters !== count;
    newDataRef.current = newData;

    return count;
  };
  countingLetter();

  const data = hidden ? newDataRef.current : props.data;
  return (
    <>
      <Article news={hidden ? "news hiddenNews" : "news"} data={data} />
      {isToLong.current ? (
        <button
          className="newsArticleHiddenShowButton"
          onClick={() => handleArticleVisibility()}
        >
          {hidden ? "Czytaj Dalej" : "Zwiń"}
          <img alt="pokaz wiecej" src={strzalka} />
        </button>
      ) : null}
    </>
  );
}
export default ArticleNews;
