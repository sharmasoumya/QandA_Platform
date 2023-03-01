<template>
  <div class="signup">
    <div class="signUpHeader">
      <h2 id="designedText">Create new account.</h2>
    </div>

    <form @submit.prevent="executeSignUp">
      <div class="nameSection">
        <div class="firstName">
          <label for="userFirstName">First Name</label>
          <input type="text" id="userFirstName" name="firstname" placeholder="First Name" v-model="firstName">
        </div>

        <div class="lastName">
          <label for="userLastName">Last Name</label>
          <input type="text" id="userLastName" name="lastname" placeholder="Last Name" v-model="lastName">
        </div>
      </div>

      <div class="emailSection">
        <label for="userEmail">Email</label>
        <input type="email" id="userEmail" name="email" placeholder="Enter new email" v-model="userCredential.userEmail">
      </div>

      <div class="passwordSection">
        <label for="userPassword">Password</label>
        <input type="password" id="userPassword" name="password" placeholder="Password" v-model="userCredential.userPassword">
      </div>

      <div class="confirmPasswordSection">
        <label for="userConfirmPassword">Confirm Password</label>
        <input type="password" id="userConfirmPassword" name="confirmPassword" placeholder="Confirm password" v-model="confirmPassword">
      </div>

      <button class="loginBtn" type="submit"><span><font-awesome-icon :icon="['fas', 'circle-check']"/></span></button>
    </form>

    <div class="link-container">
      <span class="already-member">Already a member? <nuxt-link class="login-link" to="/login"> Login</nuxt-link></span>
    </div>
    <div class="errorM-container" v-if="isError">
      <div class="errM">
        <p><strong>Error</strong> : {{ this.errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { qnaDatabase } from "@/plugins/firebase";
import { setDoc, doc, getDoc } from 'firebase/firestore';
export default {
  name: "signup",
  data(){
    return{
      userCredential : {
        userEmail : '',
        userPassword : ''
      },
      confirmPassword : '',
      firstName : '',
      lastName : '',
      isError: false,
      errorMessage: ''
    }
  },
  methods: {
    async executeSignUp(){
      this.$store.dispatch('userAuthentication/userSignUp', this.userCredential)
        .then(() => {
          this.executeCreateAccount();
        }).catch(e => {
          this.isError = true;
          this.errorMessage = e.message;
          setTimeout(() =>{
            this.isError = false
          }, 3000);
      });
    },
    async executeCreateAccount(){
      await setDoc(doc(qnaDatabase, "qnaUsers", this.$store.getters["userAuthentication/currentUserUID"]), {
        userProfilePicture : '',
        userFirstName : `${this.firstName}`,
        userLastName : `${this.lastName}`,
        userCreatedOn : new Date().getTime(),
        userQueries : [],
        followers : [],
        following: []
      }).then(() => {
        this.$router.push(`/user/${this.$store.getters["userAuthentication/currentUserUID"]}`);
      }).catch(e => {
        throw e;
      })
    }
  }
}
</script>

<style scoped>
.signup{
  width: 500px;
  margin: auto;
}

.signUpHeader{
  text-align: center;
  font-size: 30px;
}

#designedText{
  background-color: #00DBDE;
  background-image: linear-gradient(64deg, #00DBDE 0%, #FC00FF 100%);
  margin: 100px auto auto;
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

.nameSection{
  display: flex;
}

.firstName{
  border: none;
  background-color: rgba(128, 128, 128, 0.05);
  padding: 10px 20px;
  border: 1px solid rgba(128, 128, 128, 0.10);
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.emailSection, .passwordSection, .lastName, .confirmPasswordSection{
  border: none;
  background-color: rgba(128, 128, 128, 0.05);
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 10px;
  border: 2px solid rgba(128, 128, 128, 0.10);
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

.link-container{
  margin: auto;
  padding-top: 10px;
  padding-bottom: 50px;
}
.already-member{
  color: #6F7278;
}
.login-link{
  text-decoration: none;
  font-weight: bold;
  color: #4CC3FF;
}
.login-link:hover{
  text-decoration: underline;
}
.errorM-container{
  padding-bottom: 20px;
}
.errM{
  width: 70%;
  text-align: center;
  align-items: center;
  border: 1px red solid;
  border-radius: 5px;
  background: #ab7373;
  padding: 5px;
  margin: auto auto 50px;
  color: white;
}

.errM p, .errM strong{
  background: #ab7373;
}
</style>
