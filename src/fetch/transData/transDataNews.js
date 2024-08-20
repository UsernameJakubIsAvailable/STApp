import transDataArticle from "./transDataArticle";

const transDataNews = (fetchetData, API) => {
  const transData = [];
  //dateConvert YYYY-MM-DD in to DD monthName, A.D. YYYY
  const monthName = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maja",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];
  const dateConvert = (date) => {
    date = date.split("-").reverse();
    date[1] = monthName[date[1] - 1] + ",\n";
    date.splice(2, 0, "A.D.");
    return date.join(" ");
  };
  //
  fetchetData.data.map((news, index) => {
    transData.push([]);
    if (news.attributes.date) {
      transData[index].push({
        type: "Title",
        context: news.attributes.title,
        date: dateConvert(news.attributes.date),
      });
    }
    news.attributes.wiesc.forEach((element) => {
      transDataArticle(element, index, transData);
    });
  });
  return transData;
};
export default transDataNews;
