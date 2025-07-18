import axios from 'axios';

export const cart = {
  /**
   *retrieves the added cart product Data
  @param {string} data
  @returns returns the added cart product Data
   */

  async addCart(data) {
    try {
      const response = await axios.post(
        `https://dummyjson.com/carts/add`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response;
    } catch (err) {
      throw new Error(err);
    }
  },
};
