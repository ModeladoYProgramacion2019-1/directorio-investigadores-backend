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
        name: 'ResetPassword',
        data: function(){
            return {
                email: "",
                //Modal data
                modalMessage : "js",
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
                if(me.email){
                    me.$axios.get('/reset?email='+me.email).then(response => {
                        console.log(response)
                        if(response.data){
                            if(response.data.success){
                                this.modalMessage = "Revise el correo "
                                                  + "que ingresó para completar el "
                                                  + "cambio de contraseña."
                                this.showSuccessModal = true
                            }else{
                                this.modalMessage = "Lo sentimos, Ocurrió un error"
                                this.showErrorModal = true
                            }
                        }else{
                            this.modalMessage = "Lo sentimos, Ocurrió un error"
                            this.showErrorModal = true
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
    h3{
        color: black
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
