<template>
  <div class="Campus">

    <Navbar/>
    <header class ="campusHeader text-white text-center">
      <h1 class="mb-5">{{campusName}}</h1>
    </header>

    <div style="margin:auto;">
    <b-card :header="institucion"
            class = "sCard"
            bg-variant="secondary"
            header-text-variant="light"
            header-tag="header"
            header-bg-variant="dark"
            :footer="mail"
            footer-tag="footer"
            footer-bg-variant="info"
            title="Dirección"
            style="max-width: 96%"
    >
      <p class="card-text" style="color: white;">
          Entidad : {{state}}
          <br>
          Municipio / Delegación : {{municipality}}
          <br>
          Colonia : {{town}}
          <br>
          Código postal : {{postalCode}}
      </p>
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
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    h4 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: white;
        padding-top: 12px;
    }
    header.campusHeader {
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
    div.Campus{
        background-color: #E3E7ED;
    }
</style>
