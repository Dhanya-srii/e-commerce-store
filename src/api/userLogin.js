import axios from 'axios';

export async function loginUser(username, password) {
  const res = await axios.post('https://dummyjson.com/user/login', {
    username,
    password,
    expiresInMins: 120,
  });
  return res.data;
}
