<template>
  <div class="Institute">

    <Navbar/>
    <header class ="instituteHeader text-white text-center">
      <h1 class="mb-5">{{instituteName}}</h1>
    </header>

    <div class="box" style="margin:auto;">
        <b-card  v-for="campus in campi"
                 bg-variant="dark" text-variant="white" :title="campus.nombre"
                 class="sCard" style="max-width : 80em;">
            <div v-if="campus.clave != null">
                <router-link :to="{path: '/sede/' + campus.clave}">
                    <b-button :href="{path: '/sede/' + campus.clave}"
                        variant="info">
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
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    h4 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: white;
        padding-top: 12px;
    }
    header.instituteHeader {
        position: relative;
        background: url('../assets/images/campus.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    div.box {
        text-align:center;
    }
    .institutionBar{
        background-color: #409BAD;
        height: 60px;
        width: 100%;
    }
    .addressBar{
        background-color: #21608E;
        height: 60px;
        width: 100%;
    }
    .contactBar{
        background-color: #112A3F;
        height: 60px;
        width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .sCard {
        margin:auto;
        margin-top: 10px;
    }
    div.Institute{
        background-color: #E3E7ED;
    }
</style>
