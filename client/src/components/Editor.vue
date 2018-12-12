<template>
  <div class="FieldSearch">
    <header class ="editor text-white text-center">
      <h1 class="mb-3">Editar perfil</h1>
    </header>


    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Información personal" active>

            <div class="text-left mb-3">
              <h3>Cuenta</h3>
              <hr>
            </div>


            <div class = "text-left mb-2">
              <label for="inputName" class="control-label">Nombre</label>
              <input v-validate="'required'" name="name" type="text" class="form-control col-sm-5" value="NAME" ref="name">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label class="control-label">Apellido</label>
              <input v-validate="'required'" name="lastName" type="text" class="form-control col-sm-5" value="APELLIDO" ref="name">
              <span style="color:red">{{ errors.first('last_name') }}</span>
            </div>
            
            <div class = "text-left mb-2">
              <label for="inputEmail" class="control-label">Correo electrónico</label>
              <input v-validate = "'required|email'"  name= "email" type="text" class="form-control col-sm-5"  value="EMAIL@EXAMPLE.COM">
              <span style="color:red">{{ errors.first('email') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label for="input_field" class="control-label">Campo</label>
              <input v-validate = "'required'"  name= "field" type="text" class="form-control col-sm-5"  value="CAMPO">
              <span style="color:red">{{ errors.first('field') }}</span>
            </div>

            <div class = "text-left mb-2">
              <label for="input_field" class="control-label">Campo</label>
              <input v-validate = "'required'"  name= "field" type="text" class="form-control col-sm-5"  value="CAMPO">
              <span style="color:red">{{ errors.first('field') }}</span>
            </div>


            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>

          </b-tab>

          <b-tab title="Información institucion">

            <div class="text-left mb-3">
              <h3>Información institucion </h3>
              <hr>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputName" class="control-label">Nombre de la institucion</label>
              <input v-validate="'required'" name="name_institution" type="text" class="form-control col-sm-5" value="NAMEINSTITUTION" ref="name_institution">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="description" class="control-label">Descripcioón de la institucion</label>
              <input v-validate="'required'" name="name_institution" type="text" class="form-control col-sm-5" value="DESCRIPCION" >
              <span style="color:red">{{ errors.first('description') }}</span>
            </div>



            <div class = "text-left container mb-2">
              <label for="inputName" class="control-label">Nombre</label>
              <input v-validate="'required'" name="name" type="text" class="form-control col-sm-5" value="NAME" ref="name">
              <span style="color:red">{{ errors.first('name') }}</span>
            </div>


            <div class = "text-left container mb-2">
              <label for="inputState" class="control-label">Estado</label>
              <input v-validate = "'required|'" name= "state" type="text" value= "ESTADO "class="form-control col-sm-5" >
              <span style="color:red">{{ errors.first('state') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputCity" class="control-label">Ciudad</label>
              <input v-validate = "'required|'" id= "city" class="form-control col-sm-5"  value="CIUDAD" >
              <span style="color:red">{{ errors.first('city') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputTown" class="control-label">Municipio</label>
              <input v-validate = "'required|'"  name= "town" type="text" class="form-control col-sm-5"  value="MUNICIPIO"  required>
              <span style="color:red">{{ errors.first('town') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputSuburb" class="control-label">Colonia</label>
              <input v-validate = "'required|'"  name= "suburb" type="text" class="form-control col-sm-5"  value="COLONIA">
              <span style="color:red">{{ errors.first('suburb') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="PC" class="control-label">Código Postal</label>
              <input v-validate = "'required|numeric'"  name= "PC" type="text" class="form-control col-sm-5"  value="1000"  required>
              <span style="color:red">{{ errors.first('PC') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputStreet" class="control-label">Calle</label>
              <input v-validate = "'required|'"  name= "street" type="text" class="form-control"  value="CALLE"  required>
              <span style="color:red">{{ errors.first('street') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputNumE" class="control-label">Número Exterior</label>
              <input v-validate = "'required|numeric'"  name= "num_ext" type="text" class="form-control col-sm-5"  value="1"  required>
              <span style="color:red">{{ errors.first('num_ext') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputNumI" class="control-label">Número interior</label>
              <input v-validate = "'numeric'"  name= "num_int" type="text" class="form-control col-sm-5"  value="1"  required>
              <span style="color:red">{{ errors.first('num_int') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputBuild" class="control-label">Edificio</label>
              <input v-validate = "'required'"  name= "building" type="text" class="form-control col-sm-5"  value="EDIFICIO"  required>
              <span style="color:red">{{ errors.first('building') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputFloor" class="control-label">PISO</label>
              <input v-validate = "'required'"  name= "floor" type="text" class="form-control col-sm-5"  value="PISO"  required>
              <span style="color:red">{{ errors.first('floor') }}</span>
            </div>

            <div class = "text-left container mb-2">
              <label for="inputCubicle" class="control-label">Cubículo</label>
              <input v-validate = "'required'"  name= "cubicle" type="text" class="form-control col-sm-5"  value="CUBICULO"  required>
              <span style="color:red">{{ errors.first('cubicle') }}</span>
            </div>








            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>
          </b-tab>


          <b-tab title="Tab 4">
            Tab Contents 3
          </b-tab>

          <b-tab  href="#/password" title="Contraseña">

            <div class="text-left mb-3">
              <h3>Contraseña</h3>
              <h5>Cambia o recupera tu contraseña actual</h5>
              <hr>
            </div>

            <div class="form-group container text-left">
              <label for="inputNewPas" class="control-label">Contraseña actual</label>
              <input v-validate="'required'" name="new_password" type="password" class="form-control col-sm-5"  ref="new_password">
              <span style="color:red">{{ errors.first('new_password') }}</span>
              <a href="#"  role="button" >¿Olvidaste tu contraseña?</a>

            </div>


            <div class="form-group container text-left">
              <label for="inputName" class="control-label">Nueva contraseña</label>
              <input v-model = "password"v-validate="'required'" name="password" type="password" class="form-control col-sm-5"  ref="password">
              <span style="color:red">{{ errors.first('password') }}</span>
            </div>

            <div class="form-group container text-left">
              <label for="inputName" class="control-label">Confirmar contraseña</label>
              <input  v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="form-control col-sm-5" data-vv-as="password">
              <span style="color:red">{{ errors.first('password_confirmation') }}</span>
            </div>

            <div class = "text-left">
              <button type="button" class="btn btn-primary">Guardar cambios</button>
            </div>


          </b-tab>
          <b-tab title="Tab 6">
            Tab Contents 3
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>


export default {
    name: 'Editor'

  }
</script>

<style scoped>

    h3{
      font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 500;
  ;
    }
    h5 {
        font-family: 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 200;
    }
    header.editor {
        position: relative;
        background: url('../assets/images/editor.jpg') no-repeat center center;
        background-size: cover;
        background-attachment : fixed;
        padding-top: 5rem;
        padding-bottom: 2rem;
    }
    img{
        margin-top: 10px;
        object-fit: scale-down;
        max-width: 100%;
        }

    .bar{
        background-color: #69747D;
        height: 60px;
        width: 100%;
    }
    .btn{
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
