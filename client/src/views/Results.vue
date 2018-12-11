<template>
  <div class="Results">
    <Navbar/>
    <SearchResults/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import SearchResults from '@/components/SearchResults.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Results',
  components: {
    SearchResults,
    Navbar,
    Footer
  }
}
</script>
