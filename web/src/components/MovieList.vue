<template>
  <div id="movies" class="container">
    <h1>{{ title }}</h1>

    <p>{{ welcome }}</p>

    <table class="table table-hover" v-if="movies.data.length > 0">
      <thead>
        <th>Nome</th>
        <th>Ano</th>
        <th>Sinopse</th>
        <th class="text-right">Ações</th>
      </thead>
      <tbody>
        <tr v-for="movie in movies.data" :key="movie._id">
          <td>{{movie.name}}</td>
          <td>{{movie.year}}</td>
          <td>{{movie.plot}}</td>
          <td class="text-right">
            <button class="btn btn-outline-danger btn-sm" @click.prevent="removeMovie(movie._id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">Oops! Nenhum filme encontrado.</div>
    <button class="btn btn-success" @click.prevent="jumpToAddMovie()">Novo Filme</button>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  data() {
    return {
      title: "Cadastro de filmes",
      welcome: "Seja bem vindo",
      movies: {
        data: []
      }
    };
  },
  methods: {
    jumpToAddMovie() {
      this.$router.push("add")
    },
    removeMovie(id) {
      window.axios.delete(`/movies/${id}`).then(res => {
        this.getMovies()
      })
    },
    getMovies() {
      window.axios.get('/movies').then(res => {
        this.movies.data = res.data.data
      })
    }
  },
  mounted() {
    this.getMovies()
  }
};
</script>
