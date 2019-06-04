<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <a href class="brand-logo">
          <router-link :to="{ name: 'Map' }">GeoApp</router-link>
        </a>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <a @click="logOut">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>
<style>
</style>