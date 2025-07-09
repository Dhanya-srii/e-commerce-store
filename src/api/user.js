import axios from 'axios';
import { parseUser } from './parser';

export const user = {
  async loginUser(username, password) {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 1,
      });

      document.cookie = `accessToken=${
        res.data.accessToken
      }; expires=${new Date(Date.now() + 60000)};`;

      return parseUser(res.data);
    } catch (err) {
      throw new Error('Login failed');
    }
  },

  async getAuthUser() {
    try {
      const token = document.cookie
        .split('; ')
        .find((ele) => ele.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) throw new Error('Session expired');

      const res = await axios.get('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res;
    } catch {
      throw new Error('Session expired');
    }
  },
};
