<template>
  <div>
    <Navbar/>

    <header class ="landingHead text-white text-center">
      <h1 class="mb-5">Bienvenido a la Red Nacional de Investigación</h1>
      <h5> Haga click en una entidad en el mapa para realizar una búsqueda.</h5>
    </header>

    <Footer/>

  </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'Start',
        components: {
            Navbar,
            Footer
        }
}
</script>

<style>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    header.landingHead {
        position: relative;
        background: url('../assets/images/background.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 8rem;
        padding-bottom: 8rem;
    }
    div.mapDiv {
        background-color: #342F2F;
        width: 100%;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn-margin-left {
        margin-left: 15px;
    }

</style>
