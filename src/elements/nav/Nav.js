import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

import NavElement from "./NavElement";
import ShowAndHideNavButton from "./ShowAndHideNavButton";
import navSectionBreak from "../multimedia/ozdobnik-navbar.png";
import MyCustomScroll from "../MyCustolScroll";

import searchIcon from "../multimedia/lupa.png";
import facebook from "../multimedia/facebook.png";
import discord from "../multimedia/discord.png";

function Nav(props) {
  const [showOrHideNavbar, setShowOrHideNavbar] = useState(false);
  const navigte = useNavigate();
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
          <Link
            className="navLink"
            to={(nameFather ? nameFather : "") + "/" + element.id}
          >
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
        className={`${showOrHideNavbar ? "hiddenNav" : "showNav"} ${
          isMobile ? "navIsMobile" : ""
        }`}
      >
        <section className="search">
          <Link
            onClick={() => {
              handleShowAndHideNavButton();
              setTimeout(window.scrollTo(0, 0), 300);
              // props.handleValueChange(searchInputValue);
            }}
            to={"Szukaj"}
          >
            <img src={searchIcon} alt="searchIcon" />
          </Link>
          <input
            placeholder="szukaj"
            value={props.searchValue}
            onChange={(e) => {
              console.log(e.key);
              props.handleValueChange(e.target.value);
              // onsubmit = () => {
              //   window.scrollTo(0, 0);
              //   setTimeout(navigte("Szukaj"));
              // };
            }}
            onkeydown={(e) => {
              handleShowAndHideNavButton();

              console.log(e.key);
              if (
                (e.key === "Enter" || e.keyCode === 13) &&
                props.searchValue.length > 1
              ) {
                navigte("Szukaj");
                setTimeout(window.scrollTo(0, 0), 300);
              }
            }}
            // onBlur={() => {
            //   navigte("Szukaj");
            //   setTimeout(window.scrollTo(0, 0), 300);
            // }}
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
          {/* <div id="navWrapperl2"> */}
          <div id="navWrapperl1">
            <div id="navWrapper">
              {/* <section id="websiteNav" className="websiteNav"> */}
              <ul id="websieNavUl">
                <li className="navElement navElementBlueBorder">
                  <Link
                    onClick={() => {
                      handleShowAndHideNavButton();
                    }}
                    className="navLink"
                    to={"/"}
                  >
                    Aktualności
                  </Link>
                </li>
                {props.tab &&
                  props.tab.map((element) => creteElements(element))}
              </ul>
            </div>
            <MyCustomScroll
              scrollingAreaSelector="navWrapperl1"
              fatherSelector="navWrapper"
              childSelector="websieNavUl"
              isWorkingOnWindow={false}
              id="navScroll"
            />
          </div>
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
