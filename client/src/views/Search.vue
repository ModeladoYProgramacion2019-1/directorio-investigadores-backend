<template>
  <div class="Search">
    <Navbar/>
    <FieldSearch/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import FieldSearch from '@/components/FieldSearch.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Search',
  components: {
    FieldSearch,
    Navbar,
    Footer
  }
}
</script>
