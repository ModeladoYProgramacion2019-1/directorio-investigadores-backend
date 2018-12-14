<template>
    <div v-if="hasPermission" class="NewPaper">

        <!-- Main navbar -->
        <Navbar/>

        <!-- Title -->
        <div class ="titleDiv text-white text-center">
            <h1 class="mb-5">Nuevo Artículo</h1>
        </div>

        <!-- Field dropdown -->
        <div class="aDiv">
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

        <!-- Title input -->
        <div class="bDiv">
            <h5>Título</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="title" title = "title"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Abstract input -->
        <div class="aDiv">
            <h5>Abstract</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="abstract" abstract = "abstract"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Link input -->
        <div class="bDiv">
            <h5>Url</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="link" link = "link"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Journal input -->
        <div class="aDiv">
            <h5>Revista</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="journal" journal = "journal"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Authors search input -->
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
            <h6 v-for="(auth, key) in authors">
                • {{auth}}
                <button type="button"
                        class="btn btn-dark" variant="dark" @click="deleteAuthor(key)">
                    Eliminar
                </button>
            </h6>
        </div>

        <!-- Register button -->
        <div class="bar text-center">
            <button type="button" class="btn btn-light" @click="sendToBackend">
                Crea artículo
            </button>
        </div>

        <!-- Footer -->
        <Footer/>

        <!-- Error modal -->
        <b-modal v-model="showErrorModal"
               hide-footer
               title="Mensaje:">
                <div class="d-block text-center">
                    <h3>{{modalMessage}}</h3>
                </div>
                <b-btn class="mt-3"
                       variant="outline-danger"
                       block
                       @click="hideErrorModal">
                    Cerrar
                </b-btn>
        </b-modal>

        <!-- Success modal -->
        <b-modal v-model="showSuccessModal"
               hide-footer
               title="Mensaje:">
                <div class="d-block text-center">
                    <h3>{{modalMessage}}</h3>
                </div>
                <b-btn class="mt-3"
                       variant="outline-success"
                       block
                       @click="hideSuccesModal">
                    Cerrar
                </b-btn>
        </b-modal>
    </div>

    <!-- Alternative message -->
    <div v-else>
        <Navbar/>
        <h1 style="padding-bottom:2rem;">
            Lo sentimos, no tiene permiso para crear artículos
        </h1>
        <Footer/>
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'NewPaper',
    components: {
        Navbar,
        Footer
    },
    data: function() {
        return {
            //UI data
            author: "",
            field: "Campo de investigación",
            fields: [],
            hasPermission: false,
            modalMessage : "",
            results: [],
            showErrorModal : false,
            showSuccessModal : false,
            //JSON data
            abstract: "",
            authors: {},
            field_id: 0,
            journal: "",
            link: "",
            title: "",
        }
    },
    methods: {
        /**
         * Adds a new author to the authors dictionary.
         */
        addAuthor(id, name){
            this.authors[id] = name;
            this.author = ""
            this.results = null
        },
        /**
         * Searches for an author in the database.
         */
        getAuthor(){
            this.$axios.get('/persona?nombre='
                            + this.author).then((response) => {
                this.results = response.data.resource
            })
        },
        /**
         * Gets user info from the cookie.
         */
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
        /**
         * Gets useful info from the database.
         */
        getInfo(){
            this.$axios.get('/campo').then((response) => {
                this.fields = response.data.resource
            })
        },
        /**
         * Deletes an author from the authors dictionary.
         */
        deleteAuthor(id){
            this.$delete(this.authors, id)
        },
        /**
         * Hides the error modal.
         */
        hideErrorModal () {
            this.showErrorModal = false;
            this.modalMessage = "";
        },
        /**
         * Hides the success modal.
         */
        hideSuccesModal () {
            this.showSuccessModal = false;
            this.modalMessage = "";
        },
        /**
         * Sends a new Paper JSON to the database for its creation.
         */
        sendToBackend(){
            if (this.title == "") {
                this.modalMessage = "El título no puede estar vacío"
                this.showErrorModal = true
            } else if (this.field_id == 0) {
                this.modalMessage = "El campo no puede permanecer indefinido"
                this.showErrorModal = true
            } else {
                let authorsList = []
                for (var key in this.authors) {
                    authorsList.push(key)
                }
                this.$axios.post('/articulo',
                    {
                        titulo : this.title,
                        abstract: this.abstract,
                        url: this.link,
                        revista: this.journal,
                        campo_id: this.field_id,
                        autores: authorsList,
                    }
                ).then(response => {
                    console.log(response)
                    if(response.data){
                        if(response.data.success){
                            this.modalMessage = "El artículo se creó exitosamente"
                            this.showSuccessModal = true
                        }else{
                            this.modalMessage = "Ocurrió un error al crear el artículo"
                            this.showErrorModal = true
                        }
                    }else{
                        this.modalMessage = "Ocurrió un error al crear el artículo"
                        this.showErrorModal = true
                    }
                })
                this.abstract = ""
                this.authors = {}
                this.field_id = 0
                this.journal = ""
                this.link = ""
                this.title = ""
                this.field = "Campo de investigación"
            }
        },
        /**
         * Modifies the current research field.
         */
        setField(id, nombre){
            this.field_id = id
            this.field = nombre
        },
    },
    mounted () {
        this.getCookieInfo()
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
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
    }
    div.bar{
        background-color: #242a35;
        opacity: 0.80;
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    div.titleDiv {
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
    div.NewPaper{
        background-color: #E3E7ED;
    }
    .scrollable-menu {
        height: 8rem;
        max-height: 200px;
        overflow-x: hidden;
    }
</style>
