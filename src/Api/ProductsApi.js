import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const data = response.data.products;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
