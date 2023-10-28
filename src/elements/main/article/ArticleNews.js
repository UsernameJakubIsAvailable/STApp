import { useState } from "react"
import Article from "./Article"

function ArticleNews(props){

    const [hidden , setHidden] =useState(true)

    const handleArticleVisibility = ()=>{
        setHidden(!hidden)
    }
    const handleOnResize = (e)=>{
        console.log(e)
    }
    const countingLetter = ()=>{
        let count = 0;
        props.data.forEach(info=>{count+=info.context.length});
        count = count>900;
        return count
    }
    const countLetter = countingLetter()
    return(
        <>
        {countingLetter()}
         <Article onResize={handleOnResize} news={countLetter ? hidden : null} data={props.data}/>
         {countLetter ? <button className={hidden?'newsArticleHiddenButton':'newsArticleVisableButton'} onClick={()=>handleArticleVisibility()}>{hidden?'Pokaż Więcej':'Zwiń'}</button> : null}
        </>
    )

}
export default ArticleNews