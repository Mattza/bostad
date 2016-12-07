<template>
  <!--<div class="navi">
    <h2>Essential Links</h2>
    <ul>
      <li><router-link to="/bostad">Bostad</router-link></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Visning</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Budgivning</a></li>
      </ul>
  </div>-->
</template>

<script>
export default {
  name: 'navi',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.navi{
  border-bottom: 1px solid #42b983;
}
</style>
