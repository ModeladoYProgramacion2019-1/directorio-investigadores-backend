<template>
  <div class = "UserProfile">
    <div class ="profileDiv text-white text-center">
        <div v-if="loggedIn"
            class="container-fluid"
            style="padding-bottom : 4rem; padding-left : 3rem;">
            <b-button class="float-left" variant="outline-light" disabled>
                Tu perfil
            </b-button>
        </div>
      <h1>{{personName}}</h1>
      <h5>{{mail}}</h5>
      <br>
      <div class="container-fluid" style="padding-left: 3rem;">
          <div class="row">
            <div class="col-5 cardCol">
                <div class="card text-white bg-dark mb-3"
                style="width: 10rem; height: 8rem; opacity : 0.88;">
                <div class="card-header">
                    Artículos.</div>
                    <div class="card-body">
                        <h2 class="card-title">{{paperNumber}}</h2>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <br>

      <div class="container-fluid" style="background-color : #212733; opacity : 0.8; ">
          <div class="row">

              <router-link :to="{path: '/persona/' + id + '/articulos'}">
                  <div class="col buttonCol">
                      <b-btn  variant="light">
                          Ver artículos
                      </b-btn>
                  </div>
              </router-link>

              <router-link :to="{path: '/nuevo_articulo'}">
                  <div v-if="loggedIn" class="col buttonCol">
                      <b-btn  variant="success">
                        Nuevo Artículo
                      </b-btn>
                  </div>
              </router-link>

            <div v-if="loggedIn" class="col buttonCol">
                <b-btn  href="#" variant="success">
                    Editar Artículos
                </b-btn>
            </div>

            <router-link :to="{path: '/editar_perfil'}">
            <div v-if="loggedIn" class="col buttonCol">
                <b-btn variant="info">
                    Editar perfil
                </b-btn>
            </div>
            </router-link>
          </div>
      </div>

    </div>

    <div>
      <div>
    <b-card-group v-if="loggedIn" class="bg-dark" >
        <b-card v-if="!isResearcher" title="Registrate como Investigador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <router-link :to="{path: '/nuevo_investigador'}">
                    <button class = "btn btn-dark shadow">
                        Ve al registro
                    </button>
                </router-link>
            </p>

        </b-card>
        <b-card v-if="!isStudent" title="Registrate como Estudiante" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <router-link :to="{path: '/nuevo_estudiante'}">
                    <button class = "btn btn-dark shadow">
                        Ve al registro
                    </button>
                </router-link>
            </p>

        </b-card>
        <b-card v-if="!isAdmin" title="Registrate como Administrador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <button class = "btn btn-dark shadow" @click="sendToBackend">
                    Solicita permisos
                </button>
            </p>
          </b-card>
        </b-card-group>

        <div v-if="isAdmin" class="text-right bg-secondary" >
          <button class = "btn btn-warning shadow">
              Accede a la página de administrador
          </button>
        </div>

      </div>
    </div>

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
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'Campus',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        id : null,
        personName : null,
        mail : "correo@correo.com",
        loggedIn : false,
        isAdmin : false,
        isResearcher : false,
        isStudent : false,
        paperNumber : 0,
        //Modal data
        modalMessage : "",
        showSuccessModal : false,
        showErrorModal : false,
      }
    },
    methods : {
        getInfo(){
            var personUrl = window.location.pathname.split("/").pop()
            console.log(personUrl);
            this.$axios.get('/persona?persona_id=' + personUrl).then((response) => {
                let person = response.data.resource[0];
                this.id = person.persona_id;
                this.personName = person.nombre + " " + person.apellido;
                this.mail = person.Contacto.correo_personal;
                this.paperNumber = person.Articulos.length ;
            })
        },
        getCookieInfo(){
            var user = null
            user = JSON.parse(this.$cookie.get('user'))
            console.log(user)
            if (user != null) {
                console.log(user.persona_id)
                if (user.persona_id == window.location.pathname.split("/").pop()) {
                    this.loggedIn = true;
                    if (user.Administrador != null) {
                        this.isAdmin = true
                    }
                    if (user.Estudiante != null) {
                        this.isStudent = true
                    }
                    if (user.Investigador != null) {
                        this.isResearcher = true
                    }
                }
            }
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
         * Sends a new Admin JSON to the database for its creation.
         */
        sendToBackend() {
            var tokenData = {
                tipo: "administrador",
                persona_id: this.id,
            }
            var token = this.$jwt.sign(tokenData, process.env.VUE_APP_JWT_key,
                {expiresIn: "70d"})
            this.$axios.post('/email',
                {
                    type: "administrador",
                    persona_id: this.id,
                    token: token,
                }
            ).then(response => {
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
        },
    },
    mounted () {
        this.getInfo()
        this.getCookieInfo()
    }
}
</script>

<style scoped>
    h1 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
        padding-left: 3rem;
    }
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: left;
        padding-left: 3rem;
    }
    div.profileDiv {
        position: relative;
        background: url('../assets/images/profile.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 3rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .profileInput {
        max-width: 1000px;
        margin: auto;
    }
    .cardCol {
        max-width: 14rem;
    }
    .buttonCol {
        max-width: 9rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }
    .researcherCard {
        background-color: #b5bdc9;
        height: 11rem;
    }




</style>
