import { qnaDatabase } from "~/plugins/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export const state = () => ({
  queryComment: []
});

export const mutations = {
  SET_COMMENT(state, commentData){
    state.queryComment = commentData;
  }
}

export const actions = {
  async getQueryComment({ commit }, queryUID){
    const queryComments = query(collection(qnaDatabase, `qnaQueries/${queryUID}/queryComments`), orderBy('commentCreatedOn', "desc"));
    await onSnapshot(queryComments, (commentsDataSnapshot) => {
      let comments = [];
      commentsDataSnapshot.forEach((doc) => {
        comments.push({
          commentUID: doc.id,
          commentUsername: doc.data().commentUsername,
          commentMessage: doc.data().commentMessage,
          commentUpvote: doc.data().commentUpvote,
          commentCreatedOn: doc.data().commentCreatedOn,
          commentUpVoteUsers: doc.data().commentUpVoteUsers
        });
      });
      commit("SET_COMMENT", comments);
      console.log(comments);
    })
  }
}

export const getters = {
  loadQueryComment(state){
    return state.queryComment;
  }
}
