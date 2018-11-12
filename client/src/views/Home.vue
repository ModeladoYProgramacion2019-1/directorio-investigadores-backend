<template>
  <div class="home">
    <Navbar/>
    <Start/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import Start from '@/components/Start.vue'

export default {
  name: 'home',
  components: {
    Footer,
    Navbar,
    Start
  }
}
</script>
