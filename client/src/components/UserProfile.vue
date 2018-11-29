<template>
  <div class = "UserProfile">
    <div class ="profileDiv text-white text-center">
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
                        <h2 class="card-title">37</h2>
                    </div>
                </div>
            </div>
            <div class="col-4 cardCol">
                <div class="card text-white bg-dark mb-3"
                style="width: 14rem; height: 8rem; opacity : 0.88;">
                <div class="card-header">
                    Grupos de investigación.</div>
                    <div class="card-body">
                        <h2 class="card-title">12</h2>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <br>

      <div class="container-fluid" style="background-color : #212733; opacity : 0.8;">
          <div class="row">
            <div class="col buttonCol">
                <b-btn  href="#" v-b-toggle.accordion1 variant="light">
                    Nuevo Artículo
                </b-btn>
            </div>
            <div class="col buttonCol">
                <b-btn  href="#" v-b-toggle.accordion1 variant="light">
                    Editar Artículos
                </b-btn>
            </div>
            <div class="col buttonCol">
                <b-btn  href="#" v-b-toggle.accordion1 variant="info">
                    Editar perfil
                </b-btn>
            </div>
          </div>
      </div>

      <div class="container-fluid" style="background-color : #212733; opacity : 0.8;">
          <div class="row">
            <div class="col buttonCol">
                <b-btn  href="#" v-b-toggle.accordion1 variant="light">
                    Ver artículos
                </b-btn>
            </div>
            <div class="col buttonCol">
                <b-btn  href="#" v-b-toggle.accordion1 variant="light">
                    Ver grupos
                </b-btn>
            </div>
          </div>
      </div>

    </div>

    <div>
      <div>
    <b-card-group class="bg-dark">
        <b-card title="Registrate como Investigador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <button class = "btn btn-dark shadow"> Ve al registro. </button>
            </p>

        </b-card>
        <b-card title="Registrate como Estudiante" class="researcherCard m-3">
            <p class="card-text">
                <br>
                  <button class = "btn btn-dark shadow"> Ve al registro.</button>
            </p>

        </b-card>
        <b-card title="Registrate como Administrador" class="researcherCard m-3">
            <p class="card-text">
                <br>
                <button class = "btn btn-dark shadow">Ve al registro</button>
            </p>
          </b-card>
        </b-card-group>

        <div class="text-right bg-secondary" >
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
        personName : "Nombre de usuario",
        mail : "correo@correo.com",
        institucion : "La sede no es parte de una institución",
        state : "",
        municipality : "",
        town : "",
        postalCode : "",
      }
    },
    methods : {
    },
    mounted () {
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
        padding-top: 5rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn-margin-left {
        margin-left: 15px;
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
        max-width: 10rem;
        padding-left: 3rem;
    }
    .researcherCard {
        background-color: #b5bdc9;
        height: 11rem;
    }




</style>
