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

            <div v-if="loggedIn" class="col buttonCol">
                <b-btn  href="#" variant="success">
                    Nuevo Artículo
                </b-btn>
            </div>
            <div v-if="loggedIn" class="col buttonCol">
                <b-btn  href="#" variant="success">
                    Editar Artículos
                </b-btn>
            </div>
            <div v-if="loggedIn" class="col buttonCol">
                <b-btn  href="#" variant="info">
                    Editar perfil
                </b-btn>
            </div>
          </div>
      </div>

    </div>

    <div>
      <div>
    <b-card-group v-if="loggedIn" class="bg-dark" >
        <b-card v-if="!isResearcher" title="Registrate como Investigador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <button class = "btn btn-dark shadow"> Ve al registro </button>
            </p>

        </b-card>
        <b-card v-if="!isStudent" title="Registrate como Estudiante" class="researcherCard m-3">
            <p class="card-text">
                <br>
                  <button class = "btn btn-dark shadow"> Ve al registro</button>
            </p>

        </b-card>
        <b-card v-if="!isAdmin" title="Registrate como Administrador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <button class = "btn btn-dark shadow">Ve al registro</button>
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
        }
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
