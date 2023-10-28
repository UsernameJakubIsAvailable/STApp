import ArticleNews from "./ArticleNews";
import { Link } from "react-router-dom";

function TenArticle(props) {

    const createList = (article)=>{
        return <li className="articleLi" key={article[0].context+'x'} >  <ArticleNews data={article} /></li>
    }

    const createSubpagesList = ()=>{
        const subPageList = []
        for(let i = 0 ; i < props.suppageListCount-1 ; i++ ){
            subPageList.push(<li className={'subpagesLink'} key={`${props.pathName+i}`}> <Link  to={`/${props.pathName + (i+1) }`}
                onClick={()=>{
                window.scrollTo(0, 0);
            }
        }>{i+1}</Link></li>)
        }
        return subPageList
    }

    return (
        <>
        <ul className="activeTenArticle">
            {props.tenArticle.map(article => createList(article))}
        </ul>
        <ul className="subpagesList">
            {createSubpagesList().map(link=>link)}
        </ul>
        </>
    );
  }
  
  export default TenArticle;