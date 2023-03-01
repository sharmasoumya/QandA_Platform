<template>
  <div>
    <home-navbar/>
    <div class="forgotPasswordUI">
      <div class="Header">
        <h2 id="designedText">We got ya!</h2>
        <p class="labelText">Can't remember your password?</p>
      </div>
      <form @submit.prevent="executeForgotPassword">
        <div class="emailSection">
          <label for="userEmail">Email</label>
          <input type="email" id="userEmail" name="email" placeholder="Enter your email" v-model="userEmail">
        </div>
        <button class="loginBtn" type="submit"><span><font-awesome-icon :icon="['fas', 'circle-check']"/></span></button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import homeNavbar from "@/components/homeNavbar";
import Swal from 'sweetalert2';
export default {
  name: "forgotPasswordUI",
  components: {
    homeNavbar
  },
  data(){
    return{
      userEmail: ''
    }
  },
  methods: {
    async executeForgotPassword(){
      const auth = getAuth();
      await sendPasswordResetEmail(auth, this.userEmail)
        .then(() => {
          Swal.fire(
            'Email sent successfully!',
            'Reset email sent to your email address.',
            'success')
        }).catch(e => {
          Swal.fire(
            'Something went wrong!',
            `${e.message}`,
            'warning')
        })
    }
  }
}
</script>

<style scoped>
.forgotPasswordUI{
  width: 500px;
  margin: auto;
}

.Header{
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

.emailSection{
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

.labelText{
  font-size: 16px;
  font-weight: bolder;
  color: #6F7278;
}
</style>
