<template>
  <div>
    <authenticated-navbar/>
    <nuxt/>
  </div>
</template>

<script>
import authenticatedNavbar from "~/components/authenticatedNavbar";
export default {
    name: "UnsyncAuthenticatedLayout",
    components: {
      authenticatedNavbar
    }
}
</script>

<style>
html, body{
  font-family: Roboto Condensed, "Helvetica Neue", sans-serif;
  background: #1F2833;
}
.ProseMirror{
  outline: none;
}
</style>
