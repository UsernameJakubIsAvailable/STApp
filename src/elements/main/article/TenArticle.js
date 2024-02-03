import ArticleNews from "./ArticleNews";
import { Link } from "react-router-dom";
import arrow from "../../multimedia/strzalka.png";

function TenArticle(props) {
  const createList = (article) => {
    return (
      <li className="articleLi" key={article[0].context + "x"}>
        {" "}
        <ArticleNews data={article} />
      </li>
    );
  };
  const createSubpagesList = () => {
    const subPageList = [];
    for (let i = 0; i < props.suppageListCount - 1; i++) {
      subPageList.push(
        <li className={"subpagesLink"} key={`${props.pathName + i}`}>
          {" "}
          <Link
            to={`/${props.pathName + (i + 1)}`}
            onClick={() => {
              document.getElementById("root").scrollTo(0, 0);
            }}
          >
            {i + 1}
          </Link>
        </li>
      );
    }
    return subPageList;
  };
  const getUrl = () => {
    let url = window.location.href[window.location.href.length - 1];

    if (url === "/") {
      url = 1;
    } else {
      url = +url;
    }

    return url;
  };
  const url = getUrl();

  return (
    <>
      <ul id="mainScrolledChild" className="activeTenArticle">
        {props.tenArticle.map((article) => createList(article))}
      </ul>
      <ul className="subpagesList">
        {url !== 1 ? (
          <li className="prevSubpages">
            <Link
              onClick={() => {
                document.getElementById("root").scrollTo(0, 0);
              }}
              to={`/News${url - 1}`}
            >
              <img alt="poprzednia strona" src={arrow} />
            </Link>
          </li>
        ) : null}

        {createSubpagesList().map((link) => link)}

        {url !== 2 ? (
          <li
            onClick={() => {
              document.getElementById("root").scrollTo(0, 0);
            }}
            className="nextSubpages"
          >
            <Link to={`/News${url + 1}`}>
              <img alt="poprzednia strona" src={arrow} />
            </Link>
          </li>
        ) : null}
      </ul>
    </>
  );
}

export default TenArticle;
