<template>
    <div v-if="!isResearcher" class="NewResearcher">

        <!-- Main navbar -->
        <Navbar/>

        <!-- Title -->
        <div class ="titleDiv text-white text-center">
            <h1 class="mb-5">Registro de Investigador</h1>
        </div>

        <!-- Field dropdown -->
        <div class="aDiv">
            <b-dropdown id="ddown1" :text="field" variant="success"
                        boundary="viewport">
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
            Usted ya se ha registrado como investigador
        </h1>
        <Footer/>
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'NewResearcher',
    components: {
        Navbar,
        Footer
    },
    data: function() {
        return {
            //JSON data
            title: "",
            field_id: 0,
            person_id: 0,
            //Modal data
            modalMessage : "",
            showErrorModal : false,
            showSuccessModal : false,
            //UI data
            field: "Campo de investigación",
            fields: [],
            isResearcher: false,
            results: [],
        }
    },
    methods: {
        /**
         * Gets user info from the cookie.
         */
        getCookieInfo() {
            var user = null
            user = JSON.parse(this.$cookie.get('user'))
            if (user != null) {
                if (user.persona_id == window.location.pathname.split("/").pop()) {
                    if (user.Investigador != null) {
                        this.isResearcher = true
                    }
                }
            }
        },
        /**
         * Gets useful info from the database.
         */
        getInfo() {
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
         * Sends a new Researcher JSON to the database for its creation.
         */
        sendToBackend() {
            if (this.field_id == 0) {
                this.modalMessage = "El campo no puede permanecer indefinido"
                this.showErrorModal = true
            } else {
                var tokenData = {
                    titulo: this.title,
                    persona_id: this.person_id,
                    campo_id: this.field_id,
                }
                var token = me.$jwt.sign(tokenData, process.env.VUE_APP_JWT_key,
                    {expiresIn: "70d"})
                this.$axios.post('/email?token=' + token,
                    {
                        type: "investigador",
                        persona_id: this.person_id,
                    }
                ).then(function(response){
                    console.log(response)
                    if(response.data){
                        if(response.success){
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
        setField(id, nombre) {
            this.field_id = id
            this.field = nombre
        },
    },
    mounted() {
        this.getInfo()
        this.getCookieInfo()
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
    div.NewResearcher{
        background-color: #E3E7ED;
    }
    .scrollable-menu {
        height: 8rem;
        max-height: 200px;
        overflow-x: hidden;
    }
</style>
