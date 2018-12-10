<template>
  <div class="Institute">

    <Navbar/>
    <div class ="instituteDiv text-white text-center">
      <h1 class="mb-5">{{instituteName}}</h1>
    </div>

    <div class="box">
        <div class="card-columns">
            <b-card  v-for="campus in campi"
            bg-variant="dark" text-variant="white" :title="campus.nombre"
            class="shadow-sm sCard" style="max-width : 80em;">
            <div v-if="campus.clave != null">
                <router-link :to="{path: '/sede/' + campus.clave}">
                    <b-button :href="{path: '/sede/' + campus.clave}"
                    variant="info" class="shadow">
                    Ver sede
                </b-button>
            </router-link>
        </div>
        <div v-else>
            <router-link :to="{path: '/sede/' + campus.sede_id}">
                <b-button :href="{path: '/sede/' + campus.sede_id}"
                variant="info">
                Ver sede
            </b-button>
        </router-link>
        </div>
        </b-card>
        </div>
    </div>


    <Footer/>

  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
var functions = require('@/functions')

export default {
    name: 'Institute',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        id : null,
        instituteName : "",
        campi : []
      }
    },
    methods : {
        getInfo() {
            var instituteUrl = window.location.pathname.split("/").pop()
            this.$axios.get('/institucion?clave=' + instituteUrl).then((keyResponse) => {
                let institute = keyResponse.data.resource;
                if (institute.length ===0) {
                    this.$axios.get('/sede?sede_id=' + instituteUrl).then((idResponse) => {
                        institute = idResponse.data.resource;
                    })
                }
                this.id = institute[0].sede_id;
                this.instituteName = institute[0].nombre;
                this.campi = institute[0].Sedes;
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
        padding-left: 3rem;
    }
    div.instituteDiv {
        position: relative;
        background: url('../assets/images/campus.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    div.box {
        text-align:center;
        margin: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .sCard {
        margin:auto;
        margin-top: 10px;
    }
    div.Institute{
        background-color: #E3E7ED;
    }
</style>
