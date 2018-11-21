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
            :footer="contacto"
            footer-tag="footer"
            footer-bg-variant="info"
            title="Dirección"
            style="max-width: 96%"
    >
      <p class="card-text" style="color: white;"> {{direccion}}</p>
    </b-card>
    </div>


    <Footer/>

  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

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
        institucion : "Institucion de prueba",
        direccion : "Direccion de prueba no. 12",
        contacto : "contacto@contacto.com"
      }
    },
    methods : {
        getInfo() {
            this.id = this.$route.query.sede_id;
            this.$axios.get('/sede?sede_id=' + this.id).then((response) => {
                let campus = response.data.resource;
                this.campusName = campus[0].nombre;
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
