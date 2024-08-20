import ArticleNews from "./ArticleNews";
import arrow from "../../multimedia/strzalka.png";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../../fetch/API_BASE_URL";
import transDataNews from "../../../fetch/transData/transDataNews";

function TenArticle(props) {
  const [article, setArticle] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [totalNewsAmount, setTotalNewsAmount] = useState(0);
  useEffect(() => {
    fetch(
      `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&pagination[page]=${currentpage}&pagination[pageSize]=10&sort[0]=id:desc`
    )
      .then((res) => res.json())
      .then((fetchetData) => {
        setTotalNewsAmount(fetchetData.meta.pagination.total);
        setArticle(transDataNews(fetchetData, API_BASE_URL));
      });
  }, [currentpage]);

  const createList = (article) => {
    return (
      <li className="articleLi" key={article[0].context}>
        {" "}
        <ArticleNews data={article} />
      </li>
    );
  };
  const createSubpagesList = () => {
    const subPageList = [];
    for (let i = 1; i < Math.ceil(totalNewsAmount / 10) + 1; i++) {
      subPageList.push(
        <li className={"subpagesLink"} key={`sub${i}`}>
          {" "}
          <button
            onClick={() => {
              document.getElementById("root").scrollTo(0, 0);
              setCurrentpage(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return subPageList;
  };
  return (
    <>
      <ul id="mainScrolledChild" className="activeArticle">
        {article && article.map((article) => createList(article))}
      </ul>
      <ul className="subpagesList">
        {currentpage !== 1 ? (
          <li className="prevSubpages">
            <button
              onClick={() => {
                document.getElementById("root").scrollTo(0, 0);
                setCurrentpage(currentpage - 1);
              }}
            >
              <img alt="poprzednia strona" src={arrow} />
            </button>
          </li>
        ) : null}

        {createSubpagesList().map((link) => link)}

        {currentpage !== Math.ceil(totalNewsAmount / 10) ? (
          <li>
            <button
              onClick={() => {
                document.getElementById("root").scrollTo(0, 0);
                setCurrentpage(currentpage + 1);
              }}
            >
              <img alt="nastepna strona" src={arrow} />
            </button>
          </li>
        ) : null}
      </ul>
    </>
  );
}

export default TenArticle;
