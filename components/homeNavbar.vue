<template>
  <div class="navBar">
    <div class="logo">
      <img class="logo" @click="redirectToHome" :src="require('static/faq.png')" alt="QnA">
    </div>
    <div class="loginBtn">
      <button class="login" @click="directToLogin"><span class="icon"><font-awesome-icon :icon="['fas', 'right-to-bracket']"/></span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeNavbar",
  methods: {
    directToLogin(){
      this.$router.push('/login')
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
  margin: 30px auto auto;
  display: flex;
}

.logo{
  height: 40px;
  width: auto;
}

.loginBtn{
  margin-left: 1200px;
  margin-top : 7px;
}

.login{
  font-size: 30px;
  outline : none;
  border: none;
  color: #C5C6C7;
  background: #1F2833;
}

.login:hover{
  color : #66FCF1
}
</style>
