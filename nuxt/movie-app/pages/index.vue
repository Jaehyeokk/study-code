<template>
  <div class="home">
    <Hero />
  </div>
</template>

<script>
import axios from 'axios'
import { MOVIEDB } from '@/env'

export default {
  data() {
    return {
      movies: [],
    }
  },
  mounted() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      const { data } = await axios.get(`${MOVIEDB.BASE_URL}/3/movie/now_playing?api_key=${MOVIEDB.API_KEY}&language=en-US&page=1`)
      console.log(data);
    }
  }
}
</script>
