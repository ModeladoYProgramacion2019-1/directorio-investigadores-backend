<template>

    <div class ="authDiv text-white text-center">
      <h1 class="mb-5">Hola {{name}}!</h1>
      <h3 class="mb-5">
          Para verificar tu registro, sólo confirma que este es tu correo
          electrónico:
      </h3>
      <h4 class="mb-5">{{mail}}</h4>
      <form class="container text-center loginForm">
        <a class="btn btn-light" href="/">Cancelar</a>
        <a class="btn btn-primary btn-margin-left" href="/" @click="sendToBackend">Verificar</a>
      </form>
  </div>

</template>

<script>
    var jwt = require('jsonwebtoken');
    export default {
        name: 'Authenticate',
        data: function () {
          return {
            token : "",
            name : "",
            mail : ""
          }
        },
        methods : {
            getInfo(){
                var url = window.location.search
                this.token = url.replace("?token=", "");
                try {
                    var decoded = jwt.verify(this.token, process.env.VUE_APP_JWT_key);
                    this.name = decoded.nombre
                    this.mail = decoded.correo_personal
                } catch (error) {

                }
            },
            sendToBackend(){
                this.$axios.post('/signUp/verify?token='+this.token).then(function(response){
                    console.log(response)
                    if(response.data){
                        if(response.success){
                            //TODO notify that the email was sent successfully
                        }else{
                            //TODO notify of an error
                        }
                    }else{
                        //TODO notify of an error
                    }
                });
            }
        },
        mounted () {
            this.getInfo()
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
        padding-top: 6rem;
        padding-bottom: 6rem;
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
