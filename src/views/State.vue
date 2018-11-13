<template>
  <div class="State">

    <Navbar/>
    <header class ="stateHeader text-white text-center">
      <h1 class="mb-5">{{stateName}}</h1>
    </header>

    <form class="bar text-center">
        <h4>Sedes de investigación en {{stateName}} :</h4>
    </form>

    <div class="box" style="margin:auto;">
        <b-card  bg-variant="dark" text-variant="white" title="Instituto Autónomo de Investigación"
                 class="sCard" style="max-width : 80em;">
          <p class="card-text">
            {{stateName}}, calle Bruno Diaz, número 42.
          </p>
          <b-button href="#" variant="primary">Ver sede</b-button>
        </b-card>

        <b-card  bg-variant="dark" text-variant="white" title="Centro de Desarrollo del Bajío"
                 class="sCard" style="max-width : 80em;">
          <p class="card-text">
            {{stateName}}, calle James Tiberius Kirk, número 1701.
          </p>
          <b-button href="#" variant="primary">Ver sede</b-button>
        </b-card>

    </div>

    <Footer/>

  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'State',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        stateName : "sta"
      }
    },
    methods : {
        getPath() {
            this.stateName = window.location.pathname.split("/").pop()
        }
    },
    mounted () {
        this.getPath()
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
    header.stateHeader {
        position: relative;
        background: url('../assets/images/state.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    div.box {
        text-align:center;
    }
    .bar{
        background-color: #69747D;
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
    div.State{
        background-color: #E3E7ED;
    }
</style>
