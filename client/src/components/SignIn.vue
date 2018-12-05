<template>

    <header class ="signInHead text-white text-center">
        <h1 class="mb-5">Inicio de Sesión</h1>
        <form class="container text-center SignUpForm">
            <div class="input-group mb-3 text-center signInInput shadow-sm">
                <div class="input-group-prepend ">
                    <span class="input-group-text"
                          id="basic-addon1">
                        Correo electrónico
                    </span>
                </div>

                <input v-model="email"
                       type="text"
                       class="form-control"
                       aria-label="Usuario o correo"
                       aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3 text-center signInInput shadow-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text"
                          id="basic-addon1">
                        Contraseña
                    </span>
                </div>
                <input v-model="password"
                       type="password"
                       class="form-control"
                       aria-label="Contraseña"
                       aria-describedby="basic-addon1">
            </div>

            <a class="btn btn-light shadow" href="/">
                Cancelar
            </a>

            <button type="button"
                    class="btn btn-primary btn-margin-left shadow"
                    @click="sendToBackend">
                Acceder
            </button>
        </form>

        <br>
        <br>

        <h5>¿No tiene una cuenta?
            <a class="btn btn-dark shadow"
               href="/signup">
                Registrese aquí
            </a>
        </h5>

        <b-modal v-model="showErrorModal"
               hide-footer
               title="Mensaje:">
                <div class="d-block text-center">
                    <h3>{{modalMessage}}</h3>
                </div>
                <b-btn class="mt-3"
                       variant="outline-danger"
                       block
                       @click="hideErrorModal">
                    Cerrar
                </b-btn>
      </b-modal>
    </header>
</template>

<script>
    export default {
        name: 'SignIn',
        data: function(){
            return {
                email: "",
                password: "",
                showErrorModal : false,
                modalMessage : "",
            }
        },
        methods: {
            sendToBackend(){
                if(this.password != "" && this.email != ""){
                    var tokenData = {
                        email: this.email,
                        contraseña: this.password
                    }
                    var token = this.$jwt.sign(tokenData,
                                               process.env.VUE_APP_JWT_key,
                                               {expiresIn: "1 minute"})
                    this.$axios.get('/login?token='+token).then(response => {
                        console.log(response)
                        if(response.data){
                            if(response.success){
                                //TODO notify that the email was sent successfully
                            }else{
                                if(response.data.result == "La contraseña no coincide"){
                                    this.showErrorModal = true
                                    this.modalMessage = "La contraseña o el usuario no coinciden"
                                } else if (response.data.result == "No se encontró la persona") {
                                    this.showErrorModal = true
                                    this.modalMessage = "La contraseña o el usuario no coinciden"
                                } else {
                                    var user = response.data.resource
                                    var id = user.persona_id
                                    this.$cookie.set('user',
                                                     JSON.stringify(user), 1)
                                    this.$router.push({ name: 'Profile',
                                                        params: {id} })
                                }
                            }
                        }else{
                            //TODO notify of an error
                        }
                    });
                }else{
                    this.showErrorModal = true;
                    this.modalMessage = "Ingrese correo y contraseña"
                }
            },
            hideErrorModal () {
                this.showErrorModal = false;
                this.modalMessage = "";
            },
        }
    }
</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }
    h3{
        color: black;
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
