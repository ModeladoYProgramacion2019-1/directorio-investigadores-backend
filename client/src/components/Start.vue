<template>
  <div>
    <header class ="landingHead text-white text-center">
      <h1 class="mb-5">Bienvenido a la Red Nacional de Investigación</h1>
      <h5> Haga click en una entidad en el mapa para realizar una búsqueda.</h5>
    </header>

    <MexicoMap/>

  </div>
</template>

<script>
    /* eslint-disable */
    import Footer from '@/components/Footer.vue'
    import MexicoMap from '@/components/MexicoMap.vue'
    import Navbar from '@/components/Navbar.vue'

    export default {
        name: 'Start',
        components: {
            MexicoMap,
            Navbar,
            Footer
        }
}
</script>

<style>
    header.landingHead {
        position: relative;
        background: url('../assets/images/background.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 8rem;
        padding-bottom: 8rem;
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
