import { useEffect, useState } from "react";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import transDataArticle from "../../fetch/transData/transDataArticle";
import transDataImageAndDescryption from "../../fetch/transData/transDataImageAndDescryption";
import ArticleHidden from "./article/ArticleHidden";
import Page from "./Page";

function Pages(props) {
  const [content, setContent] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
    fetch(
      `${API_BASE_URL}/api/podstronies?populate[dynamic][populate][article][populate][image][fields][0]=url&populate[dynamic][populate][ImageAndDescryption][populate][image][fields][0]=url&filters[sciezka][$eq]=${props.path}`
    )
      .then((res) => res.json())
      .then((fetchetData) => {
        const transData = [];
        fetchetData.data[0].attributes.dynamic.map((element, index) => {
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
        });
        setContent(fetchetData.data[0]);
        setIsLoaded(true);
      });
  }, [props.path]);

  return (
    <ul id="mainScrolledChild" className="activeArticle">
      {isLoaded && <Page content={content} />}
    </ul>
  );
}
export default Pages;
