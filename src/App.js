import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./elements/header/Header.js";
import Main from "./elements/main/Main.js";
import Nav from "./elements/nav/Nav.js";
import { useEffect, useState } from "react";
import API_BASE_URL from "./fetch/API_BASE_URL.js";
import Error from "./elements/main/Error.js";

import BackgroundForMain from "./elements/backgroundsForMainAndNav/BackgroundForMain.js";
import BackgroundForNav from "./elements/backgroundsForMainAndNav/BackgroundForNav.js";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [tab, setTab] = useState();
  const [apiError, setApiError] = useState(null);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/pkpy`)
      .then((res) => res.json())
      .then((data) => {
        const tree = [];
        const insertNode = (currentLevel, parts) => {
          parts.forEach((part, index) => {
            let existingNode = currentLevel.find((node) => node.id === part);

            if (!existingNode) {
              existingNode = { id: part, children: [] };
              currentLevel.push(existingNode);
            }
            if (index === parts.length - 1) {
              delete existingNode.children;
            } else {
              if (!existingNode.children) {
                existingNode.children = [];
              }
            }
            currentLevel = existingNode.children;
          });
        };

        const transformData = (data) => {
          data.forEach((item, index) => {
            const parts = item.attributes.order
              .split("\n")
              .map((el) => el.split(/[/]/));
            parts.forEach((el) => insertNode(tree, el));
          });

          setTab(tree);
        };
        transformData(data.data);

        // const tabs = [];
        // const sortingArr = data.data[0].attributes.order.split("\n");
        // sortingArr.map((element) => element.split("/"));
        // sortingArr.map((element) => {
        //   let lvl = 0;
        //   element.split("/").forEach((el, index) => {
        //   });
        // });
      });

    // fetch(`${API_BASE_URL}/api/podstronies?fields[0]=id&fields[2]=sciezka`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const tree = [];
    //     const insertNode = (currentLevel, parts) => {
    //       parts.forEach((part, index) => {
    //         let existingNode = currentLevel.find((node) => node.id === part);

    //         if (!existingNode) {
    //           existingNode = { id: part, children: [] };
    //           currentLevel.push(existingNode);
    //           currentLevel.sort((a, b) => {
    //             // return sortingArr.indexOf(a.id) - sortingArr.indexOf(b.id);
    //             if (a.id < b.id) {
    //               return -1;
    //             } else {
    //               return 1;
    //             }
    //           });
    //         }
    //         if (index === parts.length - 1) {
    //           delete existingNode.children;
    //         } else {
    //           if (!existingNode.children) {
    //             existingNode.children = [];
    //           }
    //         }
    //         currentLevel = existingNode.children;
    //       });
    //     };

    //     const transformData = (data) => {
    //       data.forEach((item, index) => {
    //         const parts = item.attributes.sciezka.split(/[/]/);

    //         if (index === 0) {
    //         }
    //         insertNode(tree, parts);
    //       });

    //       setTab(tree);
    //     };
    //     transformData(data.data);
    //   })
    //   .catch((error) => {
    //     setApiError(`${error}`);
    //   });
  }, []);

  const handleValueChange = (value) => {
    setSearchValue(value);
  };
  return (
    <>
      <BackgroundForMain />
      <BackgroundForNav />
      <BrowserRouter>
        <Header />
        <Nav
          tab={tab}
          handleValueChange={handleValueChange}
          searchValue={searchValue}
          // setSearchValue={setSearchValue}
        />
        <Main
          tab={tab}
          handleValueChange={handleValueChange}
          searchValue={searchValue}
        />
        {/* <MyCustomScroll fatherSelector="root" childSelector="mainContent" /> */}
        {/* {tab && (
          <MyCustomScroll
            scrollingAreaSelector="root"
            fatherSelector="mainContent"
            childSelector="mainScrolledChild"
            isWorkingOnWindow={true}
            id="mainScroll"
          />
        )} */}

        {apiError && <Error content={apiError} />}
      </BrowserRouter>
    </>
  );
}

export default App;
