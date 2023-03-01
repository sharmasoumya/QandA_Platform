<template>
  <div class="queryUI">
    <div class="topicHeader">
      <p>#. {{ queryTitle }}</p>
    </div>

    <div class="description">
      <p>{{queryDescription}}</p>
    </div>

    <div class="dateTime">
      <p>{{Time}} {{hourMinSec}}</p>
    </div>

    <div class="openButton">
        <button @click="directToQuery"><span><font-awesome-icon :icon="['fas', 'envelope-open-text']"/></span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "queryUI",
  data(){
    return{
      Time: '',
      hourMinSec: ''
    }
  },
  props : {
    queryUID: {
      type: String,
      required: true
    },
    queryTitle: {
      type: String,
      required: true
    },
    queryDescription: {
      type: String,
      required: true
    },
    queryUserLinked: {
      type: String,
      required: true
    },
    queryCreatedOn: {
      type: String,
      required: true
    },
    currentUserUID: {
      type: String,
      required: true
    }
  },
  methods: {
    nameTimeCal() {
      const timeNow = new Date();
      if ((timeNow.getTime() - this.queryCreatedOn) / 3600000 < 0.0166667) {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 1000)}`
        this.hourMinSec = ' sec ago';
      } else if ((timeNow.getTime() - this.queryCreatedOn) / 3600000 >= 0.0166667 && (timeNow.getTime() - this.queryCreatedOn) / 3600000 < 1) {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 60000) }`
        this.hourMinSec = ' min ago';
      } else if ((timeNow.getTime() - this.queryCreatedOn) / 3600000 >= 1 && (timeNow.getTime() - this.queryCreatedOn) / 3600000 < 24) {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 3600000) }`
        this.hourMinSec = ' h ago';
      } else if ((timeNow.getTime() - this.queryCreatedOn) / 3600000 >= 24 && (timeNow.getTime() - this.queryCreatedOn) / 3600000 < 730.001) {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 86400000) }`
        this.hourMinSec = ' d ago';
      } else if ((timeNow.getTime() - this.queryCreatedOn) / 3600000 >= 730.001 && (timeNow.getTime() - this.queryCreatedOn) / 3600000 < 8760.01) {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 2628000000) }`
        this.hourMinSec = ' m ago';
      } else {
        this.Time = `${Math.floor((timeNow.getTime() - this.queryCreatedOn)/ 31540000000) }`
        this.hourMinSec = ' y ago';
      }
    },
    directToQuery(){
      this.$router.push(`/user/${this.$store.getters['userAuthentication/currentUserUID']}/${this.queryUID}`);
    }
  },
  created() {
    this.nameTimeCal();
  },
  updated() {
    this.nameTimeCal();
  }
}
</script>

<style scoped>
.queryUI{
  border: 3px solid #2D6C7A;
  padding: 30px 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.topicHeader{
  color: #4CC3FF;
  font-size: 30px;
  font-weight: bold;
}

.description{
  color: #C5C6C7;
  font-size: 17px;
  margin-top: 10px;
  font-family: "Courier New";
}

.dateTime{
  color: rgba(197, 198, 199, 0.6);
  font-size: 12px;
  margin-top: 10px;
  font-weight: bold;
}

.openButton button{
  margin-top: 20px;
  color: #C5C6C7;
  font-size: 30px;
  border: none;
  /*border: 2px solid rgba(197, 198, 199, 0.64);*/
  /*padding: 10px;*/
  background: #1F2833;
  /*border-radius: 5px;*/
  outline: none;
}

.openButton button:hover{
  color: #4CC3FF;
}
</style>
