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

  const wrapIsLongerThen = 900;

  const countingLetter = () => {
    let count = 0;
    let maxCharacters = 0;
    const newData = [];

    props.data.forEach((paragraf) => {
      if (paragraf.type === "galery") {
        newData.push(paragraf);
        return;
      }
      if (paragraf.context && count < wrapIsLongerThen) {
        count += paragraf.context.length;
        if (count < wrapIsLongerThen) {
          maxCharacters = count;
          newData.push(paragraf);
        } else {
          newData.push({
            type: paragraf.type,
            context:
              typeof paragraf.context === "string"
                ? paragraf.context.slice(
                    0,
                    count - wrapIsLongerThen > wrapIsLongerThen
                      ? wrapIsLongerThen
                      : count - wrapIsLongerThen
                  ) + "..."
                : paragraf.context,
          });
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
      <Article
        highlight={props.highlight}
        news={hidden ? "news hiddenNews" : "news"}
        data={data}
      />
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
