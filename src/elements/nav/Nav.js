import NavElement from './NavElement';
import tabs from '../../websiteContent/Tabs';
import { Link } from "react-router-dom";
import { useEffect, useState , useRef } from "react";
import ShowAndHideNavButton from './ShowAndHideNavButton';

function Nav(props) {

    const[showOrHideNavbar, setShowOrHideNavbar]=useState(false)
    const handleShowAndHideNavButton = ()=>{
      setShowOrHideNavbar(!showOrHideNavbar)
    }

    const navRef = useRef(null)
    
    useEffect(()=>{
      let outsideClickHandler = (e)=>{

        if (!navRef.current.contains(e.target)){
        setShowOrHideNavbar(false)
      }};
      document.addEventListener('click' , outsideClickHandler);
      return ()=>{
        document.removeEventListener('click', outsideClickHandler)
      }
    }, [showOrHideNavbar] ); 

    const creteElements=(element , nameFather )=>{
    let elementNav = '';
    let farherName = nameFather ? nameFather+'/' : '';
    if (element.data){
        const name = element.name
        elementNav = <NavElement key={name} farherName={farherName} name={name} data={element.data} creteElements={creteElements} />
    }
    else{
      elementNav = <li onClick={()=>handleShowAndHideNavButton()} key={element.name} className="navElement navElementBlueBorder"><Link className='navLink' to={(farherName+element.name).normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '_')}>{element.name}</Link></li>
      farherName = ''
    }
    return elementNav
}
  return(
    <>
    <nav  ref={navRef}  className={`${showOrHideNavbar ? 'hiddenNav' : 'showNav'} ${props.ver}`}>
    <ShowAndHideNavButton showOrHideNavbar={showOrHideNavbar} handleShowAndHideNavButton={handleShowAndHideNavButton} />
    <ul className="websiteNav">
      
    <li className="search">
          <input value={props.searchValue} onChange={props.handleValueChange}></input>
          <Link onClick={()=>handleShowAndHideNavButton()} to={'Szukaj1'}>tu ikone lupy</Link>
    </li>
    
  <li className="navElement navElementBlueBorder"><Link onClick={()=>handleShowAndHideNavButton()} className='navLink' to={'/'}>Aktualności</Link></li>
    {tabs.map(element=>creteElements(element))}
  </ul>
  </nav>
  </>
  )
}
export default Nav;   