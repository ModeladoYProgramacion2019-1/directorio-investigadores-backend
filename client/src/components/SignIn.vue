<template>

    <header class ="signInHead text-white text-center">
      <h1 class="mb-5">Inicio de Sesión</h1>
      <form class="container text-center SignUpForm">
        <div class="input-group mb-3 text-center signInInput shadow-sm">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Correo electrónico</span>
            </div>
          <input type="text"
                class="form-control"
                aria-label="Usuario o correo"
                aria-describedby="basic-addon1"
                name= "email"
                v-validate = "'required|email'">
        </div>
        <span style="color:red">{{ errors.first('email') }}</span>
        <div class="input-group mb-3 text-center signInInput shadow-sm">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Contraseña</span>
            </div>
          <input type="password"
                class="form-control"
                aria-label="Contraseña"
                aria-describedby="basic-addon1"
                name= "password"
                v-validate = "'required'">
        </div>
          <span style="color:red">{{ errors.first('password') }}</span>
        <div>
          <a class="btn btn-light shadow" href="/">Cancelar</a>
          <a class="btn btn-primary btn-margin-left shadow" href="/">Acceder</a>
      </div>
      </form>
      <br>
      <br>
      <h5>¿No tiene una cuenta?
          <a class="btn btn-dark shadow" href="/signup">Registrese aquí</a>
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
        padding-top: 4rem;
        padding-bottom: 4rem;
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
