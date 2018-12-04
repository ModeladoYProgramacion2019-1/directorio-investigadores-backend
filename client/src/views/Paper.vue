<template>
  <div class="Paper">

    <Navbar/>
    <div class ="paperDiv text-white text-center">

        <div class="container-fluid">
            <b-button class="float-left" variant="outline-light">
                {{field}}
            </b-button>
        </div>
        <h1 class="mb-5">{{paperName}}</h1>
        <h5>Revista: {{journal}}</h5>
        <a :href="link"><h5>Enlace: {{link}}</h5></a>
    </div>
    <div class="abstractDiv">
        <h4>Abstract</h4>
        {{abstract}}
    </div>
    <div class="authorsDiv">
        <div class="bar text-center">
            <h4>Autores</h4>
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
    name: 'Paper',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        id : null,
        paperName : "Artículo de investigación",
        field : "Campo de investigación",
        journal : "revista",
        link : "http://www.google.com",
        abstract : "Descripción del articulo"
      }
    },
    methods : {
        getInfo() {
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
    div.bar{
        background-color: #242a35;
        opacity: 0.80;
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    div.paperDiv {
        position: relative;
        background: url('../assets/images/campus.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 2rem;
        padding-bottom: 1rem;
    }
    div.authorsDiv {
        position: relative;
        background: url('../assets/images/campus.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-bottom: 1rem;
    }
    div.abstractDiv {
        position: relative;
        background-color: #242a35;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        color: white;
        text-align: left;
    }
    div.container-fluid {
        padding-left: 3rem;
    }
    div.Paper{
        background-color: #E3E7ED;
    }
</style>
