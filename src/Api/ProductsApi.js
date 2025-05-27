import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data;
  } catch (err) {
    console.error("error", err);
    // return null;
  }
}
