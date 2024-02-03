import NavElement from "./NavElement";
import tabs from "../../websiteContent/Tabs";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ShowAndHideNavButton from "./ShowAndHideNavButton";
import searchIcon from "../multimedia/lupa.png";
import navSectionBreak from "../multimedia/ozdobnik-navbar.png";
import facebook from "../multimedia/facebook.png";
import discord from "../multimedia/discord.png";
import MyCustomScroll from "../MyCustolScroll";

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
    if (element.data) {
      const name = element.name;
      elementNav = (
        <NavElement
          key={name}
          farherName={farherName}
          name={name}
          data={element.data}
          creteElements={creteElements}
        />
      );
    } else {
      elementNav = (
        <li
          onClick={() => handleShowAndHideNavButton()}
          key={element.name}
          className="navElement navElementBlueBorder"
        >
          <Link
            className="navLink"
            to={(farherName + element.name)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s/g, "_")}
          >
            {element.name}
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
        className={`${showOrHideNavbar ? "hiddenNav" : "showNav"} ${props.ver}`}
      >
        <section className="search">
          <Link onClick={() => handleShowAndHideNavButton()} to={"Szukaj1"}>
            <img src={searchIcon} alt="searchIcon" />
          </Link>

          <input
            value={props.searchValue}
            onChange={props.handleValueChange}
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
                onClick={() => handleShowAndHideNavButton()}
                className="navLink"
                to={"/"}
              >
                Aktualności
              </Link>
            </li>
            {tabs.map((element) => creteElements(element))}
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
