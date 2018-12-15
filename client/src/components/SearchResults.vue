<template>
    <div class="SearchResults">
        <header class ="searchHeader text-white text-center">
            <h1 class="mb-5">Resultados de la búsqueda</h1>

            <!-- Error modal -->
            <b-modal v-model="showErrorModal"
                   hide-footer
                   title="Mensaje:">
                    <div class="d-block text-center">
                        <h3 style="color: black">{{modalMessage}}</h3>
                    </div>
                    <b-btn class="mt-3"
                           variant="outline-danger"
                           block
                           @click="hideErrorModal">
                        Cerrar
                    </b-btn>
            </b-modal>
        </header>

        <div class="searchBox" role="tablist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">

                    <b-btn v-if="paperNumber > 0"
                           href="#"
                           v-b-toggle.accordion1
                           variant="secondary">
                        Artículos [{{paperNumber}}]
                    </b-btn>
                    <b-btn v-if="peopleNumber > 0"
                           href="#"
                           v-b-toggle.accordion2
                           variant="secondary">
                        Personas [{{peopleNumber}}]
                    </b-btn>
                    <b-btn v-if="campusNumber > 0"
                           href="#"
                           v-b-toggle.accordion3
                           variant="secondary">
                        Sedes [{{campusNumber}}]
                    </b-btn>
                    <b-btn v-if="groupNumber > 0"
                           href="#"
                           v-b-toggle.accordion4
                           variant="secondary">
                        Grupos [{{groupNumber}}]
                    </b-btn>
                </b-card-header>

                <b-collapse id="accordion1"
                            accordion="my-accordion"
                            role="tabpanel">
                    <b-card-body>
                        <div class="card-columns">
                            <b-card  v-for="paper in papers"
                                     bg-variant="dark"
                                     text-variant="white"
                                     :title="paper.nombre"
                                     class="shadow-sm sCard"
                                     style="max-width : 80em;">
                                <div v-if="paper.clave != null">
                                    <router-link :to="{path: '/sede/' + paper.clave}">
                                        <b-button :href="{path: '/sede/' + paper.clave}"
                                                  variant="light"
                                                  class="shadow">
                                            Ver artículo
                                    </b-button>
                                    </router-link>
                                </div>
                                <div v-else>
                                    <router-link :to="{path: '/sede/' + paper.sede_id}">
                                        <b-button :href="{path: '/sede/' + paper.sede_id}"
                                                  variant="light">
                                            Ver artículo
                                        </b-button>
                                    </router-link>
                                </div>
                            </b-card>
                        </div>
                    </b-card-body>
                </b-collapse>
            </b-card>


            <b-card no-body class="mb-1">
                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>

                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>

                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                    <b-card-body>

                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>

        <form class="bar text-center"> </form>
    </div>

</template>

<script>

export default {
    name: 'SearchResults',
    data: function(){
        return {
            paperNumber : 0,
            peopleNumber : 0,
            campusNumber : 0,
            groupNumber : 0,
            papers : [],
            people : [],
            campi : [],
            groups : [],
            showErrorModal : false,
            modalMessage : ""
        }
    },
    methods : {
        hideErrorModal () {
            this.showErrorModal = false;
            this.modalMessage = "";
        },
        getInfo() {
          let me = this;
          var url = window.location.pathname;
          var searchedFor = url.slice(url.indexOf("busqueda=")+9, url.length);
          console.log(searchedFor);
          me.$axios.post('/simpleSearch', {data: searchedFor}).then(response => {
              console.log(response)
              if(response.data){
                  if(response.data.resource){
                      var resources = response.data.resource;
                      console.log(JSON.stringify(resources));
                      me.paperNumber = resources.Articulo[0].length;
                      me.peopleNumber = resources.Persona[0].length;
                      me.campusNumber = resources.Sede[0].length;
                      me.groupNumber = resources.Grupo[0].length;

                      me.papers = resources.Articulo[0];
                      me.people = resources.Persona[0];
                      me.campi = resources.Sede[0];
                      me.groups = resources.Grupo[0];

                      if(me.paperNumber == 0 && me.peopleNumber == 0 && me.campusNumber == 0 && me.groupNumber == 0){
                        me.modalMessage = "No se encontraron resultados"
                        me.showErrorModal = true
                      }
                  }else{
                      me.modalMessage = "No se encontraron resultados"
                      me.showErrorModal = true
                  }
              }else{
                  me.modalMessage = "No se encontraron resultados"
                  me.showErrorModal = true
              }
          });
        }
    },
    mounted () {
        this.getInfo()
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
    div.SearchResults{
        background-color: #E3E7ED;
        text-align: left;
    }
    .bar{
        background-color: #E3E7ED;
        height: 30px;
        opacity: 0.3;
        width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
