<template>
    <nav class="navbar navbar-light  sticky-top ">
      <div class="container">
        <a class="navbar-brand" href="/">Red Nacional de Investigación</a>
        <form class="form-inline">
          <router-link to="/search">
            <a class="btn btn-secondary" href="/search">Búsqueda</a>
          </router-link>
          <router-link to="/login">
            <a class="btn btn-primary btn-margin-left" href="#">Acceder</a>
          </router-link>
        </form>
      </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>
    nav {
        background-color: rgba(250, 250, 250, 0.88);
    }
</style>
