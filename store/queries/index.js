import { qnaDatabase } from "~/plugins/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export const state = () => ({
  queries: []
});

export const mutations = {
  SET_QUERIES(state, queriesData){
    state.queries = queriesData;
  }
}

export const actions = {
  async getQnAQueries({ commit }){
    const queriesQuery = query(collection(qnaDatabase, "qnaQueries"), orderBy('queryCreatedOn', "desc"));
    await onSnapshot(queriesQuery, (queriesDataSnapShot) => {
      let queries = [];
      queriesDataSnapShot.forEach((doc) => {
        queries.push({
          queryUID: doc.id,
          queryTitle: doc.data().queryTitle,
          queryDescription: doc.data().queryDescription,
          queryCreatedOn: doc.data().queryCreatedOn
        });
      });
      commit("SET_QUERIES", queries);
    })
  }
}

export const getters = {
  loadQnAQueries(state){
    return state.queries;
  }
}
