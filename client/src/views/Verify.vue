<template>
  <div class="Login">
    <SimpleNavbar/>
    <Authenticate/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import SimpleNavbar from '@/components/SimpleNavbar.vue'
import Authenticate from '@/components/Authenticate.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Verify',
  components: {
    SimpleNavbar,
    Authenticate,
    Footer
  }
}
</script>
