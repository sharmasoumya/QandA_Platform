<template>
  <div class="commentUI">
    <p class="username">{{ commentUsername }}</p>
    <p class="comment">{{ commentMessage }}</p>
    <div class="upvote">
      <button :disabled="!upVoteButton" @click="upVote"><span><font-awesome-icon :icon="['fas', 'heart']"/></span></button>
      <p class="upvoteCount">{{ commentUpvote }}</p>
    </div>
  </div>
</template>

<script>
import { qnaDatabase } from "~/plugins/firebase";
import { doc, updateDoc, arrayUnion, increment, getDoc } from "firebase/firestore";
export default {
  name: "commentUI",
  layout: 'authenticatedLayout',
  props: {

    commentUID:{
      type: String,
      required: true
    },

    commentUserLinked: {
      type: String,
      required: true
    },

    commentUsername: {
      type: String,
      required: true
    },

    commentMessage: {
      type: String,
      required: true
    },

    commentUpvote: {
      type: String,
      required: true
    },

    commentCreatedOn: {
      type: String,
      required: true
    },

    commentUpVoteUsers: {
      type: Array,
      required: true
    },
  },
  data(){
    return {
      Time: '',
      HourMinSec: '',
      upVoteButton: true
    }
  },
  methods: {
    NameTimeCal() {
      const TimeNow = new Date();
      if ((TimeNow.getTime() - this.commentCreatedOn) / 3600000 < 0.0166667) {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 1000)}`
        this.HourMinSec = ' sec ago';
      } else if ((TimeNow.getTime() - this.commentCreatedOn) / 3600000 >= 0.0166667 && (TimeNow.getTime() - this.commentCreatedOn) / 3600000 < 1) {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 60000) }`
        this.HourMinSec = ' min ago';
      } else if ((TimeNow.getTime() - this.commentCreatedOn) / 3600000 >= 1 && (TimeNow.getTime() - this.commentCreatedOn) / 3600000 < 24) {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 3600000) }`
        this.HourMinSec = ' h ago';
      } else if ((TimeNow.getTime() - this.commentCreatedOn) / 3600000 >= 24 && (TimeNow.getTime() - this.commentCreatedOn) / 3600000 < 730.001) {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 86400000) }`
        this.HourMinSec = ' d ago';
      } else if ((TimeNow.getTime() - this.commentCreatedOn) / 3600000 >= 730.001 && (TimeNow.getTime() - this.commentCreatedOn) / 3600000 < 8760.01) {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 2628000000) }`
        this.HourMinSec = ' m ago';
      } else {
        this.Time = `${Math.floor((TimeNow.getTime() - this.commentCreatedOn)/ 31540000000000) }`
        this.HourMinSec = ' y ago';
      }
    },
    async upVote(){
      const commentRef = doc(qnaDatabase, `qnaQueries/${this.$route.params.query}/queryComments`, this.commentUID);
      await updateDoc(commentRef, {
        commentUpVoteUsers: arrayUnion(this.$store.getters['userAuthentication/currentUserUID']),
        commentUpvote: increment(1)
      }).then(() => {
        this.upVoteButton = false
      }).catch(e => {
        console.log(e.message);
      })
    },

    async upVoteCheck(){
      const upVoteData = await getDoc(doc(qnaDatabase, `qnaQueries/${this.$route.params.query}/queryComments`, this.commentUID));
      if(upVoteData.exists()){
        console.log("Hehe!")
        this.upVoteButton = upVoteData.data().commentUpVoteUsers.indexOf(this.$store.getters['userAuthentication/currentUserUID']) === -1;
      }else{
        console.log("Failed");
      }
    }
  },
  created() {
    this.NameTimeCal();
    this.upVoteCheck();
  }
}
</script>

<style scoped>
.commentUI{
  border-radius: 5px;
  padding: 10px;
}

.username{
  font-family: Roboto Condensed, "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 13px;
  color: #6F7278;
}

.comment{
  font-family: Roboto Condensed, "Helvetica Neue", sans-serif;
  font-weight: normal;
  color: #C5C6C7;
  font-size: 18px;
  margin-bottom: 10px;
}

.upvote{
  display: flex;
}

.upvoteCount{
  font-size: 12px;
  font-weight: bolder;
  color: #C5C6C7;
  margin-left: 10px;
}

button{
  border: none;
  outline: none;
  font-size: 20px;
  color: #C5C6C7;
  background-color: #1F2833;
}

button:hover{
  color: #00DBDE;
}
</style>
