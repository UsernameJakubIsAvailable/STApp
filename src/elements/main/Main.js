import { Routes, Route, useNavigate } from "react-router-dom";

import Error from "./Error";

import Article from "./article/Article";

import allNewsList from "../../websiteContent/AllNews";
import TenArticle from "./article/TenArticle";

import strzalka from "../multimedia/strzalka.png";

import React from "react";
function Main(props) {
  const history = useNavigate();
  const backButtonHandle = () => {
    history(-1);
  };

  const paragrafChecking = (data) => {
    let newTe = "";
    data.forEach((data) => {
      newTe = newTe + " " + data.context.toLowerCase();
    });
    return newTe.includes(props.searchValue);
  };

  const fittingArticle = allNewsList.filter((data) => paragrafChecking(data));

  const createSingleNewsRoute = (data) => {
    return (
      <Route
        key={data[0].context}
        path={data[0].context}
        element={
          <>
            <button className="backButton" onClick={() => backButtonHandle()}>
              <img src={strzalka} alt="powrót"></img> Powrót
            </button>
            <Article data={data} />
          </>
        }
      />
    );
  };
  const createTenArticleRouts = (pathName, contextArray) => {
    const tenArticleList = [];
    let count = Math.ceil(contextArray.length / 10 + 1);
    for (let i = 0; i < count; i++) {
      tenArticleList.push(
        <Route
          key=""
          path={`/${pathName + i}`}
          element={
            <TenArticle
              pathName={pathName}
              suppageListCount={count}
              tenArticle={contextArray.slice(
                i * 10 - 10,
                i * 10 > contextArray.length ? contextArray.length : i + 9
              )}
            />
          }
        />
      );
    }
    return tenArticleList;
  };

  return (
    <main id="mainContent" className={props.ver}>
      <Routes>
        {createTenArticleRouts("News", allNewsList).map((route) => route)}
        {createTenArticleRouts("Szukaj", fittingArticle).map((route) => route)}

        <Route
          path="/"
          element={
            <TenArticle
              pathName={"News"}
              suppageListCount={Math.ceil(allNewsList.length / 10 + 1)}
              tenArticle={allNewsList.slice(0, 10)}
            />
          }
        />
        <Route
          path="/STApp"
          element={
            <TenArticle
              pathName={"News"}
              suppageListCount={Math.ceil(allNewsList.length / 10 + 1)}
              tenArticle={allNewsList.slice(0, 10)}
            />
          }
        />
        {allNewsList.map((data) => createSingleNewsRoute(data))}

        <Route path="*" element={<Error back={backButtonHandle} />} />
      </Routes>
    </main>
  );
}

export default Main;
