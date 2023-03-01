<template>
  <div class="mainContainer">
    <div class="body">
      <div class="queryButtons">
        <button @click="newQueryUIVisible" v-if="!newQueryUIVisibility"><span><font-awesome-icon :icon="['fas', 'circle-plus']"/></span></button>
        <button id="discardButton" @click="newQueryUIVisible" v-if="newQueryUIVisibility"><span><font-awesome-icon :icon="['fas', 'circle-minus']"/></span></button>

      </div>
      <new-query-u-i v-if="newQueryUIVisibility"/>
      <query-list :current-user-u-i-d="this.$store.getters['userAuthentication/currentUserUID']" :queries="loadQueries"/>
    </div>
  </div>
</template>

<script>
import authenticatedNavbar from "~/components/authenticatedNavbar";
import newQueryUI from "~/components/newQueryUI";
import queryList from "~/components/queryList";
import Swal from 'sweetalert2';
export default {
  name: "index",
  layout: 'authenticatedLayout',
  components: {
    authenticatedNavbar,
    queryList,
    newQueryUI
  },
  data(){
    return{
      newQueryUIVisibility: false
    }
  },
  methods: {
    newQueryUIVisible() {
      this.newQueryUIVisibility = !this.newQueryUIVisibility
    }
  },

  created() {
    this.$store.dispatch('queries/getQnAQueries');
  },
  computed: {
    loadQueries(){
      return this.$store.getters['queries/loadQnAQueries'];
    }
  }
}
</script>

<style scoped>
.mainContainer{
  margin: 0;
  padding: 0;
}

.body{
  width: 50%;
  margin: 60px auto auto;
}

.queryButtons button{
  border: none;
  outline: none;
  color: #C5C6C7;
  font-size: 40px;
  background: #1F2833;
  margin-right: 5px;
}

.queryButtons button:hover{
  color: #4CC3FF;
}

#discardButton{
  color: #7a2d2d;
}

#discardButton:hover{
  color: #ff4c52;
}

.swal-modal{
  background-color: rgba(45, 108, 122, 0.42);
}
</style>
