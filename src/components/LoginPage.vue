<template>
  <div>
    <h2>Login Page</h2>
    <input
      type="text"
      v-model="username"
      placeholder="Enter your name"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Enter your password"
    />
    <button @click="loginUserHandler">Login</button>

    <div
      v-if="errorMessage"
      style="color: red"
    >
      {{ errorMessage }}
    </div>
    <div v-if="showCreateAcc">
      <router-link to="/create"> Create New Account </router-link>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../api/userLogin';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      showCreateAcc: false,
    };
  },
  methods: {
    async loginUserHandler() {
      try {
        const userData = await loginUser(this.username, this.password);

        if (!userData || !userData.accessToken) {
          throw new Error('No access token received');
        }

        localStorage.setItem('accessToken', userData.accessToken);

        this.$router.push({ name: ROUTE_NAMES.PRODUCTS });

      }
       catch (err) {
        console.error('Login failed:', err);
        this.errorMessage = 'Incorrect username or password!';
        this.showCreateAcc = true;
      }
    },
  },
};
</script>
