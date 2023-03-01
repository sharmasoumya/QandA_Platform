<template>
  <div class="sideNavbar">
    <div class="imageSection">
<!--      <img :src="require('static/1*LfggvmXWpMQhu6diOJv_MA.jpeg')" alt="User Profile Picture">-->
    </div>

    <div class="settingButtons">
      <button><span><font-awesome-icon :icon="['fas', 'id-badge']"/></span></button>
      <button><span><font-awesome-icon :icon="['fas', 'key']"/></span></button>
      <button><span><font-awesome-icon :icon="['fas', 'trash-can']"/></span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountSideNavbar",

}
</script>

<style scoped>
.sideNavbar{
  width: 350px;
  border: 2px solid yellow;
}

.imageSection{
  width: 70px;
  height: auto;
  padding: 10px;
  border: 1px red solid;
  margin: auto;
}

img{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

</style>
