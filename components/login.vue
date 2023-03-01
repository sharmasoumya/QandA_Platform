<template>
  <div class="login">
    <div class="loginHeader">
      <h2 id="designedText">Ready? player One</h2>
    </div>

    <form @submit.prevent="executeLogin">
      <div class="emailSection">
        <label for="userEmail">Email</label>
        <input type="email" id="userEmail" name="email" placeholder="Enter your email" v-model="userCredentials.userEmail">
      </div>

      <div class="passwordSection">
        <label for="userPassword">Password</label>
        <input type="password" id="userPassword" name="password" placeholder="Password" v-model="userCredentials.userPassword">
      </div>
      <button class="loginBtn" type="submit"><span><font-awesome-icon :icon="['fas', 'circle-check']"/></span></button>
    </form>
    <div class="link-container">
      <span class="new-here">New here? <nuxt-link class="register-link" to="/signup">Register</nuxt-link><br></span>
      <span class="new-here">Forgot Password? <nuxt-link class="register-link" to="/forgotPassword">Here</nuxt-link></span>
    </div>
    <div class="errorM-container" v-if="isError">
      <div class="ErrorM">
        <p><strong>Error</strong> : {{ this.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userCredentials: {
        userEmail : '',
        userPassword : ''
      },
      isError : false,
      errorMessage : ''
    }
  },
  methods: {
    async executeLogin(){
      this.$store.dispatch('userAuthentication/userLogin', this.userCredentials)
        .then(() => {
          this.$router.push(`/user/${this.$store.getters["userAuthentication/currentUserUID"]}`);
        }).catch(e => {
        this.isError = true;
        this.errorMessage = e.message;
        setTimeout(() => {
          this.isError = false;
        }, 10000)
      });
    }
  }
}
</script>

<style scoped>
.login{
  width: 500px;
  margin: auto;
}

.loginHeader{
  text-align: center;
  font-size: 30px;
}

#designedText{
  background-color: #00DBDE;
  background-image: linear-gradient(64deg, #00DBDE 0%, #FC00FF 100%);
  margin: 150px auto auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Gochi Hand";
}

label{
  background: none;
  font-size: 15px;
  font-weight: bold;
  color: #151515;

}

.emailSection, .passwordSection{
  border: none;
  background-color: rgba(128, 128, 128, 0.05);
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 10px;
}

input{
  outline: none;
  border: none;
  font-size: 18px;
  color: #C5C6C7;
  width: 100%;
  background: none;
}

.loginBtn{
  width: 50px;
  font-size: 40px;
  margin-top : 15px;
  border: none;
  outline: none;
  color: #2D6C7A;
  background: #1F2833;
}

.loginBtn:hover{
  color: #4CC3FF;
}

.link-container {
  margin: auto;
  padding-top: 5px;
  padding-bottom: 50px;
}
.new-here{
  color: #6F7278;
}
.register-link{
  text-decoration: none;
  font-weight: bolder;
  color: #4CC3FF;
}
.forgot-pass a{
  text-decoration: none;
  font-weight: bold;
  color: #4CC3FF;
}
.forgot-pass a:hover{
  text-decoration: underline;
}
.errorM-container{
  padding-bottom: 1px;
}
.ErrorM{
  width: 70%;
  text-align: center;
  align-items: center;
  border: 1px red solid;
  border-radius: 5px;
  background: #ab7373;
  padding: 10px;
  margin: auto auto 50px;
  color: white;
}
</style>
