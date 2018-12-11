<template>
  <div class="FieldSearch">
    <header class ="searchHeader text-white text-center">
      <h1 class="mb-5">Búsqueda avanzada</h1>
    </header>

    <div class="searchBox" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn v-b-toggle.accordion1 variant="secondary">
            Artículo
          </b-btn>
          <b-btn v-b-toggle.accordion2 variant="secondary">
            Persona
          </b-btn>
          <b-btn v-b-toggle.accordion3 variant="secondary">
            Sede
          </b-btn>
          <b-btn v-b-toggle.accordion4 variant="secondary">
            Grupo
          </b-btn>
        </b-card-header>

        <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Título
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Campo
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Autor
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
          </b-card-body>
        </b-collapse>

      </b-card>

      <b-card no-body class="mb-1">
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Nombres
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Apellidos
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Correo
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Institución
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
          <b-card-body>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Nombre
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Institución
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  Entidad
                </span>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <b-dropdown id="ddown1"
                            text="Entidad" variant="success" boundary="viewport">
                  <div class="scrollable-menu">
                      <b-dropdown-item v-for="state in states">
                          {{state}}
                      </b-dropdown-item>
                  </div>
                </b-dropdown>
              </div>
              <input type="text" class="form-control"
                     aria-describedby="ddown1">
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <form class="bar text-center">
      <a class="btn btn-light" href="/">Cancelar</a>
      <a class="btn btn-primary btn-margin-left" href="/">Buscar</a>
    </form>
  </div>
</template>

<script>
var functions = require('@/functions')
export default {
    name: 'FieldSearch',
    data: function(){
        return {
            states : [],
        }
    },
    methods : {
        getStates() {
            for (var code in functions.codes) {
                this.states.push(functions.codes[code])
            }
        }
    },
    mounted () {
        this.getStates()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    header.searchHeader {
        position: relative;
        background: url('../assets/images/search.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .searchBox {
        max-width: 90%;
        margin: auto;
    }
    div.FieldSearch{
        background-color: #E3E7ED;
        text-align: left;
    }
    .bar{
        background-color: #69747D;
        height: 60px;
        width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .scrollable-menu {
        height: 8rem;
        max-height: 200px;
        overflow-x: hidden;
    }
</style>
