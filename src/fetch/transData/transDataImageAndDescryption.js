import API_BASE_URL from "../API_BASE_URL";

const transDataImageAndDescryption = (element, index, data) => {
  data.push({
    type: "ImageAndDescryption",
    // image: API_BASE_URL + element.image.data.attributes.url,
    image: element.image,

    title: element.itemName,
    context: element.itemDescription,
  });
};
export default transDataImageAndDescryption;
