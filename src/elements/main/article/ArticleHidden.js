import { useRef, useState } from "react";
import Article from "./Article";
import ArrowButton from "../../ArrowsButton";
import Title from "./Title";

function ArticleHidden(props) {
  const [articeVisibylity, setArticeVisibylity] = useState(false);
  const buttonRef = useRef(null);

  const handlePremaVisibilty = () => {
    if (props.data[0].showAndhide) {
      return (
        <>
          {" "}
          <button
            ref={buttonRef}
            className="articleHiddenButton"
            onClick={(e) => {
              setTimeout(() => {
                buttonRef.current.parentElement.scrollIntoView({
                  behavior: "smooth",
                  top: -20,
                });
              }, 250);
              setArticeVisibylity(!articeVisibylity);
            }}
          >
            <Title title={props.data[0].title} />
            <ArrowButton active={articeVisibylity} />
          </button>
          <div
            className={
              articeVisibylity
                ? "droping dropingVisible"
                : "droping dropingHiden"
            }
          >
            <Article data={props.data} />
          </div>
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
  return <>{handlePremaVisibilty()}</>;
}
export default ArticleHidden;
