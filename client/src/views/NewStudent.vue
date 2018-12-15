<template>
    <div v-if="!isStudent" class="NewStudent">

        <!-- Main navbar -->
        <Navbar/>

        <!-- Title -->
        <div class ="titleDiv text-white text-center">
            <h1 class="mb-5">Registro de Estudiante</h1>
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

        <!-- Level input -->
        <div class="aDiv">
            <h5>Nivel</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="level" level = "level"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Studies input -->
        <div class="aDiv">
            <h5>Máximo grado de estudio</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="studies" studies = "studies"
                     type="text" class="form-control">
            </div>
        </div>

        <!-- Graduation date input -->
        <div class="aDiv">
            <h5>Fecha de graduación</h5>
            <div class="form-group container text-center">
              <input v-validate= "'required'"v-model="date" date = "date"
                     type="date" class="form-control">
            </div>
        </div>

        <!-- Researcher search input -->
        <div class="bDiv">

            <!-- Input -->
            <h5>Investigador (Escriba un correo y presione enter)</h5>
            <div v-if="!selectedResearcher" class="form-group container text-center">
              <input v-validate="'required'"
                    v-model="researcherMail"
                    researcherMail = "researcherMail"
                     type="text" class="form-control" @change="getResearcher">
            </div>

            <!-- Search results -->
            <div class="card-columns">
                <b-card  v-for="result in results"
                bg-variant="dark" text-variant="white" :title="result.nombre + ' ' + result.apellido "
                class="shadow-sm sCard" style="max-width : 80em;">
                <p> {{result.Contacto.correo_personal}} </p>

                <div>
                    <b-button variant="secondary"
                              @click="addResearcher(result.persona_id,
                                                    result.nombre + ' '
                                                    + result.apellido)">
                        Agregar Investigador
                    </b-button>
                </div>
                </b-card>
            </div>

            <!-- Added researcher -->
            <h6 v-for="(researcher, key) in researchers">
                • {{researcher}}
                <button type="button"
                        class="btn btn-dark" variant="dark" @click="deleteResearcher(key)">
                    Eliminar
                </button>
            </h6>

        </div>

        <!-- Register button -->
        <div class="bar text-center">
            <button type="button" class="btn btn-light" @click="sendToBackend">
                Regístrate
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
            Usted ya está registrado como estudiante.
        </h1>
        <Footer/>
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'NewStudent',
    components: {
        Navbar,
        Footer
    },
    data: function() {
        return {
            //UI data.
            researcherMail: "",
            field: "Campo de investigación",
            fields: [],
            isStudent: false,
            researcher: "",
            results: [],
            //Modal data
            modalMessage : "",
            showErrorModal : false,
            showSuccessModal : false,
            //JSON data.
            level: "",
            studies: "",
            date: "",
            field_id: 0,
            researcher_id: 0,
            researchers: {},
            selectedResearcher: false,
            researcher_person_id: 0,
            person_id: null,
        }
    },
    methods : {
        /**
         * Adds a new researcher to the researchers dictionary.
         */
        addResearcher(id, name){
            this.researchers[id] = name;
            this.researcherMail = ""
            this.results = null
            this.selectedResearcher = true
            this.researcher_person_id = id
        },
        /**
         * Deletes an researcher from the researchers dictionary.
         */
        deleteResearcher(id){
            this.$delete(this.researchers, id)
            this.selectedResearcher = false
        },
        /**
         * Searches for an researcher in the database.
         */
        getResearcher(){
            this.results = []
            this.$axios.get('/contacto?correo_personal=%'
                            + this.researcherMail + '%').then((contactResponse) => {
                var contactResults = contactResponse.data.resource
                for (var contact in contactResults) {
                    this.$axios.get('/persona?contacto_id='
                    + contactResults[contact].contacto_id).then((response) => {
                        this.results.push(response.data.resource[0])
                    })
                }
            })
        },
        /**
         * Gets user info from the cookie.
         */
        getCookieInfo(){
            var user = null
            user = JSON.parse(this.$cookie.get('user'))
            if (user != null) {
                this.person_id = user.persona_id
                if (user.Estudiante != null) {
                    this.isStudent = true
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
         * Sends a new Student JSON to the database for its creation.
         */
        sendToBackend() {
            console.log(this.person_id)
            if (!this.selectedResearcher) {
                this.modalMessage = "Debe seleccionar UN investigador"
                this.showErrorModal = true
            } else if (this.field_id == 0) {
                this.modalMessage = "El campo no puede permanecer indefinido"
                this.showErrorModal = true
            } else {
                console.log(this.researcher_person_id)
                var researcher_id = 0
                this.$axios.get('/investigador?persona_id='
                + this.researcher_person_id).then((response) => {
                    console.log(response)
                    researcher_id = response.data.resource[0].investigador_id
                    console.log(response.data.resource[0])
                })
                console.log(researcher_id)
                var tokenData = {
                    tipo: "estudiante",
                    nivel_estudiando: this.level,
                    maximo_grado: this.level,
                    fecha_graduacion: this.date,
                    persona_id: this.person_id,
                    investigador_id: researcher_id,
                    campo_id: this.field_id
                }
                var token = this.$jwt.sign(tokenData, process.env.VUE_APP_JWT_key,
                    {expiresIn: "70d"})
                this.$axios.post('/email',
                    {
                        type: "estudiante",
                        persona_id: this.person_id,
                        token: token,
                        investigador_id: researcher_id
                    }
                ).then (response =>{
                    console.log(response)
                    if(response.data){
                        if(response.data.success){
                            this.modalMessage = "La solicitud de registro fue enviada"
                            this.showSuccessModal = true
                        }else{
                            this.modalMessage = "Ocurrió un error durante el registro"
                            this.showErrorModal = true
                        }
                    }else{
                        this.modalMessage = "Ocurrió un error durante el registro"
                        this.showErrorModal = true
                    }
                });
            }
        },
        /**
         * Modifies the current research field.
         */
        setField(id, nombre){
            this.field_id = id
            this.field = nombre
        }
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
        background-color: #992033;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        color: white;
        text-align: left;
    }
    div.NewStudent{
        background-color: #E3E7ED;
    }
    .scrollable-menu {
        height: 8rem;
        max-height: 200px;
        overflow-x: hidden;
    }
</style>
