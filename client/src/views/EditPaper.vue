<template>
  <div v-if="!hasPermission" class="EditPaper">

    <Navbar/>
    <div class ="paperDiv text-white text-center">
        <h1 class="mb-5">Editar Artículo</h1>
    </div>

    <div class="bDiv">
        <b-dropdown id="ddown1"
                    :text="field" variant="success" boundary="viewport">
          <div class="scrollable-menu">
              <b-dropdown-item v-for="field in fields"
                               @click="setField(field.campo_id, field.nombre)">
                  {{field.nombre}}
              </b-dropdown-item>
          </div>
        </b-dropdown>
    </div>
    <div class="aDiv">
        <h5>Título</h5>
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="title" title = "title"
                 type="text" class="form-control">
        </div>
    </div>
    <div class="bDiv">
        <h5>Abstract</h5>
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="abstract" abstract = "abstract"
                 type="text" class="form-control">
        </div>
    </div>
    <div class="aDiv">
        <h5>Url</h5>
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="link" link = "link"
                 type="text" class="form-control">
        </div>
    </div>
    <div class="bDiv">
        <h5>Revista</h5>
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="journal" journal = "journal"
                 type="text" class="form-control">
        </div>
    </div>
    <div class="cDiv">
        <h5>Autores (Escriba un nombre y presione enter)</h5>
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="author" author = "author"
                 type="text" class="form-control" @change="getAuthor">
        </div>
        <div class="card-columns">
            <b-card  v-for="result in results"
            bg-variant="dark" text-variant="white" :title="result.nombre + ' ' + result.apellido "
            class="shadow-sm sCard" style="max-width : 80em;">
            <p> {{result.Contacto.correo_personal}} </p>

            <div>
                <b-button variant="secondary"
                          @click="addAuthor(result.persona_id,
                                            result.nombre + ' ' + result.apellido)">
                    Agregar Autor
                </b-button>
            </div>
            </b-card>
        </div>
        <h6 v-for="auth in authors">
            • {{auth}}
        </h6>
    </div>
    <div class="bar text-center">
        <button type="button"
                class="btn btn-light"
                @click="sendToBackend">Modifica artículo</button>
    </div>


    <Footer/>

  </div>
  <div v-else>
      <Navbar/>
      <h1 style="padding-bottom:2rem;">
          Lo sentimos, no tiene permiso para editar artículos
      </h1>
      <Footer/>
  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'EditPaper',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        paperId : null,
        query : null,

        abstract : "",
        author : "",
        authors : {},
        field : "Campo de investigación",
        field_id : 0,
        fields : [],
        link : "",
        journal : "",
        results : [],
        title : "",
        hasPermission : false,
      }
    },
    methods : {
        getAuthor(){
            this.$axios.get('/persona?nombre='
                            + this.author).then((response) => {
                this.results = response.data.resource
            })
        },
        getCookieInfo(){
            var user = null
            user = JSON.parse(this.$cookie.get('user'))
            if (user != null) {
                if (user.persona_id == window.location.pathname.split("/").pop()) {
                    if (user.Administrador != null) {
                        this.hasPermission = true
                    }
                    else if (user.Investigador != null) {
                        this.hasPermission = true
                    }
                    if (user.Estudiante != null) {
                        this.hasPermission = true
                    }

                }
            }
        },
        addAuthor(id, name){
            this.authors[id] = name;
            this.author = ""
            this.results = null
        },
        sendToBackend(){
            this.$axios.patch('/articulo/' + this.paperId,
                            {
                                titulo : this.title,
                                abstract: this.abstract,
                                url: this.link,
                                revista: this.journal,
                                campo_id: this.field_id,
                            }
                            ).then(function(response){
                if(response.data){
                    if(response.success){
                        //TODO notify that the email was sent successfully
                    }else{
                        //TODO notify of an error
                    }
                }else{
                    //TODO notify of an error
                }
            });
        },
        setField(id, nombre){
            this.field_id = id
            this.field = nombre
        },
        getInfo(){
            this.$axios.get('/campo').then((response) => {
                this.fields = response.data.resource
            })

            this.paperId = window.location.pathname.split("/").pop()
            this.$axios.get('/articulo?articulo_id='
                            + this.paperId ).then((response) => {
                let paper = response.data.resource[0]
                this.title = paper.titulo
                this.abstract = paper.abstract
                this.link = paper.url
                this.journal = paper.revista
                this.field_id = paper.campo_id
                this.$axios.get('/campo?campo_id='
                                + this.field_id).then((fieldResponse) => {
                    this.field = fieldResponse.data.resource[0].nombre
                })
            })
        }
    },
    mounted () {
        this.getInfo()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    h1 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
        padding-top: 4rem;
        padding-left: 3rem;
    }
    h3 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
        padding-left: 3rem;
    }
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
    }
    h4 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: white;
        padding-top: 12px;
    }
    div.bar{
        background-color: #242a35;
        opacity: 0.80;
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    div.paperDiv {
        position: relative;
        background: url('../assets/images/paper.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-bottom: 1rem;
    }
    div.aDiv {
        position: relative;
        background-color: #242a35;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        color: white;
        text-align: left;
    }
    div.bDiv {
        position: relative;
        background-color: #1B212D;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        color: white;
        text-align: left;
    }
    div.cDiv {
        position: relative;
        background-color: #992033;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        color: white;
        text-align: left;
    }
    div.container-fluid {
        padding-left: 3rem;
    }
    div.EditPaper{
        background-color: #E3E7ED;
    }
    .scrollable-menu {
        height: 8rem;
        max-height: 200px;
        overflow-x: hidden;
    }
</style>
