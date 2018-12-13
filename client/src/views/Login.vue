<template>
  <div class="Login">
    <SimpleNavbar/>
    <SignIn/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import SimpleNavbar from '@/components/SimpleNavbar.vue'
import SignIn from '@/components/SignIn.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    SimpleNavbar,
    SignIn,
    Footer
  }
}
</script>
