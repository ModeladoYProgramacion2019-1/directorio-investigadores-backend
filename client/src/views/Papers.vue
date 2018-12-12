<template>
  <div class="Papers">

    <Navbar/>
    <div class ="stateDiv text-white text-center">
      <h1 class="mb-5">{{title}}</h1>
      <h1 class="mb-5">{{name}}</h1>
    </div>

    <div class="box">
        <div class="card-columns">
            <b-card  v-for="paper in papers"
            bg-variant="dark" text-variant="white" :title="paper.titulo"
            class="shadow-sm sCard" style="max-width : 80em;">

            <div>
                <router-link :to="{path: '/articulo/' + paper.articulo_id}">
                    <b-button :href="{path: '/sede/' + paper.articulo_id}"
                    variant="info">
                        Ver artículo
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
export default {
    name: 'Papers',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        title : "",
        personId : "",
        papers : null,
        name : null
      }
    },
    methods : {
        getInfo() {
            this.personId = window.location.pathname.split("/")[2]
        }
    },
    mounted () {
        this.getInfo(),
        this.$axios.get('/persona?persona_id=' + this.personId).then((response) => {
            this.title = "Articulos de "
                       + response.data.resource[0].nombre + " "
                       + response.data.resource[0].apellido

            this.papers = response.data.resource[0].Articulos;

		})
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
    div.stateDiv {
        position: relative;
        background: url('../assets/images/state.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 3rem;
        padding-bottom: 1rem;
    }
    div.box {
        text-align:center;
        margin: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    div.bar{
        background-color: #212733;
        opacity: 0.80;
        height: 70px;
        width: 100%;
    }
    .sCard {
        margin:auto;
        margin-top: 10px;
    }
    div.Papers{
        background-color: #E3E7ED;
    }
</style>
