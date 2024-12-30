import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../fetch/API_BASE_URL";
import transDataNews from "../../../fetch/transData/transDataNews";
import Article from "./Article";
import strzalka from "../../multimedia/strzalka.png";
import Error from "../Error";
import MyCustomScroll from "../../MyCustolScroll";
import { useLocation } from "react-router-dom";

const SingleArticle = (props) => {
  const location = useLocation();

  const [article, setArticle] = useState();
  useEffect(() => {
    fetch(
      `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&filters[title][$eq]=${props.title}`
    )
      .then((res) => res.json())
      .then((fetchetData) => {
        setArticle(transDataNews(fetchetData, API_BASE_URL));
      });
  }, []);

  const createList = (article) => {
    return (
      <li className="articleLi" key={article[0].context}>
        {" "}
        <Article data={article} />
      </li>
    );
  };
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
        {article && article.map((article) => createList(article))}
        <li className="backButtonLiContainer">
          <button
            className="backButton"
            onClick={() => props.backButtonHandle()}
          >
            <img src={strzalka} alt="powrót"></img> Powrót
          </button>
        </li>
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
};

export default SingleArticle;
