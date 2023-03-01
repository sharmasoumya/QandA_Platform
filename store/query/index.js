import { qnaDatabase } from "@/plugins/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const state = () => ({
  query : {}
})

export const mutations = {
  SET_QUERY(state, queryData){
    state.query = queryData;
  }
}

export const actions = {
  async getQuery({ commit }, queryUID){

    await onSnapshot(doc(qnaDatabase, "qnaQueries", queryUID), (querySnapShot) => {
      const query = {

        queryUID: querySnapShot.id,
        queryTitle: querySnapShot.data().queryTitle,
        queryDescription: querySnapShot.data().queryDescription,
        queryCreatedOn: querySnapShot.data().queryCreatedOn
      }
      commit("SET_QUERY", query);
    });
  }
}

export const getters = {
  loadQnAQuery(state){
    return state.query;
  }
}
