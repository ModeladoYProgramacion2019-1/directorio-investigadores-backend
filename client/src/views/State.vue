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
    name: 'State',
    components: {
      Navbar,
      Footer
    },
    data: function () {
      return {
        stateCode : "",
        stateName : "",
        stateUrl : "",
        campi : []
      }
    },
    methods : {
        getInfo() {
            this.stateUrl = window.location.pathname.split("/").pop()
            this.stateName = functions.getStateName(this.stateUrl)
            this.stateCode = functions.getStateCode(this.stateUrl)
        }
    },
    mounted () {
        this.getInfo(),
        this.$axios.get('/direccion?estado=' + this.stateCode).then((response) => {
			let addresses = response.data.resource;
            let identifiers = [];
            for (var addressIndex in addresses) {
                identifiers.push(addresses[addressIndex].direccion_id);
            }
            for (var index in identifiers) {
                this.$axios.get('/sede?direccion_id=' + identifiers[index]).then((response) => {
                    let campiAtAddress = response.data.resource;
                    for (var campusIndex in campiAtAddress) {
                        this.campi.push(campiAtAddress[campusIndex]);
                    }
                })
            }
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
