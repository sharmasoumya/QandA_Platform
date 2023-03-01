<template>
  <div class="newCommentUI">
    <form @submit.prevent="executeCommentSubmit">
      <div class="formFields">
        <textarea name="comment" id="commentUI" cols="87" rows="2" v-model="commentData.commentMessage"/>
        <div class="submitButton">
          <button type="submit"><span><font-awesome-icon :icon="['fas', 'paper-plane']"/></span></button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { doc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { qnaDatabase } from "@/plugins/firebase";

export default {
  name: "newCommentUI",
  data(){
    return{
      commentData: {
        commentUsername: '',
        commentMessage: '',
        commentUpvote: '',
        commentCreatedOn: '',
        commentUpVoteUsers: [],
        commentUserLinked: ''
      }
    }
  },
  methods: {
    async setUserData(){
      try{
        await onSnapshot(doc(qnaDatabase, "qnaUsers", this.$store.getters['userAuthentication/currentUserUID']), (userDataSnapshot) => {
          this.commentData.commentUsername = `${userDataSnapshot.data().userFirstName} ${userDataSnapshot.data().userLastName}`;
        });
      }catch (e){
        console.log(e.message);
        window.location.reload(true);
      }
    },
    async executeCommentSubmit(){
      this.commentData.commentUserLinked = this.$store.getters['userAuthentication/currentUserUID'];
      this.commentData.commentCreatedOn = new Date().getTime();
      await addDoc(collection(qnaDatabase, `qnaQueries/${this.$route.params.query}/queryComments`), this.commentData)
        .then(() => {
          this.commentData.commentMessage = '';
        }).catch(e => {
          console.log(e.message);
        });
    }
  },
  created() {
    this.setUserData();
    // this.$store.dispatch('query/getQuery', this.$route.params.query);
  },
  updated() {
    this.setUserData();
  }
}
</script>

<style scoped>
.newCommentUI{
  display: flex;
  margin-bottom: 5px;
}

.formFields{
  display: flex;
}

textarea{
  border-radius: 15px;
  padding: 10px;
  background: rgba(54, 61, 70, 0.29);
  outline: none;
  border: none;
  font-size: 15px;
  color: #ebedee;
}

button{
  background: #1F2833;
  border: none;
  outline: none;
  font-size: 30px;
  margin-top: 5px;
  padding: 10px;
  color: #C5C6C7;
}

button:hover{
  color: #00DBDE;
}

</style>
