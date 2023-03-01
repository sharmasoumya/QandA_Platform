<template>
  <div class="navBar">
    <div class="logo">
      <img class="logo" @click="redirectToHome" :src="require('static/faq.png')" alt="QnA">
    </div>
    <div class="logoutBtn">
      <button class="logout" @click="executeLogout"><span class="icon"><font-awesome-icon :icon="['fas', 'right-from-bracket']"/></span></button>
    </div>
  </div>
</template>

<script>;
import { getAuth, signOut } from "firebase/auth";
import Cookie from "js-cookie";
export default {
  name: "homeNavbar",
  methods: {
    async executeLogout(){
      const auth = getAuth();
      await signOut(auth).then(() => {
        Cookie.remove('UserAccessToken');
        location.href = '/';
      }).catch(e => {
        console.log('Something went wrong!');
      });
    },
    redirectToHome(){
      location.href = "/"
    }
  }
}
</script>

<style scoped>
.navBar{
  width: 90%;
  display: flex;
  margin: 30px auto auto;
}

.logo{
  height: 40px;
  width: auto;
}

.logoutBtn{
  margin-left: 1225px;
  margin-top : 7px;
  background: #1F2833;
}

.logout{
  font-size: 30px;
  outline : none;
  border: none;
  color: #C5C6C7;
  background: #1F2833;
}

.logout:hover{
  color : #66FCF1;
  background: #1F2833;
}
</style>
