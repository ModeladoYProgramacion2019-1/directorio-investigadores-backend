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


      <!-- Error modal -->
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

      <!-- Success modal -->
      <b-modal v-model="showSuccessModal"
             hide-footer
             title="Mensaje:">
              <div class="d-block text-center">
                  <h3>{{modalMessage}}</h3>
              </div>
              <b-btn class="mt-3"
                     variant="outline-success"
                     block
                     @click="hideSuccesModal">
                  Cerrar
              </b-btn>
      </b-modal>

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
                confirmation: "",
                //Modal data
                modalMessage : "",
                showErrorModal : false,
                showSuccessModal : false,
            }
        },
        methods: {
            /**
             * Hides the error modal.
             */
            hideErrorModal () {
                this.showErrorModal = false;
                this.modalMessage = "";
            },
            /**
             * Hides the success modal.
             */
            hideSuccesModal () {
                this.showSuccessModal = false;
                this.modalMessage = "";
            },
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
                    me.$axios.post('/signUp?token='+token).then(response => {
                        console.log(response)
                        if(response.data){
                            if(response.data.success){
                                this.modalMessage = "La solicitud de registro "
                                                  + "fue enviada, revise el correo "
                                                  + "que ingresó para completar el"
                                                  + "registro."
                                this.showSuccessModal = true
                            }else{
                                this.modalMessage = "Ocurrió un error durante "
                                                  + "el registro, quizá ya se "
                                                  + "registró el mismo correo."
                                this.showErrorModal = true
                            }
                        }else{
                            this.modalMessage = "Ocurrió un error durante el registro"
                            this.showErrorModal = true
                        }
                    });
                }else{
                    this.modalMessage = "Las contraseñas no coinciden"
                    this.showErrorModal = true
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
    h3{
        color: black
    }
    header.signUpHead {
        position: center;
        background: url('../assets/images/login.png') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 3rem;
        padding-bottom: 3rem;
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
