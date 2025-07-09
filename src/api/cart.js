import axios from 'axios';

// export function getAllCarts(userId) {
//   return axios.get(`https://dummyjson.com/carts/user/${userId}`);
// }

export function addCart(data) {
  try {
    axios.post(`https://dummyjson.com/carts/add`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    throw new Error(err);
  }
}

// export function updateCart(cartId, products) {
//   return axios.put(
//     `https://dummyjson.com/carts/${cartId}`,
//     {
//       merge: true,
//       products: products,
//     },
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   );
// }

// export function deleteCart(cartId) {
//   return axios.delete(`https://dummyjson.com/carts/${cartId}`);
// }
