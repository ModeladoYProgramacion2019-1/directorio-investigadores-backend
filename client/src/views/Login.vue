<template>
  <div class="Login">
    <Navbar/>
    <SignIn/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/Navbar.vue'
import SignIn from '@/components/SignIn.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Navbar,
    SignIn,
    Footer
  }
}
</script>
