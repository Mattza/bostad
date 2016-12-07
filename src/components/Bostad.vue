<template>
  <div class="bostad">
    <h2>Bostad</h2>
    <!--<button @click.stop="loadResult">-->
    <ul v-if="results.data">
      <li v-for="result in results.data">
        <img :src="result.imageUrl" />
        <div>
        <p>{{result.address}}</p>
        <input v-model="result.rating" v-on:blur="update(result)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// class Bostad {
//   constructor(axios) {
//     this.promise = axios.get('api/bostad');
//     this.promise.then(
//       (resp) => { this.data = resp.data; }
//     );
//   }
// }
import axios from 'axios';

const store = {
  fetch: vm => vm.$http.get('api/bostad'),
  update: obj => axios.put(`api/bostad/${obj.id}`, { rating: obj.rating }),
};

export default {
  name: 'bostad',
  data() {
    return {
      results: {},
      data: store.fetch(this).then((data) => {
        this.results = data;
      }),
    };
  },
  methods: {
    update: (result) => {
      store.update(result);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  height:50px;
  width: 50px;
  font-size:30px;
}
img{
  width:100px;
  float:left;
}

  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    width:100%;
    list-style: none;
    height: 100px;
    border-bottom: 1px solid #ccc;
  }
</style>