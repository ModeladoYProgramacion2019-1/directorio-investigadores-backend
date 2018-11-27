<template>

    <header class ="signInHead text-white text-center">
      <h1 class="mb-5">Inicio de Sesión</h1>
      <form class="container text-center SignUpForm">
        <div class="input-group mb-3 text-center signInInput">
          <input type="text"
                class="form-control"
                placeholder="Usuario o correo"
                aria-label="Usuario o correo"
                aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 text-center signInInput">
          <input type="password"
                class="form-control"
                placeholder="Contraseña"
                aria-label="Contraseña"
                aria-describedby="basic-addon1">
        </div>
        <a class="btn btn-light" href="/">Cancelar</a>
        <a class="btn btn-primary btn-margin-left" href="/">Acceder</a>
      </form>
      &nbsp;
      <h5>¿No tiene una cuenta?
          <a class="btn btn-dark" href="/signup">Registrese aquí</a>
      </h5>

    </header>

</template>

<script>
    export default {
        name: 'SignIn'
    }
</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    header.signInHead {
        position: relative;
        background: url('../assets/images/login.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 8rem;
        padding-bottom: 8rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
    }
    .btn-margin-left {
        margin-left: 15px;
    }
    .signInInput {
        max-width: 1000px;
        margin: auto;
    }
</style>
