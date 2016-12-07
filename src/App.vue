<template>
  <div id="app">
    <navi></navi>
    <router-view></router-view>
  </div>
</template>

<script>
import Navi from './components/Navi';
import Bostad from './components/Bostad';

export default {
  name: 'app',
  components: {
    Navi,
    Bostad,
  },
};

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>