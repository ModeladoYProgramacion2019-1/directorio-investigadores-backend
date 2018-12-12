<template>
  <div class="EditProfile">
    <Navbar/>
    <Editor/>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/Navbar.vue'
import Editor from '@/components/Editor.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'EditProfile',
  components: {
    Navbar,
    Editor,
    Footer
  }
}
</script>
