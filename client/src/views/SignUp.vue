<template>
  <div class="SignUp">
    <SimpleNavbar/>
    <SignUpForm/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */

import SimpleNavbar from '@/components/SimpleNavbar.vue'
import Footer from '@/components/Footer.vue'
import SignUpForm from '@/components/SignUpForm.vue'

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
    SimpleNavbar,
    Footer
  }
}
</script>
