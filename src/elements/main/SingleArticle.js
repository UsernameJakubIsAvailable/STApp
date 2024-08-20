import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import transDataNews from "../../fetch/transData/transDataNews";
import Article from "./article/Article";
import strzalka from "../multimedia/strzalka.png";

const SingleArticle = (props) => {
  const [article, setArticle] = useState();
  useEffect(() => {
    const title = window.location.pathname.substring(1);
    fetch(
      `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&filters[title][$eq]=${title}`
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
  // if (!article) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <ul id="mainScrolledChild" className="activeArticle">
        {article && article.map((article) => createList(article))}
        <li>
          {" "}
          <button
            className="backButton"
            onClick={() => props.backButtonHandle()}
          >
            <img src={strzalka} alt="powrót"></img> Powrót
          </button>
        </li>
      </ul>
    </>
  );
};

export default SingleArticle;
