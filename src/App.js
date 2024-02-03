import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./elements/header/Header.js";
import Main from "./elements/main/Main.js";
import Nav from "./elements/nav/Nav.js";
import { useState } from "react";

import MyCustomScroll from "./elements/MyCustolScroll.js";

function App() {
  const [searchValue, setSearchValue] = useState("");

  //test
  const [backgroundVersion, setBackgroundVersion] = useState("");

  const backgroundVersions = ["1", "2", "3"];

  const handleBackgroundChange = (version) => {
    setBackgroundVersion("ver" + version);
  };
  //testEnd

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <BrowserRouter>
        <Header />
        <Nav
          ver={backgroundVersion}
          handleValueChange={handleValueChange}
          searchValue={searchValue}
        />
        <Main ver={backgroundVersion} searchValue={searchValue} />
        <MyCustomScroll fatherSelector="root" childSelector="mainContent" />
      </BrowserRouter>

      {/* test */}
      <div
        style={{
          top: "calc(100% - 50px)",
          width: "100%",
          height: "50px",
          backgroundColor: "black",
          position: "fixed",
          display: "none",
          gap: "5px",
          opacity: "0.5",
        }}
      >
        {backgroundVersions.map((ver) => (
          <button
            key={ver}
            style={{
              width: "33%",
              backgroundColor: "grey",
              padding: "2em",
            }}
            onClick={() => handleBackgroundChange(ver)}
          >
            {ver}
          </button>
        ))}
      </div>
      {/* testEnd */}
    </>
  );
}

export default App;
