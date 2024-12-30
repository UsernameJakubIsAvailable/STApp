import ArticleNews from "./ArticleNews";
import arrow from "../../multimedia/strzalka.png";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../../fetch/API_BASE_URL";
import transDataNews from "../../../fetch/transData/transDataNews";
import MyCustomScroll from "../../MyCustolScroll";

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
    const supaggeAmaunt = Math.ceil(totalNewsAmount / 10);
    // if (createSubpagesList > 5) {
    const show = new Set();
    show.add(0);

    for (
      let i = Math.max(0, currentpage - 2);
      i <= Math.min(supaggeAmaunt - 1, currentpage + 2);
      i++
    ) {
      show.add(i);
    }
    show.add(supaggeAmaunt - 1);

    console.log(show);
    const showArray = Array.from(show);
    const elements = [];
    console.log(showArray);
    showArray.forEach((el, index) => {
      if (index === 1 && el + 1 > 2) {
        elements.push(<li>...</li>);
      }
      elements.push(
        <li
          className={
            el + 1 === currentpage
              ? "subpagesLink activSubpage"
              : "subpagesLink"
          }
          key={`sub${el + 1}`}
        >
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                setCurrentpage(el + 1);
              }, 100);
            }}
          >
            {el + 1}
          </button>
        </li>
      );
      console.log(
        index,
        showArray.length,
        showArray[showArray.length - 1],
        el + 1
      );
      if (
        index === showArray.length - 2 &&
        el + 1 < showArray[showArray.length - 1]
      ) {
        console.log("x");
        elements.push(<li>...</li>);
      }
    });
    // console.log(elements);
    return elements;

    // }

    // const subPageList = [];
    // for (let i = 1; i < Math.ceil(totalNewsAmount / 10) + 1; i++) {
    //   subPageList.push(
    //     <li
    //       className={
    //         i === currentpage ? "subpagesLink activSubpage" : "subpagesLink"
    //       }
    //       key={`sub${i}`}
    //     >
    //       <button
    //         onClick={() => {
    //           window.scrollTo(0, 0);
    //           setTimeout(() => {
    //             setCurrentpage(i);
    //           }, 100);
    //         }}
    //       >
    //         {i}
    //       </button>
    //     </li>
    //   );
    // }
    // return subPageList;
  };
  return (
    <>
      <ul id="mainScrolledChild" className="activeArticle">
        <li className="pageName">
          <h1>
            <span className="h1BigLetter">a</span>ktualności
          </h1>
        </li>
        {article && article.map((article) => createList(article))}
        <li>
          <ul className="subpagesList">
            {currentpage !== 1 ? (
              <li className="prevSubpages">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                      setCurrentpage(currentpage - 1);
                    }, 100);
                  }}
                >
                  <img alt="poprzednia strona" src={arrow} />
                </button>
              </li>
            ) : null}

            {createSubpagesList().map((link, index) => {
              return link;
            })}

            {currentpage !== Math.ceil(totalNewsAmount / 10) ? (
              <li>
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setTimeout(() => {
                      setCurrentpage(currentpage + 1);
                    }, 100);
                  }}
                >
                  <img alt="nastepna strona" src={arrow} />
                </button>
              </li>
            ) : null}
          </ul>
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
}

export default TenArticle;
