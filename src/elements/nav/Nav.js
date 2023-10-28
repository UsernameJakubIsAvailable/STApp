import NavElement from './NavElement';
import tabs from '../../websiteContent/Tabs';
import { Link } from "react-router-dom";
import { useState } from "react";

function Nav(props) {

    const[showOrHideNavbar, setShowOrHideNavbar]=useState(true)

    const handleShowAndHideNavButton = ()=>{
      setShowOrHideNavbar(!showOrHideNavbar)
    }

    const creteElements=(element , nameFather )=>{
    let elementNav = '';
    let farherName = nameFather ? nameFather+'/' : '';
    if (element.data){
        const name = element.name
        elementNav = <NavElement farherName={farherName} name={name} data={element.data} creteElements={creteElements} />
    }
    else{
      elementNav = <li key={element.name} className="navElement navElementBlueBorder"><Link className='navLink' to={(farherName+element.name).normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '_')}>{element.name}</Link></li>
      farherName = ''
    }
    return elementNav
}
  return(
    <nav className={`${showOrHideNavbar ? 'hiddenNav' : 'showNav'}`}>
            <button className={`${showOrHideNavbar ? 'hiddenNav' : 'showNav'} showAndHideNavButton`} onClick={()=>handleShowAndHideNavButton()}>{showOrHideNavbar ? 'P o k a ż M e n u' : 'U k r y j M e n u'}</button>
    <ul className="websiteNav">
    <li className="search">
          <input value={props.searchValue} onChange={props.handleValueChange}></input>
          <Link to={'Szukaj1'}>tu ikone lupy</Link>
    </li>
    
  <li className="navElement navElementBlueBorder"><Link className='navLink' to={'/'}>Aktualności</Link></li>
    {tabs.map(element=>creteElements(element))}
  </ul>
  </nav>
  )
}
export default Nav;   