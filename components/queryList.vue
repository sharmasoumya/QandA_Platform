<template>
  <div>
    <query-u-i v-for="query in queries" :key="query.id"
               :current-user-u-i-d="currentUserUID"
               :query-created-on="query.queryCreatedOn"
               :query-user-linked="query.queryUserLinked"
               :query-description="query.queryDescription"
               :query-title="query.queryTitle"
               :query-u-i-d="query.queryUID"/>
  </div>
</template>

<script>
import queryUI from "~/components/queryUI";
export default {
  name: "queryList",
  components: {
    queryUI
  },
  props: {
    queries: {
      type: Array,
      required: true
    },
    currentUserUID: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
