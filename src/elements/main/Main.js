import { Routes, Route, useNavigate } from "react-router-dom";

import Error from "./Error";

import Article from "./article/Article";

import TenArticle from "./article/TenArticle";

import strzalka from "../multimedia/strzalka.png";

import React, { useEffect, useState } from "react";
import Pages from "./Pages";
import SingleArticle from "./SingleArticle";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import Scherch from "./Scherch";
function Main(props) {
  const history = useNavigate();
  const backButtonHandle = () => {
    history(-1);
  };
  const [newsRout, setNewsRout] = useState();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/wiescis?fields[0]=title&fields[1]=id`)
      .then((res) => res.json())
      .then((data) => {
        setNewsRout(data.data);
      });
  }, []);
  // const paragrafChecking = (data) => {
  //   let newTe = "";
  //   data.forEach((data) => {
  //     newTe = newTe + " " + data.context.toLowerCase();
  //   });
  //   return newTe.includes(props.searchValue);
  // };

  // const fittingArticle = allNewsList.filter((data) => paragrafChecking(data));

  // const createSingleNewsRoute = (data) => {
  //   return (
  //     <Route
  //       key={data[0].context}
  //       path={data[0].context}
  //       element={
  //         <>
  //           <Article data={data} />
  //           <button className="backButton" onClick={() => backButtonHandle()}>
  //             <img src={strzalka} alt="powrót"></img> Powrót
  //           </button>
  //         </>
  //       }
  //     />
  //   );
  // };
  // const createTenArticleRouts = (pathName, contextArray) => {
  //   const tenArticleList = [];
  //   let count = Math.ceil(contextArray.length / 10 + 1);
  //   for (let i = 0; i < count; i++) {
  //     tenArticleList.push(
  //       <Route
  //         key=""
  //         path={`/${pathName + i}`}
  //         element={
  //           <TenArticle
  //             pathName={pathName}
  //             suppageListCount={count}
  //             tenArticle={contextArray.slice(
  //               i * 10 - 10,
  //               i * 10 > contextArray.length ? contextArray.length : i + 9
  //             )}
  //           />
  //         }
  //       />
  //     );
  //   }
  //   return tenArticleList;
  // };
  // const createPageRouts = (item, fatherName) => {
  //   if (item.childrens) {
  //     console.log(item.slug, "cb");
  //     item.childrens.map((item) => createPageRouts(item, item.title.rendered));
  //   } else {
  //     console.log(item.slug, "r");

  //     return <Route path={"opis"} element={<Page />} />;
  //   }
  // };
  const createPageRouts = (item, farherPath) => {
    const fullPath = farherPath ? farherPath + "/" : "";

    if (item.children) {
      const path = fullPath + item.id;

      const childRoutes = item.children.map((item) =>
        createPageRouts(item, path)
      );
      return [...childRoutes, <Route path={item.id} element={<Pages />} />];
    } else {
      return (
        <Route
          key={item.id}
          path={fullPath + item.id}
          element={<Pages path={fullPath + item.id} />}
        />
      );
    }
  };
  return (
    <main id="mainContent">
      <Routes>
        <Route path="/" element={<TenArticle />} />
        {props.tab && props.tab.map((item) => createPageRouts(item)).flat()}
        {newsRout &&
          newsRout.map((item) => (
            <Route
              path={"/" + item.attributes.title}
              element={<SingleArticle backButtonHandle={backButtonHandle} />}
            />
          ))}
        <Route
          path={"/Szukaj"}
          element={
            <Scherch
              handleValueChange={props.handleValueChange}
              searchValue={props.searchValue}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;
