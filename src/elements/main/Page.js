import transDataArticle from "../../fetch/transData/transDataArticle";
import transDataImageAndDescryption from "../../fetch/transData/transDataImageAndDescryption";
import ArticleHidden from "./article/ArticleHidden";

function Page(props) {
  const transformData = () => {
    const transData = [];
    props.content.attributes.dynamic.forEach((element, index) => {
      transData.push([]);
      transData[index].push({
        title: element.title,
        showAndhide: element.showAndHide,
        id: element.id,
      });
      if (element.article.length > 0) {
        element.article.forEach((element) => {
          transDataArticle(element, index, transData);
        });
      }
      if (element.ImageAndDescryption.length > 0) {
        const data = [];
        element.ImageAndDescryption.forEach((element) => {
          transDataImageAndDescryption(element, index, data);
        });
        transData[index].push({
          context: data,
          type: "ImageAndDescryption",
        });
      }
      if (element.galery) {
        transData[index].push({
          context: element.galery.images,
          type: "galery",
        });
      }
      if (element.table) {
        transData[index].push({
          context: element.table.table,
          type: "table",
        });
      }
    });
    return transData;
  };

  return (
    <>
      {transformData().map((article) => (
        <li className="articleLi page" key={article}>
          <ArticleHidden data={article} />
        </li>
      ))}
    </>
  );
}
export default Page;
