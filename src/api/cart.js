import axios from 'axios';

export const cart = {
  async addCart(data) {
    try {
      return await axios.post(`https://dummyjson.com/carts/add`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
