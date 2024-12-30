import { Routes, Route, useNavigate } from "react-router-dom";
import MyCustomScroll from "../MyCustolScroll";

import Error from "./Error";

import Article from "./article/Article";

import TenArticle from "./article/TenArticle";

import strzalka from "../multimedia/strzalka.png";

import React, { useEffect, useState } from "react";
import Pages from "./Pages";
import SingleArticle from "./article/SingleArticle";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import Scherch from "./Scherch";
function Main(props) {
  const [apiError, setApiError] = useState(null);

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
      })
      .catch((error) => {
        setApiError(`${error}`);
      });
  }, []);
  const createPageRouts = (item, farherPath) => {
    const path = farherPath ? farherPath + "/" + item.id : item.id;

    if (item.children) {
      const childRoutes = item.children.map((item) =>
        createPageRouts(item, path)
      );
      return [...childRoutes, <Route path={path} element={<Pages />} />];
    } else {
      return (
        <Route key={item.id} path={path} element={<Pages path={path} />} />
      );
    }
  };
  return (
    <main id="mainContent">
      <Routes>
        <Route path="/" element={<TenArticle />} />
        {/* news^ */}
        {props.tab && props.tab.map((item) => createPageRouts(item)).flat()}
        {/* createPageRouts^ */}
        {newsRout &&
          newsRout.map((item) => (
            <Route
              path={"/Aktualnosci/" + item.attributes.title}
              element={
                <SingleArticle
                  title={item.attributes.title}
                  backButtonHandle={backButtonHandle}
                />
              }
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
      {apiError && <Error content={apiError} />}
      {/* <MyCustomScroll
        scrollingAreaSelector="root"
        fatherSelector="mainContent"
        childSelector="mainScrolledChild"
        isWorkingOnWindow={true}
        id="mainScroll"
      /> */}
    </main>
  );
}

export default Main;
