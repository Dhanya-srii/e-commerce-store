import axios from 'axios';

export async function loginUser(username, password) {
  const res = await axios.post('https://dummyjson.com/auth/login', {
    username,
    password,
    expiresInMins: 1,
  });

  document.cookie = `accessToken=${res.data.accessToken}; expires=${new Date(
    Date.now() + 600000
  )};`;

  return res.data;
}

export async function getAuthUser() {
  const token = document.cookie
    .split('; ')
    .find((ele) => ele.startsWith('accessToken='))
    ?.split('=')[1];

  if (!token) throw new Error('Session expired');

  const res = await axios.get('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}
