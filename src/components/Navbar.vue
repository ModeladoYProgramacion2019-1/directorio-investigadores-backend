<template>
    <nav class="navbar navbar-light  sticky-top ">
      <div class="container">
        <a class="navbar-brand" href="/">Red Nacional de Investigación</a>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="¿Que está buscando?" aria-label="Search">
          <router-link to="/search">
            <a class="btn btn-secondary" href="/search">Búsqueda avanzada</a>
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
    .btn{
        margin-right: 5px;
    }
    .form-control{
        margin-bottom : 5px;
        margin-top : 5px;
    }
</style>
