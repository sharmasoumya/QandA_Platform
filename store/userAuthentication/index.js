import { qnaAuthenticator } from "@/plugins/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Cookie from 'js-cookie';

export const state = () => ({
  user : null
});

export const mutations = {
  SET_USER: (state, currentUserData) => {
    state.user = currentUserData
  }
}

export const actions = {
  async userLogin({ commit }, userCredentials){
    try{
      await signInWithEmailAndPassword(qnaAuthenticator, userCredentials.userEmail, userCredentials.userPassword);
      const userToken = await  qnaAuthenticator.currentUser.getIdToken();
      const { email, uid, emailVerified, photoURL } = qnaAuthenticator.currentUser;
      Cookie.set('UserAccessToken', userToken);
      commit('SET_USER', { email, uid, emailVerified, photoURL });
    }catch(e) {
      throw e;
    }
  },

  async userSignUp({ commit }, userCredential){
    try{
      await createUserWithEmailAndPassword(qnaAuthenticator, userCredential.userEmail, userCredential.userPassword);
      const userToken = await qnaAuthenticator.currentUser.getIdToken();
      const { email, uid, emailVerified, photoURL } = qnaAuthenticator.currentUser;
      Cookie.set('UserAccessToken', userToken);
      commit('SET_USER', { email, uid, emailVerified, photoURL });
    }catch (e){
      throw e;
    }
  }
}

export const getters = {
  currentUserUID(state){
    return state.user.uid;
  }
}
