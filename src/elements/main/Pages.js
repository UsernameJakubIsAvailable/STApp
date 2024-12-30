import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import Page from "./Page";
import Error from "./Error";
import MyCustomScroll from "../MyCustolScroll";
function Pages(props) {
  const [content, setContent] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiError, setApiError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(false);
    setApiError(false);
    fetch(
      `${API_BASE_URL}/api/podstronies?populate[dynamic][populate][table][populate]&populate[dynamic][populate][article][populate][image][fields][0]=url&populate[dynamic][populate][ImageAndDescryption][populate][image][fields][0]=url&populate[dynamic][populate][galery][populate][images][fields][0]=url&filters[sciezka][$eq]=${props.path}`
    )
      .then((res) => res.json())
      .then((fetchetData) => {
        setContent(fetchetData.data[0]);
        setIsLoaded(true);
      })
      .catch((error) => {
        setApiError(`${error}`);
        setIsLoaded(false);
      });
  }, [props.path]);
  const doecodePath = () => {
    const path = location.pathname.split("/");
    const doecodePath = decodeURIComponent(path[path.length - 1]);
    const doecodePathArray = doecodePath.split(" ");
    return (
      <h1>
        {doecodePathArray.map((word) => (
          <>
            {word[0] === word[0].toUpperCase() ? (
              <span className="h1BigLetter"> {word[0]}</span>
            ) : (
              word[0]
            )}
            {word.slice(1, word.length)}{" "}
          </>
        ))}
      </h1>
    );
  };
  const h1Context = doecodePath();
  return (
    <>
      <ul id="mainScrolledChild" className="activeArticle">
        <li className="pageName">{h1Context}</li>

        {isLoaded && <Page content={content} />}
        {apiError && <Error content={apiError} />}
        {/* {setTimeout(window.scrollTo(0, 0), 300)} */}
      </ul>
      <MyCustomScroll
        scrollingAreaSelector="root"
        fatherSelector="mainContent"
        childSelector="mainScrolledChild"
        isWorkingOnWindow={true}
        id="mainScroll"
        extraSize="extraSizeMain"
      />
    </>
  );
}
export default Pages;
