<template>
  <div class="Campus">

    <Navbar/>
    <div class ="campusDiv text-white text-center">

        <div class="container-fluid">
            <b-button class="float-left" variant="outline-light">
                {{institucion}}
            </b-button>
        </div>
        <h1 class="mb-5">{{campusName}}</h1>
        <h5>{{mail}}</h5>
        <h5>Dirección: {{state}}, {{municipality}}, {{town}}</h5>
        <br/>
        <div class="container-fluid">
            <div class="card text-white bg-info mb-3"
            style="width: 10rem; height: 8rem; opacity : 0.88;">
            <div class="card-header">
                Investigadores.</div>
                <div class="card-body">
                    <h2 class="card-title">12</h2>
                </div>
            </div>
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
    name: 'Campus',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        id : null,
        campusName : "",
        institucion : "La sede no es parte de una institución",
        state : "",
        municipality : "",
        town : "",
        postalCode : "",
        mail : "La institucion no cuenta con correo electrónico"
      }
    },
    methods : {
        getInfo() {
            var campusUrl = window.location.pathname.split("/").pop()
            this.$axios.get('/sede?clave=' + campusUrl).then((keyResponse) => {
                let campus = keyResponse.data.resource;
                if (campus.length ===0) {
                    this.$axios.get('/sede?sede_id=' + campusUrl).then((idResponse) => {
                        campus = idResponse.data.resource;
                    })
                }
                this.id = campus[0].sede_id;
                this.campusName = campus[0].nombre;
                if (campus[0].Institucion != null){
                    this.institucion = campus[0].Institucion.nombre;
                }
                if (campus[0].Direccion != null){
                    var address = ""
                    if (campus[0].Direccion.estado != null) {
                        this.state = functions.getStateNameWithCode(campus[0].Direccion.estado)
                    }
                    if (campus[0].Direccion.municipio != null) {
                        this.municipality = campus[0].Direccion.municipio
                    }
                    if (campus[0].Direccion.colonia != null) {
                        this.town = campus[0].Direccion.colonia
                    }
                    if (campus[0].Direccion.cp != null) {
                        this.postalCode = campus[0].Direccion.cp
                    }
                    this.address = address
                }
                if (campus[0].Contacto != null) {
                    this.mail = campus[0].Contacto.correo_institucion;
                }
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
        padding-left: 3rem;
    }
    h4 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: white;
        padding-top: 12px;
    }
    div.campusDiv {
        position: relative;
        background: url('../assets/images/campus.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 2rem;
        padding-bottom: 1rem;
    }
    div.container-fluid {
        padding-left: 3rem;
    }
    div.Campus{
        background-color: #E3E7ED;
    }
</style>
