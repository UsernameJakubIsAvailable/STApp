import { useEffect, useState } from "react";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import Find from "./article/Find";
import transDataArticle from "../../fetch/transData/transDataArticle";
import transDataImageAndDescryption from "../../fetch/transData/transDataImageAndDescryption";
import Article from "./article/Article";
import Page from "./Page";
import { Link } from "react-router-dom";

import searchIcon from "../multimedia/lupa.png";
import navSectionBreak from "../multimedia/ozdobnik-navbar.png";

function Scherch(props) {
  const [contentPage, setContentPage] = useState();
  const [isLoadedPage, setIsLoadedPage] = useState(false);

  const [contentNews, setContentNews] = useState();
  const [isLoadedNews, setIsLoadedNews] = useState(false);
  useEffect(() => {
    fetch(
      // `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&filters[$or][0][title][$contains]=${props.searchValue}&filters[$or][1][wiesc][paragraf][$contains]=${props.searchValue}`
      `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url`
    )
      .then((res) => res.json())
      .then((fetchetData) => {
        console.log(
          `${API_BASE_URL}/api/wiescis?populate[wiesc][populate][image][populate]=true&populate[wiesc][populate][image][fields][0]=url&filters[$or][0][title][$contains]=${props.searchValue}&filters[$or][1][wiesc][paragraf][$contains]=${props.searchValue}`
        );
        const fetchetDataPageFilter = filterData(
          fetchetData.data,
          props.searchValue
        );
        setContentNews(fetchetDataPageFilter);
        setIsLoadedNews(true);
        // setContentNews(fetchetData.data);
        // setIsLoadedNews(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/api/podstronies?populate[dynamic][populate][article][populate][image][fields][0]=url&populate[dynamic][populate][ImageAndDescryption][populate][image][fields][0]=url`
    )
      .then((resPage) => resPage.json())
      .then((fetchetDataPage) => {
        const fetchetDataPageFilter = filterData(
          fetchetDataPage.data,
          props.searchValue
        );
        setContentPage(fetchetDataPageFilter);
        setIsLoadedPage(true);
      });
  }, [props.searchValue]);
  const filterData = (data, fragment) => {
    const normalize = (str) => {
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

    const normalizedFragment = normalize(fragment);

    const containsFragment = (element) => {
      if (typeof element === "string") {
        const normalizedElement = normalize(element);
        const index = normalizedElement.indexOf(normalizedFragment);

        if (index !== -1) {
          const highlightedText = (
            <p>
              {element.substring(0, index)}
              <span>{element.substring(index, index + fragment.length)}</span>
              {element.substring(index + fragment.length)}
            </p>
          );
          return highlightedText;
        }
        return null;
      } else if (Array.isArray(element)) {
        for (const item of element) {
          const result = containsFragment(item);
          if (result) return result;
        }
        return null;
      } else if (typeof element === "object" && element !== null) {
        for (const value of Object.values(element)) {
          const result = containsFragment(value);
          if (result) return result;
        }
        return null;
      }
      return null;
    };

    const result = data.reduce((acc, item) => {
      const match = containsFragment(item);
      if (match) {
        acc.push({ originalItem: item, match });
      }
      return acc;
    }, []);

    console.log(result);
    return result;
  };
  // const filterData = (data, fragment) => {
  //   const normalize = (str) => {
  //     const map = {
  //       ą: "a",
  //       ć: "c",
  //       ę: "e",
  //       ł: "l",
  //       ń: "n",
  //       ó: "o",
  //       ś: "s",
  //       ź: "z",
  //       ż: "z",
  //       Ą: "A",
  //       Ć: "C",
  //       Ę: "E",
  //       Ł: "L",
  //       Ń: "N",
  //       Ó: "O",
  //       Ś: "S",
  //       Ź: "Z",
  //       Ż: "Z",
  //     };
  //     return str
  //       .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => map[match])
  //       .toLowerCase();
  //   };

  //   const normalizedFragment = normalize(fragment);

  //   const containsFragment = (element) => {
  //     if (typeof element === "string") {
  //       return normalize(element).includes(normalizedFragment) ? element : null;
  //     } else if (Array.isArray(element)) {
  //       for (const item of element) {
  //         const result = containsFragment(item);
  //         if (result) return result;
  //       }
  //       return null;
  //     } else if (typeof element === "object" && element !== null) {
  //       for (const value of Object.values(element)) {
  //         const result = containsFragment(value);
  //         if (result) return result;
  //       }
  //       return null;
  //     }
  //     return null;
  //   };

  //   const result = data.reduce((acc, item) => {
  //     const match = containsFragment(item);
  //     if (match) {
  //       acc.push({ originalItem: item, match });
  //     }
  //     return acc;
  //   }, []);

  //   console.log(result);
  //   return result;
  // };

  // const filterData = (data, fragment) => {
  //   const normalize = (str) => {
  //     const map = {
  //       ą: "a",
  //       ć: "c",
  //       ę: "e",
  //       ł: "l",
  //       ń: "n",
  //       ó: "o",
  //       ś: "s",
  //       ź: "z",
  //       ż: "z",
  //       Ą: "A",
  //       Ć: "C",
  //       Ę: "E",
  //       Ł: "L",
  //       Ń: "N",
  //       Ó: "O",
  //       Ś: "S",
  //       Ź: "Z",
  //       Ż: "Z",
  //     };
  //     return str
  //       .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => map[match])
  //       .toLowerCase();
  //   };

  //   const normalizedFragment = normalize(fragment);

  //   const containsFragment = (element) => {
  //     if (typeof element === "string") {
  //       return normalize(element).includes(normalizedFragment);
  //     } else if (Array.isArray(element)) {
  //       return element.some(containsFragment);
  //     } else if (typeof element === "object" && element !== null) {
  //       return Object.values(element).some(containsFragment);
  //     }
  //     return false;
  //   };

  //   const result = data.filter((item) => containsFragment(item));
  //   console.log(result);
  //   return result;
  // };

  return (
    <ul id="mainScrolledChild" className="activeArticle">
      {/* <section className="search">
        <Link
          onClick={() => {
            document.getElementById("root").scrollTo(0, 0);
          }}
          to={"/Szukaj"}
        >
          <img src={searchIcon} alt="searchIcon" />
        </Link>
        <input
          value={props.searchValue}
          onChange={props.handleValueChange}
        ></input>
      </section> */}
      <li>
        <article>
          {isLoadedPage && (
            <section class="titleAndDate">
              <h2 class="articleTitle">
                {contentPage && contentPage.length > 0
                  ? `${props.searchValue} znaleziono w zakładkach`
                  : `nie znaleziono ${props.searchValue} w żadnej zakłace`}
              </h2>
            </section>
          )}

          <ul>
            {isLoadedPage &&
              contentPage &&
              contentPage.map((pageC) => (
                <li className="scherchLink">
                  <Link to={"/" + pageC.originalItem.attributes.sciezka}>
                    {pageC.originalItem.attributes.sciezka.replace(
                      /\//g,
                      " 🢒 "
                    )}
                  </Link>
                  <Find findContext={pageC.match} />
                </li>
              ))}
          </ul>
        </article>
      </li>
      <li>
        <article>
          <section class="titleAndDate">
            <h2 class="articleTitle">
              {contentNews && contentNews.length > 0
                ? `${props.searchValue} znaleziono w aktualnościach:`
                : `nie znaleziono ${props.searchValue} w żadnej aktualności`}
            </h2>
          </section>
          <ul>
            {isLoadedNews &&
              contentNews &&
              contentNews.map((pageC) => (
                // <li className="scherchLink">
                //   <Link to={"/" + pageC.attributes.title}>
                //     {pageC.attributes.title}
                //   </Link>
                // </li>
                <li className="scherchLink">
                  <Link to={"/" + pageC.originalItem.attributes.title}>
                    {pageC.originalItem.attributes.title}
                  </Link>
                  <Find findContext={pageC.match} />
                </li>
              ))}
          </ul>
        </article>
      </li>
    </ul>
  );
}
export default Scherch;
