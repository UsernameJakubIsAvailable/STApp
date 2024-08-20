import API_BASE_URL from "../API_BASE_URL";

const transDataArticle = (element, index, transData) => {
  if (element.paragraf) {
    if (element.Ornament === "ZdobionaLitrera") {
      transData[index].push({
        type: "FirstParagraf",
        context: element.paragraf,
      });
    } else if (element.Ornament === "ZwyklyParagraf") {
      transData[index].push({
        type: "RedusialParagraf",
        context: element.paragraf,
      });
    }
  }
  if (element.image.data) {
    transData[index].push({
      type: "ArticeIMG",
      context: API_BASE_URL + element.image.data.attributes.url,
    });
  }
};
export default transDataArticle;
