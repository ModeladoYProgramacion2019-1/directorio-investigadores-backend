<template>

    <div class ="authDiv text-white text-center">
      <h2 class="mb-5">Hola [Nombre], ingresa tu correo para verificar el registro:</h2>
      <form class="container text-center loginForm">
        <div class="input-group mb-3 text-center authInput">
          <input type="password"
                class="form-control"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                aria-describedby="basic-addon1">
        </div>
        <a class="btn btn-light" href="/">Cancelar</a>
        <a class="btn btn-primary btn-margin-left" href="/">Verificar</a>
      </form>
  </div>

</template>

<script>
    var jwt = require('jsonwebtoken');
    export default {
        name: 'Authenticate',
        data: function () {
          return {
            correo : ""
          }
        },
        methods : {
            checkAuthentication(){
                var data = {
                    correo : this.correo
                }
                var authToken = jwt.sign(tokenData, process.env.JWT_key,
                                        {expiresIn: "3m"});
                this.$axios.post('/signUp/Verify', authToken).then((response) => {
                    return response;
                });
            }
        }
    }

</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    div.authDiv {
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
    .authInput {
        max-width: 1000px;
        margin: auto;
    }
</style>
