import Title from './Title';
import TitleNews from './TitleNews';
import FirstParagraf from "./FirstParagraf";
import ResidualParagraf from './ResidualParagraf';
import ArticeIMG from "./ArticeIMG";

function Article(props) {

    const selectType = (data)=>{
      if(data.type === "Title" && props.news){
        return <TitleNews key={data.context} title={data.context} date={data.date} link={data.link}/>
      }
      else if(data.type === "Title"){
         return <Title key={data.context} title={data.context} date={data.date} />
      }
      else if(data.type === "FirstParagraf"){
        return <FirstParagraf key={data.context} firstParagraf={data.context}/>
      }
      else if(data.type === "RedusialParagraf"){
        return <ResidualParagraf key={data.context} paragraf={data.context}/>
      }
      else if(data.type === "ArticeIMG"){
        return <ArticeIMG key={data.context} imgSrc={data.context} imgDescription={data.imgDescription}/>
      }
    }
  return (
    <article className={`mainArticle${props.news?' news':''}`}>
      {props.data.map((data)=>selectType(data))}
    </article>
  )
}

export default Article