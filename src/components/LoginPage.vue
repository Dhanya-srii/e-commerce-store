<template>
  <div class="login-container">
    <div class="login-wrapper-container">
      <h3 class="title">Login / Join Us</h3>
      <p class="message">Enter your name and password to log in</p>
      <div class="user-details">
        <label class="label">NAME</label>
        <input
          required
          v-model="username"
          placeholder="Name"
        />
      </div>
      <div class="user-details">
        <label class="label">PASSWORD</label>
        <input
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button @click="loginUserHandler">LOGIN</button>
      <p
        v-if="errorMessage"
        style="color: red"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { user } from '../api/user';
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
    ...mapActions(['startSessionTimeout']),
    ...mapMutations(['setUser']),
    async loginUserHandler() {
      try {
        const parsedUser = await user.loginUser(this.username, this.password);
        this.setUser(parsedUser);
        this.startSessionTimeout(this.$router);
        this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
        
      } catch {
        this.errorMessage = 'Invalid username or password';
      }
    },
  },
};
</script>
<style scoped src="@/assets/styles/components/login-page.css"></style>
