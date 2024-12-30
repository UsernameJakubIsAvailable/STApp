import { useEffect, useState } from "react";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import Error from "./Error";
import { Link } from "react-router-dom";
// import ArticleNews from "./article/ArticleNews";
import MyCustomScroll from "../MyCustolScroll";
import { useLocation } from "react-router-dom";
import Article from "./article/Article";

function Scherch(props) {
  const location = useLocation();

  const [contentPage, setContentPage] = useState();
  const [isLoadedPage, setIsLoadedPage] = useState(false);

  const [contentNews, setContentNews] = useState();
  const [isLoadedNews, setIsLoadedNews] = useState(false);

  const [apiPageError, setApiPageError] = useState(null);
  const [apiNewsError, setApiNewsError] = useState(null);

  const scherching = (fetchetDataPage) => {
    const sValue = normalize(props.searchValue);
    const matches = [];
    fetchetDataPage.data.forEach((data) => {
      const match = {
        sciezka: data.attributes.sciezka,
        title: [],
        paragrafs: [],
      };
      if (normalize(data.attributes.sciezka).includes(normalize(sValue))) {
        match.title.push(data.attributes.sciezka);
      }
      data.attributes.dynamic.forEach((dynamic) => {
        dynamic.article.forEach((article) => {
          if (normalize(article.paragraf).includes(sValue)) {
            match.paragrafs.push(article.paragraf);
          }
        });
        dynamic.ImageAndDescryption.forEach((iAD) => {
          if (
            normalize(iAD.itemDescription).includes(sValue) ||
            normalize(iAD.itemName).includes(sValue)
          ) {
            match.paragrafs.push(`${iAD.itemName}: ${iAD.itemDescription}`);
          }
        });
      });
      if (match.paragrafs.length > 0 || match.title.length > 0) {
        matches.push(match);
      }
    });
    return matches;
  };

  const normalize = (str) => {
    if (!str) {
      return "";
    }
    const map = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ź: "z",
      ż: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ź: "Z",
      Ż: "Z",
    };
    return str
      .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => map[match])
      .toLowerCase();
  };

  useEffect(() => {
    if (props.searchValue.length > 3) {
      fetch(
        // `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&filters[$or][0][title][$contains]=${props.searchValue}&filters[$or][1][wiesc][paragraf][$contains]=${props.searchValue}`
        `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url`
      )
        .then((res) => res.json())
        .then((fetchetData) => {
          const sValue = normalize(props.searchValue);
          const matches = [];
          fetchetData.data.forEach((element) => {
            const match = {
              sciezka: element.attributes.title,
              title: [],
              paragrafs: [],
            };
            if (normalize(element.attributes.title).includes(sValue)) {
              match.title.push(element.attributes.title);
            }
            element.attributes.wiesc.forEach((wiesc) => {
              if (normalize(wiesc.paragraf).includes(sValue)) {
                match.paragrafs.push(wiesc.paragraf);
              }
            });
            if (match.paragrafs.length > 0 || match.title.length > 0) {
              matches.push(match);
            }
          });
          setContentNews(matches);
          setIsLoadedNews(true);
        })
        .catch((error) => {
          setApiNewsError(`${error}`);
          setIsLoadedNews(false);
        });
    }
  }, [props.searchValue]);
  useEffect(() => {
    if (props.searchValue.length > 3) {
      fetch(
        `${API_BASE_URL}/api/podstronies?populate[dynamic][populate][article][populate][image][fields][0]=url&populate[dynamic][populate][ImageAndDescryption][populate][image][fields][0]=url`
      )
        .then((resPage) => resPage.json())
        .then((fetchetDataPage) => {
          setContentPage(scherching(fetchetDataPage));

          setIsLoadedPage(true);
        })
        .catch((error) => {
          setApiPageError(`${error}`);
          setIsLoadedPage(false);
        });
    }
  }, [props.searchValue]);
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

        <li>
          {props.searchValue.length < 3 ? (
            <h2 className="scherchInfo">
              wyszukiwana fraza musi miec conajmniej 3 znaki{" "}
            </h2>
          ) : (
            <h2 className="scherchInfo">
              Szukana Fraza: <span>{props.searchValue}</span>
            </h2>
          )}
        </li>

        <li className="articleLi page">
          <article className="mainArticle">
            {isLoadedPage && (
              <section className="title">
                <h2 className="articleTitle">
                  {contentPage && contentPage.length > 0
                    ? `Znaleziono w zakładkach:`
                    : `Nie znaleziono w żadnej zakłace`}
                </h2>
              </section>
            )}

            <ul className="scherchUl">
              {isLoadedPage &&
                props.searchValue.length > 3 &&
                contentPage &&
                contentPage.map((pageC) => (
                  <li className="scherchLi">
                    <Link className="scherchLink" to={"/" + pageC.sciezka}>
                      {pageC.sciezka.replace(/\//g, " 🢒 ")}
                    </Link>
                    {pageC.paragrafs.map((paragraf) => (
                      <Article
                        highlight={props.searchValue}
                        data={[
                          {
                            type: "RedusialParagraf",
                            context: paragraf,
                          },
                        ]}
                      />
                    ))}
                  </li>
                ))}
              {apiNewsError && <Error content={apiNewsError} />}
            </ul>
          </article>
        </li>
        <li className="articleLi page">
          <article className="mainArticle">
            <section className="title">
              <h2 className="articleTitle">
                {contentNews && contentNews.length > 0
                  ? `Znaleziono w aktualnościach:`
                  : `Nie znaleziono w żadnej aktualności`}
              </h2>
            </section>
            <ul className="scherchUl">
              {isLoadedNews &&
                contentNews &&
                props.searchValue.length > 3 &&
                contentNews.map((pageC) => (
                  <li className="scherchLi">
                    <Link
                      className="scherchLink"
                      to={"/Aktualnosci/" + pageC.sciezka}
                    >
                      {pageC.sciezka.replace(/\//g, " 🢒 ")}
                    </Link>
                    {pageC.paragrafs.map((paragraf) => (
                      <Article
                        highlight={props.searchValue}
                        data={[
                          {
                            type: "RedusialParagraf",
                            context: paragraf,
                          },
                        ]}
                      />
                    ))}
                  </li>
                ))}
              {apiPageError && <Error content={apiPageError} />}
            </ul>
          </article>
        </li>
      </ul>{" "}
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
export default Scherch;
