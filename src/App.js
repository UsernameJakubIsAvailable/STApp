import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./elements/header/Header.js";
import Main from "./elements/main/Main.js";
import Nav from "./elements/nav/Nav.js";
import { useEffect, useState } from "react";
import API_BASE_URL from "./fetch/API_BASE_URL.js";

import MyCustomScroll from "./elements/MyCustolScroll.js";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [tab, setTab] = useState();
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/podstronies?fields[0]=id&fields[2]=sciezka`)
      .then((res) => res.json())
      .then((data) => {
        const tree = [];
        const insertNode = (currentLevel, parts) => {
          parts.forEach((part, index) => {
            let existingNode = currentLevel.find((node) => node.id === part);

            if (!existingNode) {
              existingNode = { id: part, children: [] };
              currentLevel.push(existingNode);
              currentLevel.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else {
                  return 1;
                }
              });
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
          data.forEach((item) => {
            const parts = item.attributes.sciezka.split(/[/]/);
            insertNode(tree, parts);
          });
          setTab(tree);
        };
        transformData(data.data);
      });
  }, []);

  const handleValueChange = (value) => {
    setSearchValue(value);
  };
  return (
    <>
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
        <MyCustomScroll fatherSelector="root" childSelector="mainContent" />
      </BrowserRouter>
    </>
  );
}

export default App;
