<template>
  <div class="Login">
    <SimpleNavbar/>
    <Upgrade/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import SimpleNavbar from '@/components/SimpleNavbar.vue'
import Upgrade from '@/components/Upgrade.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Verify',
  components: {
    SimpleNavbar,
    Upgrade,
    Footer
  }
}
</script>
