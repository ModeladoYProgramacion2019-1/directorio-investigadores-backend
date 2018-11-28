<template>
  <div class="SignUp">
    <Navbar/>
    <SignUpForm/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import VeeValidate from 'vee-validate'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import SignUpForm from '@/components/SignUpForm.vue'
export default {
  name: 'SignUp',
  components: {
    SignUpForm,
    Navbar,
    Footer
  }
}
</script>
