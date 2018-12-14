<template>

    <div class ="authDiv text-white text-center">
      <h1 class="mb-5">Hola!</h1>
      <h3 class="mb-5">
          Da click en completar para terminar el registro del usuario
      </h3>
      <h4 class="mb-5">{{mail}}</h4>
      <form class="container text-center loginForm">
        <a class="btn btn-light" href="/">Cancelar</a>
        <a class="btn btn-primary btn-margin-left" href="/"
        @click="sendToBackend">Completar</a>
      </form>
  </div>

</template>

<script>
    var jwt = require('jsonwebtoken');
    export default {
        name: 'Upgrade',
        data: function () {
          return {
            token : "",
            name : "",
            mail : "",
            type : 0,
            //JSON data
            titulo: "",
            persona_id: "",
            campo_id: "",
            nivel_estudiando: "",
            maximo_grado: "",
            fecha_graduacion: "",
            investigador_id: "",
          }
        },
        methods : {
            getInfo(){
                var url = window.location.search
                this.token = url.replace("?token=", "");
                try {
                    var decoded = jwt.verify(this.token, process.env.VUE_APP_JWT_key);
                    if (decoded.tipo == "administrador") {
                        this.type = 3
                        this.persona_id = decoded.persona_id
                    } else if (decoded.tipo == "investigador") {
                        this.type = 2
                        this.titulo = decoded.titulo
                        this.persona_id = decoded.persona_id
                        this.campo_id = decoded.campo_id
                    } else if (decoded.tipo == "estudiante") {
                        this.type = 1
                        this.nivel_estudiando = decoded.nivel_estudiando
                        this.maximo_grado = decoded.maximo_grado
                        this.fecha_graduacion = decoded.fecha_graduacion
                        this.persona_id = decoded.persona_id
                        this.investigador_id = decoded.investigador_id
                        this.campo_id = decoded.campo_id
                    }
                } catch (error) {

                }
            },
            sendToBackend(){
                if (this.type == 1) {
                    this.$axios.post('/estudiante',
                        {
                            nivel_estudiando: this.nivel_estudiando,
                            maximo_grado: this.maximo_grado,
                            fecha_graduacion: this.fecha_graduacion,
                            persona_id: this.persona_id,
                            investigador_id: this.investigador_id,
                            campo_id: this.campo_id,
                            rol_id: 1
                        }
                    ).then(response => {});
                } else if (this.type == 2) {
                    this.$axios.post('/investigador',
                        {
                            titulo: this.titulo,
                            persona_id: this.persona_id,
                            campo_id: this.campo_id,
                            rol_id: 2
                        }
                    ).then(response => {});
                } else if (this.type == 3) {
                    this.$axios.post('/administrador',
                        {
                            persona_id: this.persona_id,
                            rol_id: 3
                        }
                    ).then(response => {});
                }
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
        background: url('../assets/images/profile.png') no-repeat center center;
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
