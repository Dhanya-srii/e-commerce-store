import axios from 'axios';

export default function addCart(data) {
  return axios.post(`https://dummyjson.com/carts/add`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
}
