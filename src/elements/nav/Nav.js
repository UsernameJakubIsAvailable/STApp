import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import NavElement from "./NavElement";
import ShowAndHideNavButton from "./ShowAndHideNavButton";
import navSectionBreak from "../multimedia/ozdobnik-navbar.png";
import MyCustomScroll from "../MyCustolScroll";

import searchIcon from "../multimedia/lupa.png";
import facebook from "../multimedia/facebook.png";
import discord from "../multimedia/discord.png";

function Nav(props) {
  const [showOrHideNavbar, setShowOrHideNavbar] = useState(false);
  const handleShowAndHideNavButton = () => {
    setShowOrHideNavbar(!showOrHideNavbar);
  };

  const navRef = useRef(null);

  useEffect(() => {
    let outsideClickHandler = (e) => {
      if (!navRef.current.contains(e.target)) {
        setShowOrHideNavbar(false);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [showOrHideNavbar]);

  const creteElements = (element, nameFather) => {
    let elementNav = "";
    let farherName = nameFather ? nameFather + "/" : "";
    if (element.children) {
      const name = element.id;
      elementNav = (
        <NavElement
          key={element.id}
          farherName={farherName}
          slug={element.id}
          name={name}
          data={element.children}
          creteElements={creteElements}
        />
      );
    } else {
      elementNav = (
        <li
          onClick={() => {
            handleShowAndHideNavButton();
            document.getElementById("root").scrollTo(0, 0);
          }}
          key={element.id}
          className="navElement navElementBlueBorder"
        >
          <Link className="navLink" to={nameFather + "/" + element.id}>
            {element.id}
          </Link>
        </li>
      );
      farherName = "";
    }
    return elementNav;
  };
  return (
    <>
      <nav
        id="nav"
        ref={navRef}
        className={`${showOrHideNavbar ? "hiddenNav" : "showNav"}`}
      >
        <section className="search">
          <Link
            onClick={() => {
              handleShowAndHideNavButton();
              document.getElementById("root").scrollTo(0, 0);
              // props.handleValueChange(searchInputValue);
            }}
            to={"Szukaj"}
          >
            <img src={searchIcon} alt="searchIcon" />
          </Link>
          <input
            value={props.searchValue}
            onChange={(e) => {
              props.handleValueChange(e.target.value);
            }}
          ></input>
          <img
            className="navSectionBreak"
            src={navSectionBreak}
            alt="dooooooooots"
          />
        </section>
        <ShowAndHideNavButton
          showOrHideNavbar={showOrHideNavbar}
          handleShowAndHideNavButton={handleShowAndHideNavButton}
        />
        <section id="websiteNav" className="websiteNav">
          <ul id="websieNavUl">
            <li className="navElement navElementBlueBorder">
              <Link
                onClick={() => {
                  handleShowAndHideNavButton();
                  document.getElementById("root").scrollTo(0, 0);
                }}
                className="navLink"
                to={"/"}
              >
                Aktualności
              </Link>
            </li>
            {props.tab && props.tab.map((element) => creteElements(element))}
          </ul>
          <MyCustomScroll
            fatherSelector="websiteNav"
            childSelector="websieNavUl"
          />
        </section>

        <section className="socialLinks">
          <img
            className="navSectionBreak"
            src={navSectionBreak}
            alt="dooooooooots"
          />

          <a
            href="https://imgb.ifunny.co/images/71ffda2dc6f04320b300b6fcf55e4f2d1e196bf9256fe7370d092ade46b795b6_1.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <img className="iconLink" src={facebook} alt="FacebokIcon" />
          </a>
          <a
            href="https://imgb.ifunny.co/images/71ffda2dc6f04320b300b6fcf55e4f2d1e196bf9256fe7370d092ade46b795b6_1.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <img className="iconLink" src={discord} alt="DiscordIcon" />
          </a>
        </section>
      </nav>
    </>
  );
}
export default Nav;
