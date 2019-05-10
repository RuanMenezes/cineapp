<template>
  <div id="add-movie" class="container">
      <h1>{{title}}</h1>

      <form>
          <div class="form-row">
              <div class="form-group col-md-8">
                  <input type="text" id="name" class="form-control" placeholder="Nome do filme" v-model="model.name">
              </div>
              <div class="form-group col-md-4">
                  <input type="number" id="year" class="form-control" placeholder="Ano de lançamento" v-model="model.year">
              </div>
          </div>

          <div class="form-row">
              <div class="form-group col-md-12">
                  <textarea name="plot" id="plot" rows="3" v-model="model.plot" class="form-control"></textarea>
              </div>
          </div>

          <button type="submit" @click.prevent="createMovie" class="btn btn-primary">Salvar</button>
          <button class="btn btn-secondary" @click.prevent="jumpToMovieList">Voltar</button>
      </form>
  </div>
</template>

<script>
export default {
    name: "MovieAdd",
    data() {
        return {
            title: "Novo filme",
            model: {
                name: "",
                year: "",
                plot: ""
            }
        }
    },
    methods: {
        jumpToMovieList() {
            this.$router.push('/')
        },
        createMovie() {
            window.axios
                .post('/movies', this.model)
                .then(() => {
                    this.model = {}
                    this.$router.push('/')
                })
                .catch(error => {
                    console.log('Erro na chamada')
                    console.log(error.response.data)
                })
        }
    }
}
</script>