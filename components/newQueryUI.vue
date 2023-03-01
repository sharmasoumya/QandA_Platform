<template>
  <div class="newQueryUI">
    <form @submit.prevent="executeNewQuery">
      <div class="header">
        <p id="designedText">Got a new query?</p>
      </div>

      <div class="topicHeader">
        <label for="">TOPIC</label>
        <input type="text" placeholder="Enter topic here." v-model="queryData.queryTitle" required>
      </div>

      <div class="description">
        <label for="">DESCRIPTION</label>
        <input type="text" placeholder="Enter description here..." v-model="queryData.queryDescription" required>
      </div>
      <div class="controlButtons">
        <button type="submit"><span><font-awesome-icon :icon="['fas', 'circle-check']"/></span></button>
        <button id="crossButton" type="button" @click="onDiscard"><span><font-awesome-icon :icon="['fas', 'circle-xmark']"/></span></button>
      </div>
    </form>
  </div>
</template>
<script>
import { qnaDatabase } from "~/plugins/firebase";
import { collection, addDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
export default {
  name: "newQueryUI",
  data(){
    return {
      queryData: {
        queryTitle : '',
        queryDescription : '',
        queryCreatedOn : null
      }
    }
  },
  methods: {
    async onDiscard() {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'All data will be discarded!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4CC3FF',
        confirmButtonText: 'Yes, discard it!'
      }).then((result) => {
        if(result.isConfirmed){
          Swal.fire(
            'Discarded!',
            'Your _query has been deleted.',
            'success'
          )
        }
      })
    },

    async executeNewQuery(){
      try{

        this.queryData.queryCreatedOn = new Date().getTime();
        const queryRef = await addDoc(collection(qnaDatabase, "qnaQueries"), this.queryData );
        await this.addCaseToUser(queryRef.id)
          .then(() => {
            this.queryData.queryCreatedOn = '';
            this.queryData.queryDescription = '';
            this.queryData.queryTitle = '';
            Swal.fire(
              'Query raised successfully!',
              'Your query has been uploaded.',
              'success'
            )
          });

      }catch (e){
        alert(e.message);
      }
    },

    async addCaseToUser(queryID){
      await updateDoc(doc(qnaDatabase, "qnaUsers", this.$store.getters['userAuthentication/currentUserUID']), {
        userQueries: arrayUnion(queryID)
      });
    }
  }
}
</script>

<style scoped>
.newQueryUI{
  border: 3px solid #2D6C7A;
  padding: 30px 20px;
  border-radius: 10px;
  margin-top: 20px;
}
input{
  outline: none;
  border: none;
  font-size: 18px;
  color: #C5C6C7;
  width: 100%;
  background: none;
  margin-top: 5px;
}

label{
  background: none;
  font-size: 12px;
  font-weight: bold;
  color: #2D6C7A;
}

.topicHeader, .description{
  border: none;
  margin-top: 10px;
  border-radius: 10px;
}

.description input{
  font-family: "Courier New";
  font-weight: bold;
}

button{
  width: 50px;
  font-size: 40px;
  margin-top : 15px;
  border: none;
  outline: none;
  color: #2D6C7A;
  background: #1F2833;
}

button:hover{
  color: #4CC3FF;
}

#crossButton{
  color: #7a2d2d;
}

#crossButton:hover{
  color: #ff4c52;
}

form{
  width: 95%;
  margin: auto;
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
}
</style>
