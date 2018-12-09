<template>
  <div class="Profile">
    <Navbar/>
    <UserProfile/>
    <Footer/>
  </div>
</template>
<script>
/* eslint-disable */
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import UserProfile from '@/components/UserProfile.vue'

export default {
  name: 'Profile',
  components: {
    UserProfile,
    Navbar,
    Footer
  }
}
</script>
