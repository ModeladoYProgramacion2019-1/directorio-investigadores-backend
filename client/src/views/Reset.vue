<template>
  <div class="Reset">
    <Navbar/>
    <ResetPassword/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ResetPassword from '@/components/ResetPassword.vue'

export default {
  name: 'Reset',
  components: {
    ResetPassword,
    Navbar,
    Footer
  }
}
</script>
