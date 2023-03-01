<template>
  <div>
    <authenticated-navbar/>
    <div class="mainContainer">
      <div class="header">
        <p id="designedText">Be creative here!</p>
      </div>
      <query-u-i
        :current-user-u-i-d="this.$store.getters['userAuthentication/currentUserUID']"
        :query-created-on="loadQnAQuery.queryCreatedOn"
        query-user-linked="1234567"
        :query-description="loadQnAQuery.queryDescription"
        :query-title="loadQnAQuery.queryTitle"
        :query-u-i-d="loadQnAQuery.queryUID"/>

      <p id="Label"><span><font-awesome-icon :icon="['fas', 'message']"/></span> Threads</p>
      <div class="commentBox">
        <!--      <comment-u-i comment-upvote="10.7k" comment-message="Yare Yare!" comment-username="PamChan"/>-->
        <comment-list :query-comment="loadQueryComment"/>
        <new-comment-u-i/>
      </div>
    </div>
  </div>
</template>

<script>
import queryUI from "@/components/queryUI";
import commentUI from "@/components/commentUI";
import newCommentUI from "@/components/newCommentUI";
import commentList from "@/components/commentList";
import authenticatedNavbar from "@/components/authenticatedNavbar";

export default {
  name: "index",
  components: {
    queryUI,
    commentUI,
    newCommentUI,
    commentList,
    authenticatedNavbar
  },
  created() {
    this.$store.dispatch('query/getQuery', this.$route.params.query);
    this.$store.dispatch('queryComment/getQueryComment', this.$route.params.query);
  },
  computed: {
    loadQnAQuery() {
      return this.$store.getters['query/loadQnAQuery'];
    },
    loadQueryComment(){
      return this.$store.getters['queryComment/loadQueryComment'];
    }
  }
}
</script>

<style scoped>
.mainContainer{
  margin: auto;
  width: 50%;
}
.commentBox{
  border: 2px #00DBDE solid;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

#designedText{
  background-color: #00DBDE;
  background-image: linear-gradient(64deg, #00DBDE 0%, #FC00FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 400px;
  font-size: 40px;
  font-weight: bolder;
  font-family: 'Gochi Hand';
  margin-top: 100px;
}

#Label{
  font-size: 20px;
  font-weight: bolder;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #C5C6C7;
}
</style>
