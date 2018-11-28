<template>
    <header class ="signUpHead text-white ">
      <h1 align= "center" class="mb-5">Crea tu cuenta</h1>

      <form >
        <div class="form-group container text-center">
          <input v-validate= "'required'"v-model="name" name = "name" type="text" class="form-control"  placeholder="Nombre">
          <span style="color:red">{{ errors.first('name') }}</span>
        </div>

        <div class="form-group container text-center">
          <input v-validate="'required'"v-model="lastName"  name= "lastName" type="text" class="form-control" placeholder="Apellido">
          <span style="color:red">{{ errors.first('lastName') }}</span>
        </div>


        <div class="form-group container text-center">
          <input v-validate = "'required|email'" v-model="email" name= "email" type="text" class="form-control"  placeholder="Correo electrónico"  required>
          <span style="color:red">{{ errors.first('email') }}</span>
        </div>




        <div class="form-group container text-center">
          <input v-validate="'required'" name="password" type="password" class="form-control" placeholder="Contraseña" ref="password">
          <span style="color:red">{{ errors.first('password') }}</span>
        </div>
          <div class="form-group container text-center">
          <input  v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="form-control" placeholder="Confirmar contraseña" data-vv-as="password">
          <span style="color:red">{{ errors.first('password_confirmation') }}</span>
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
