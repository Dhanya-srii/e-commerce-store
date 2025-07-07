<template>
  <div>
    <h2>Login Page</h2>
    <input
      v-model="username"
      placeholder="Enter your name"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Enter your password"
    />
    <button @click="loginUserHandler">Login</button>
    <div
      v-if="errorMessage"
      style="color: red"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { loginUser } from '../api/userLogin';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  data() {
    return {
      username: 'emilys',
      password: 'emilyspass',
      errorMessage: '',
    };
  },
  methods: {
    async loginUserHandler() {
      try {
        await loginUser(this.username, this.password);
        this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
      } catch {
        this.errorMessage = 'Incorrect username or password!';
      }
    },
  },
};
</script>
