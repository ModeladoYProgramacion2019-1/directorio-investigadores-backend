<template>
    <header class ="signUpHead text-white ">
      <h1 align= "center" class="mb-5">Crea tu cuenta</h1>

      <form data-toggle="validator" role="form">
        <div class="form-group container text-center">
          <label for="inputName" class="control-label">Nombres: </label>
          <input v-model="name" type="text" class="form-control" id="inputName" placeholder="Nombre" required>
        </div>

        <div class="form-group container text-center">
          <label for="inputLastName" class="control-label">Apellidos:</label>
          <input v-model="lastName" type="text" class="form-control" id="inputLastName" placeholder="Apellido" required>
        </div>


        <div class="form-group container text-center">
          <label  for="inputEmail" class="control-label">Correo: </label>
          <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Correo electrónico"  required>
          <div class="help-block with-errors"></div>
        </div>


        <div class="form-group container text-center">
          <label for="inputPassword" class="control-label">Contraseña: </label>
          <input v-model="password" type="password" data-minlength="6" class="form-control" id="inputPassword" placeholder="Contraseña"  required>
          <div class="help-block with-errors">Minimo 6 caracteres</div>
        </div>
        <div class="form-group container text-center">
          <label for="inputPasswordConfirm" class="control-label">Confirmar contraseña: </label>
          <input v-model="confirmation" type="password" data-minlength="6" class="form-control" id="inputPasswordConfirm" placeholder="Confirmación"  required>
          <div class="help-block with-errors"></div>
        </div>
        <div class="form-group container text-center">
        <button type="button" class="btn btn-primary" @click="sendToBackend">Registrate</button>
        </div>
      </form>
    </header>
</template>

<script>
    export default {
        name: 'SignUp',
        data: function(){
            return {
                name: "",
                lastName: "",
                email: "",
                password: "",
                confirmation: ""
            }
        },
        methods: {
            sendToBackend(){
                let me = this;
                if(me.password == me.confirmation){
                    var tokenData = {
                        correo_personal: me.email,
                        nombre: me.name,
                        apellido: me.lastName,
                        contraseña: me.password
                    }
                    var token = me.$jwt.sign(tokenData, process.env.VUE_APP_JWT_key, {expiresIn: "1 minute"})
                    me.$axios.post('/signUp?token='+token).then(function(response){
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
                }else{
                    //TODO notify that passwords don't match
                }
            }
        }
    }
</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }


    header.signUpHead {
        position: center;
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


01T L,00 V,02T L,03T L,04T L,00 V,05T L,06T L,07T L,00 V,08T L,09T V,10T V,00 V,11T V,12T L,13T L,00 V,14T L,15T L,16T L,00 V,17T L,18T L,19T L,00 V,20T L,21T L,22T L,00 V,23T L,24T L,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00 V,00M V,00C V,00C V,00C V,00H V,00 V, V,|09|00|Sin Error.
