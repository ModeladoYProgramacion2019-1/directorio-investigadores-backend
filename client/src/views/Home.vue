<template>
  <div class="home">
    <Start/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Start from '@/components/Start.vue'

export default {
  name: 'home',
  components: {
    Start
  }
}
</script>
