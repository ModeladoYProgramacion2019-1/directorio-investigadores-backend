<template>
    <header class ="resetHead text-white ">
      <h1 align= "center" class="mb-5">Cambia tu contraseña</h1>

      <h5>
        Se enviará un correo a la direccion que hayas registrado en tu cuenta con instrucciones para cambiar tu contraseña.
      </h5>

      <div class="form-group container text-center">
        <input v-validate = "'required|email'" v-model="email" name= "email" type="text" class="form-control"  placeholder="Correo electrónico"  required>
        <span style="color:red">{{ errors.first('email') }}</span>
      </div>

      <div class="form-group container text-center">
      <button type="button" class="btn btn-primary" @click="sendToBackend">Cambiar</button>
      </div>

    </header>
</template>

<script>
    export default {
        name: 'ResetPassword',
        data: function(){
            return {
                email: ""
            }
        },
        methods: {
            sendToBackend(){
                let me = this;
                if(me.email){
                    me.$axios.get('/reset?email='+me.email).then(function(response){
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
            }
        }
    }
</script>

<style scoped>
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 700;
    }


    header.resetHead {
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
    .resetInput {
        max-width: 1000px;
        margin: auto;
    }
</style>
