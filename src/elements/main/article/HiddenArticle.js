import { useState } from "react"
import Article from "./Article"

function ArticleHidden(props){
    const [articeVisibylity, setArticeVisibylity]= useState(false)

    const buttonTitle = props.data.find((item)=>item.type==='Title')


    const handeArticeVisibylity=()=>{
        setArticeVisibylity(!articeVisibylity)
    }

    return(
        <>
            <button onClick={()=>handeArticeVisibylity()}> {buttonTitle.context} </button>
            {articeVisibylity && <Article data={props.data}/>}
        </>
    )

}
export default ArticleHidden