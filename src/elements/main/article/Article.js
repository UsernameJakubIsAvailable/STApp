import Title from "./Title";
import TitleNews from "./TitleNews";
import FirstParagraf from "./FirstParagraf";
import ResidualParagraf from "./ResidualParagraf";
import ArticeIMG from "./ArticeIMG";
import CodeElement from "./CodeElement";
import ImageAndDescryption from "./ImageAndDescryption";
import Galery from "./Galery";
import Table from "./Table";

function Article(props) {
  const selectType = (data, i) => {
    if (data.type === "Title" && props.news) {
      return (
        <TitleNews
          key={data.context}
          title={data.context}
          date={data.date}
          link={data.link}
        />
      );
    }
    if (data.type === "Title") {
      return (
        <Title
          key={data.context.length + i}
          title={data.context}
          date={data.date}
        />
      );
    }
    if (data.type === "FirstParagraf") {
      return (
        <FirstParagraf
          key={data.context.length + i}
          firstParagraf={data.context}
          fontSize={data.fontSize}
          style={data.style}
          type={data.type}
        />
      );
    }
    if (data.type === "RedusialParagraf") {
      return (
        <ResidualParagraf
          key={data.context.length + i}
          paragraf={data.context}
          fontSize={data.fontSize}
          style={data.style}
          highlight={props.highlight}
        />
      );
    }
    if (data.type === "ArticeIMG") {
      return (
        <Galery images={data.context} />

        // <ArticeIMG
        //   key={data.context.length + i}
        //   imgSrc={data.context}
        //   imgDescription={data.imgDescription}
        // />
      );
    }
    if (data.type === "CodeElement") {
      return (
        <CodeElement
          key={data.context.length + i}
          stringToCode={data.context}
        />
      );
    }
    if (data.type === "ImageAndDescryption") {
      return (
        <ImageAndDescryption
          imgSrc={data.context.length + i}
          data={data.context}
        />
      );
    }
    if (data.type === "galery") {
      return <Galery images={data.context} />;
    }
    if (data.type === "table") {
      return <Table table={data.context} />;
    }
  };
  return (
    <article className={`mainArticle${props.news ? ` ` + props.news : ""}`}>
      {props.data.map((data, i) => selectType(data, i))}
    </article>
  );
}

export default Article;
